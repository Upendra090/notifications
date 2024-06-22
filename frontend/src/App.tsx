import { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SendNotificaiton from "./pages/SendNotification";
import { getToken } from "firebase/messaging";
import { messaging } from "./firebase/firebaseConfig";
import { vapidId } from "./utils";
import { saveTokens } from "./services";

function App() {
  const currentToken = localStorage.getItem("fcmToken");
  async function accessNotificationRequest() {
    try {
      let permission = Notification.permission;
      if (permission === "default") {
        permission = await Notification.requestPermission();
        console.log("permission: ", permission);
        if (permission === "granted") {
          console.log("currentToken", currentToken);
          if (!currentToken) {
            const generateToken = await getToken(messaging, {
              vapidKey: vapidId,
            });
            console.log("generate token: ", generateToken);
            await saveToken(generateToken);
            localStorage.setItem("fcmToken", generateToken);
          } else {
            console.log("Token already stored.");
          }
        } else {
          console.log("Notification request permission denied.");
        }
      }
    } catch (err) {
      console.log("ERR", err);
    }
  }

  useEffect(() => {
    accessNotificationRequest();
  }, []);

  async function saveToken(token: string) {
    try {
      await saveTokens(token);
      console.log("Token saved");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/send-notification" element={<SendNotificaiton />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
