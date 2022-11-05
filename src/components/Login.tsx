import { NextPage } from "next";
import React, { useEffect } from "react";
import { FieldValue, useForm } from "react-hook-form";

import { API } from "@/utils/API";

import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  Text,
} from "@chakra-ui/react";
import { checkEnvironment } from "@/utils/checkEnvironment";

interface formPropTypes {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  let url = checkEnvironment();

  const apiRequest = async (formdata: FieldValue<formPropTypes>) => {
    const response = await API.post(url.concat("/api/login"), formdata);

    if (response.data.success) {
      window.location.href = window.location.origin + "/";
    } else {
      // setError()
    }
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          <form
            onSubmit={handleSubmit(
              async (data, event) => {
                event?.preventDefault();
                await apiRequest(data);
              },
              (error) => {
                console.log(`Form Error ======>`, error);
              }
            )}
          >
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                {...register("email", {
                  required: { message: "Email is required!", value: true },
                  pattern: {
                    message: "Email format is invalid!",
                    value: new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}"),
                  },
                })}
                id="_email"
              />
              {errors.email && (
                <Text color={"red.400"}>
                  *{errors.email.message?.toString()}
                </Text>
              )}
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                {...register("password", {
                  required: { message: "Password is required!", value: true },
                })}
                id="_password"
              />
              {errors.password && (
                <Text color={"red.400"}>
                  *{errors.password.message?.toString()}
                </Text>
              )}
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.500"}>Forgot password?</Link>
              </Stack>
              <Button colorScheme={"blue"} variant={"solid"} type="submit">
                Sign in
              </Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
};

export default Login;
