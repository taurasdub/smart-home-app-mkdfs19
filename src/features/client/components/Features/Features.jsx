import React from "react";
import MainContent from "../../layouts/MainContentLayout/MainContent";
import { Heading, Box, Button, Text } from "@chakra-ui/react";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Features() {
  return (
    <Box mt={5}>
      <MainContent display="flex">
        <Box width={{ base: "100%", md: "50%" }} paddingRight={{ md: 5 }}>
          <Heading color="white" mb={2}>
            Smart Home System Features
          </Heading>
          <UnorderedList color="white">
            <ListItem>
              Connect your smart homes devices using MQTT server
            </ListItem>
            <ListItem>
              Monitor all added devices/sensors using this website application
            </ListItem>
            <ListItem>Update device's information</ListItem>
            <ListItem>Delete unused devices from the system</ListItem>
            <ListItem>
              Add floor plan and assign devices to the room that you want
            </ListItem>
          </UnorderedList>
          <Link to="/signin">
            <Button mt={{ base: 5, md: 10 }}>Back to the login page</Button>
          </Link>
        </Box>
        <Box width={{ base: "100%", md: "50%" }}>
          <Heading color="white" mb={2}>
            What's MQTT?
          </Heading>
          <Text color="white">
            <strong>MQTT</strong> stands for Message Queuing Telemetry
            Transport. It is a lightweight messaging protocol that is used to
            connect devices and sensors to the internet of things (IoT).
          </Text>
          <Text color="white">
            In simple terms, MQTT is a way for devices to communicate with each
            other over the internet. even when they have limited bandwidth,
            processing power, or battery life. It works by sending messages, or
            "publishing" data to a central server called broker. Other devices,
            known as "subscribers," can then receive these messages and act on
            them.
          </Text>{" "}
        </Box>
      </MainContent>
      <Box mt={5} mb={5}>
        <MainContent>
          <Heading color="white" mb={2}>
            Authentication
          </Heading>
          <Text color="white">
            It is mandatory to create a user to use the system. User is being
            authenticated using Firebase. Firebase is a set of backend cloud
            computing services and application development platforms provided by
            Google.
          </Text>
        </MainContent>
      </Box>
    </Box>
  );
}

export default Features;
