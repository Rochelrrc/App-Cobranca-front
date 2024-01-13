"use client";

import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  GridItem,
  Input,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Image from "next/image";

import api from "../api/api";

import { setLocalStorage } from "@/utils/localStorage";
import thereIsError from "@/utils/thereIsErrorEditUser";

import Label from "./components/FormLabel/FormLabel";
import TextError from "./components/ErrorText/ErrorText";

import backgroundImage from "../assets/loginBg.jpeg";
import { OcultEye1 } from "@/assets/svg/eye";

const Login = () => {
  const [apiError, setApiError] = useState("");
  const [isActive, setIsActive] = useState({
    eye1: false,
    eye2: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormTypes>();

  async function onSubmit(data: LoginFormTypes) {
    try {
      setIsLoading(true);
      const response = await api.post("/login", {
        email: data.email,
        senha: data.password,
      });

      router.push("/pages/dashboard/home");

      const { usuario, token } = response.data;

      setLocalStorage("userName", usuario.nome);
      setLocalStorage("token", token);

      setApiError("");

      setIsLoading(false);

      return toast({
        title: "Sucesso!",
        description: `Bem-vindo! ${usuario.nome}`,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } catch (err: any) {
      console.warn(err);

      setIsLoading(false);

      setApiError(err.response.data.message || err.response.data || "");

      return toast({
        title: "Erro!",
        description: err.response.data.message || err.response.data || "",
        status: "error",
        duration: 6000,
        isClosable: true,
        position: "top",
      });
    }
  }

  return (
    <Grid
      templateColumns="repeat(5, 1fr)"
      gap={4}
      height="100vh"
      width="100vw"
      overflow="hidden"
    >
      <GridItem colSpan={2} h="100%" position="relative">
        <Image
          alt="imagem de fundo da tela de login"
          src={backgroundImage}
          layout="fill"
          objectFit="cover"
        />
        <Text
          position="absolute"
          top="12%"
          width="100%"
          textAlign="center"
          fontSize="1.3rem"
          fontWeight={600}
          lineHeight="1.4"
          color="#034A2A"
        >
          Gerencie todos os pagamentos
          <br />
          da sua empresa em um só
          <br />
          lugar.
        </Text>
      </GridItem>
      <GridItem colStart={4} colEnd={5} h="100%">
        <Container
          maxW="lg"
          py={{ base: "0", md: "24" }}
          px={{ base: "0", sm: "8" }}
        >
          <Stack spacing="1">
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Text
                color="#343447"
                fontSize="1.55rem"
                fontStyle="normal"
                fontWeight={700}
                lineHeight="50%"
              >
                Faça seu Login!
              </Text>
            </Stack>
            <Box
              py={{ base: "0", sm: "8" }}
              px={{ base: "4", sm: "10" }}
              bg={{ base: "transparent", sm: "bg.surface" }}
              borderRadius={{ base: "none", sm: "xl" }}
            >
              <Stack spacing="9">
                <Stack spacing="6">
                  <FormControl>
                    <Label label="E-mail" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Digite seu e-mail"
                      {...register("email", {
                        required: true,
                      })}
                      isInvalid={thereIsError(errors.email?.type, apiError)}
                      errorBorderColor="#ff0000"
                      onChange={() => setApiError("")}
                    />
                    {errors?.email?.type === "required" && (
                      <TextError msg="Este campo é obrigatorio!" />
                    )}
                  </FormControl>
                  <FormControl position="relative">
                    <Label label="Senha" />
                    <Input
                      id="password"
                      type={isActive.eye1 ? "text" : "password"}
                      placeholder="********"
                      {...register("password", {
                        required: true,
                      })}
                      isInvalid={thereIsError(errors.password?.type, apiError)}
                      errorBorderColor="#ff0000"
                      onChange={() => setApiError("")}
                    />
                    {errors?.password?.type === "required" && (
                      <TextError msg="Este campo é obrigatorio!" />
                    )}
                    <OcultEye1 isActive={isActive} setIsActive={setIsActive} />
                  </FormControl>
                </Stack>
                <Button
                  mx="auto"
                  borderRadius="0.6rem"
                  width="10rem"
                  color="#FFF"
                  bg="#DA0175"
                  _hover={{ bg: "rgb(167, 8, 93)" }}
                  _active={{ bg: "rgb(141, 7, 79)" }}
                  isLoading={isLoading}
                  onClick={() => handleSubmit(onSubmit)()}
                >
                  Entrar
                </Button>
                <Stack>
                  <Divider />
                  <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                    Ainda não possui uma conta?{" "}
                    <Link color="#DA0175" href="../pages/register">
                      Cadastre-se
                    </Link>
                  </Text>
                  <Divider />
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </GridItem>
    </Grid>
  );
};

export default Login;
