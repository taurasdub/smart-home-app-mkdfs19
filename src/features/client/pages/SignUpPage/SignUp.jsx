import * as React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link as ChakraLink,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { UserAuth } from "../../../../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { createUser } = UserAuth();

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const user = await createUser(email, password);
      await setDoc(doc(db, "users", user.user.uid), {
        email,
      });
      navigate("/");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("Email is invalid!");
      } else if (error.code === "auth/email-already-in-use") {
        setError("Email already in use!");
      } else if (error.code === "auth/weak-password" || password === "") {
        setError("Password is too weak! (at least 6 symbols)");
      }
    }
  };

  return (
    <Flex
      minH={"100vh"}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Stack spacing={8} mx={"auto"} py={12} w={{ base: "100%", md: "50%" }}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} color="white">
            Sign Up
          </Heading>
        </Stack>
        {error && (
          <Text color="red.500">
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </Text>
        )}
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"0px 1px 27px 1px rgba(42,63,116,0.74)"}
          p={8}
        >
          <form onSubmit={handleSignUp}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  label="Email Address"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  label="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <FormControl id="confirm-password">
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  name="confirm-password"
                  label="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <RouterLink color={"blue.400"} to="/signin" variant="body2">
                  <ChakraLink color={"blue.400"}>
                    Already have an account? Sign In
                  </ChakraLink>
                </RouterLink>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Sign Up
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

export default SignUp;
