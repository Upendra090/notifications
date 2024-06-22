import axios from "axios";
import { baseApiUrl } from "../utils";

export async function saveTokens(token: string) {
  const response = await axios.post(`${baseApiUrl}/save-token`, {
    fcmToken: token,
  });
  return response;
}

export async function sendNotification(data: {
  title: string;
  description: string;
}) {
  console.log(data);
  const response = await axios.post(`${baseApiUrl}/send-notification`, {
    description: data.description,
    title: data.title,
  });
  return response;
}
