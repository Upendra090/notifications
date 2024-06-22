import { useState } from "react";
import { sendNotification } from "../services";

export default function SendNotificaiton() {
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setData((state: any) => ({
      ...state,
      [name]: value,
    }));
  };

  async function handleForm(e: any) {
    e.preventDefault();
    try {
      const response = await sendNotification(data);
      if (response.status === 200) {
        console.log("notificaiton send");
      } else {
        console.log("something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main>
      <form onSubmit={handleForm}>
        <h1
          style={{
            marginBlockEnd: "1rem",
            textAlign: "center",
            paddingBlockEnd: "1rem",
          }}
        >
          Send Notification
        </h1>
        <div>
          <label htmlFor="title">Title</label>
          <input
            onChange={handleInput}
            type="text"
            name="title"
            id="title"
            placeholder="Enter Notification Title"
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            onChange={handleInput}
            placeholder="Enter Description Title"
          />
        </div>
        <button type="submit">SEND NOTIFICATION</button>
      </form>
    </main>
  );
}
