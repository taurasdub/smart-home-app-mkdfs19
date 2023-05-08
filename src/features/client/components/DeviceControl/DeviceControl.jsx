import React, { useState, useEffect } from "react";
import mqtt from "mqtt/dist/mqtt";
import { Button, Spinner } from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "../../../../context/AuthContext";

const MQTT_SERVER = "wss://test.mosquitto.org:8081";

function DeviceControl({ mqttDevice }) {
  const [deviceState, setDeviceState] = useState(null);
  const [client, setClient] = useState(null);
  const { user } = useContext(UserContext);

  const MQTT_TOPIC = mqttDevice;

  useEffect(() => {
    if (user) {
      const mqttClient = mqtt.connect(MQTT_SERVER);
      setClient(mqttClient);
      mqttClient.on("connect", () => {
        setDeviceState("off");
        console.log("connected");
        mqttClient.subscribe(MQTT_TOPIC);
      });
      mqttClient.on("message", (topic, message) => {
        if (topic === MQTT_TOPIC) {
          setDeviceState(message.toString());
        }
      });
      mqttClient.on("error", (error) => {
        console.log(`MQTT error: ${error}`);
      });
    }
    return () => {
      if (client) {
        client.end();
      }
    };
  }, [user]);

  if (!user) {
    return null;
  }

  const handleButtonClick = () => {
    const newDeviceState = deviceState === "off" ? "on" : "off";
    client.publish(MQTT_TOPIC, newDeviceState);
    setDeviceState(newDeviceState);
  };

  return (
    <>
      {deviceState !== "off" && deviceState !== "on" ? (
        <Spinner />
      ) : (
        <Button
          onClick={handleButtonClick}
          colorScheme={deviceState === "off" ? "red" : "green"}
          w="100%"
        >
          {deviceState}
        </Button>
      )}
    </>
  );
}

export default DeviceControl;
