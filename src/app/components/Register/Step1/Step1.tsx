import {
  Container,
  Stack,
  Text,
  Box,
  Flex,
  FormControl,
  Input,
  Button,
  Link,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

import api from "@/api/api";

import thereIsError from "@/utils/thereIsErrorEditUser";
import { emailIsValid, handleCheckOnlyLetters } from "@/utils/validates";

import Label from "@/app/components/FormLabel/FormLabel";
import TextError from "@/app/components/ErrorText/ErrorText";

import { Step1Props } from "@/types/react-hook-form";

export default function Step1(props: Step1Props) {
  const {
    apiError,
    setApiError,
    setActiveStep,
    register,
    handleSubmit,
    errors,
  } = props;

  async function handlePassStep(data: RegisterFormTypes) {
    try {
      const response = await api.post("/acharEmail", {
        email: data.email,
      });

      response.data ? setApiError("E-mail já cadastrado!") : setActiveStep(2);

      return;
    } catch (err: any) {
      console.warn(err);

      setApiError(err.response.data.message || "");

      return;
    }
  }

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="1">
        <Stack spacing="6" textAlign="center">
          <Text
            color="#343447"
            fontFamily="Montserrat"
            fontSize="20px"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="50%"
          >
            Adicione seus dados
          </Text>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Flex flexDirection="column" gap="2rem">
            <Flex flexDirection="column" gap="1.5rem 0">
              <FormControl>
                <Label label="Nome*" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Digite seu nome"
                  {...register("name", {
                    required: true,
                    validate: (fieldValue: string) =>
                      handleCheckOnlyLetters(fieldValue),
                  })}
                  isInvalid={thereIsError(errors.name, apiError)}
                  errorBorderColor="#201a1a"
                  onChange={() => setApiError("")}
                />
                {errors?.name?.type === "validate" && (
                  <TextError msg="O nome pode conter apenas Letras" />
                )}
                {errors?.name?.type === "required" && (
                  <TextError msg="Este Campo é obrigatorio!" />
                )}
              </FormControl>
              <FormControl>
                <Label label="E-mail*" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  {...register("email", {
                    required: true,
                    validate: (fieldValue: string) => emailIsValid(fieldValue),
                  })}
                  isInvalid={thereIsError(errors.email, apiError)}
                  errorBorderColor="#ff0000"
                  onChange={() => setApiError("")}
                />
                {errors?.email?.type === "required" && (
                  <TextError msg="Este Campo é obrigatorio!" />
                )}
                {apiError === "E-mail já cadastrado!" && (
                  <TextError msg={apiError} />
                )}
                {errors?.email?.type === "validate" && (
                  <TextError msg="Formato de email inválido!" />
                )}
              </FormControl>
            </Flex>
            <Flex
              flexDirection="column"
              w="100%"
              alignItems="center"
              gap="10px"
            >
              <Button
                mx="auto"
                width="150px"
                height="35px"
                color="white"
                padding="4px 40px"
                justifyContent="center"
                alignItems="center"
                gap="4px"
                flexShrink={0}
                borderRadius="10px"
                bg="#DA0175"
                _hover={{ bg: "rgb(167, 8, 93)" }}
                _active={{ bg: "rgb(141, 7, 79)" }}
                fontFamily="Nunito"
                fontSize="0.9rem"
                fontWeight="400"
                onClick={() => handleSubmit(handlePassStep)()}
              >
                Continuar
              </Button>
              <Stack>
                <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                  Já possui uma conta? Faça seu{" "}
                  <Link color="#DA0175" href="../">
                    Login
                  </Link>
                </Text>
              </Stack>
            </Flex>
          </Flex>
        </Box>
      </Stack>
    </Container>
  );
}
