import React from "react";
import mqtt from "mqtt/dist/mqtt";
import { useState, useEffect } from "react";

export default function DeviceControl() {
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const client = mqtt.connect("wss://test.mosquitto.org:8081");
    client.on("connect", () => setConnectionStatus(true));
    client.on("message", (topic, payload, packet) => {
      setMessages(messages.concat(payload.toString()));
    });
  }, []);

  return (
    <>
      {messages.map((message, index) => (
        <h2 key={index}>{message}</h2>
      ))}
      {connectionStatus ? "Connected" : "Connecting"}
    </>
  );
}
