import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link as ChakraLink,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../../../context/AuthContext";
import { Link as RouterLink } from "react-router-dom";
import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { signIn } = UserAuth();

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      await signIn(email, password);
      navigate("/");
    } catch (error) {
      setError("Invalid email or password");
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
          <Heading fontSize={"4xl"} color="white" textAlign="center">
            Sign in to your account
          </Heading>
          <Text fontSize={"lg"} color={"gray.400"}>
            to enjoy all of our{" "}
            <RouterLink to="/features">
              <ChakraLink color={"blue.400"}>features</ChakraLink>
            </RouterLink>{" "}
            ✌️
          </Text>
          <RouterLink color={"blue.400"} to="/register" variant="body2">
            <ChakraLink color={"blue.400"}>
              Don't have an account? Sign Up
            </ChakraLink>
          </RouterLink>
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
          <form onSubmit={handleSignIn}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="text"
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

              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <ChakraLink color={"blue.400"}>Forgot password?</ChakraLink>
                </Stack>

                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
