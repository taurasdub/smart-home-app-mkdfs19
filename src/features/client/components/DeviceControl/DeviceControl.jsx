import React, { useState, useEffect } from "react";
import mqtt from "mqtt/dist/mqtt";
import { Button } from "@chakra-ui/react";

const MQTT_SERVER = "wss://test.mosquitto.org:8081";

function DeviceControl({ mqttDevice }) {
  const [deviceState, setDeviceState] = useState("off");
  const [client, setClient] = useState(null);

  const MQTT_TOPIC = `my/device/${mqttDevice}`;

  // useEffect(() => {
  //   const mqttClient = mqtt.connect(MQTT_SERVER);
  //   setClient(mqttClient);
  //   mqttClient.on("connect", () => {
  //     console.log(`Connected to MQTT server for device ${mqttDevice}`);
  //     mqttClient.subscribe(MQTT_TOPIC);
  //   });
  //   mqttClient.on("message", (topic, message) => {
  //     if (topic === MQTT_TOPIC) {
  //       console.log(
  //         `Received message on topic ${topic}: ${message.toString()}`
  //       );
  //       setDeviceState(message.toString());
  //     }
  //   });
  //   mqttClient.on("error", (error) => {
  //     console.log(`MQTT error: ${error}`);
  //   });

  //   return () => {
  //     if (client) {
  //       client.end();
  //     }
  //   };
  // }, []);

  const handleButtonClick = () => {
    const newDeviceState = deviceState === "off" ? "on" : "off";
    client.publish(MQTT_TOPIC, newDeviceState);
    setDeviceState(newDeviceState);
  };

  return <Button onClick={handleButtonClick}>{deviceState}</Button>;
}

export default DeviceControl;
