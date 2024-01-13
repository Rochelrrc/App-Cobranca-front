import {
  Container,
  Text,
  Stack,
  Box,
  Flex,
  FormControl,
  Button,
  Input,
  useToast,
  Link,
} from "@chakra-ui/react";
import React, { useState } from "react";

import api from "@/api/api";

import thereIsError from "@/utils/thereIsErrorEditUser";
import {
  handleCheckConfirmPassword,
  handleStrongPassword,
} from "@/utils/validates";

import TextError from "@/app/components/ErrorText/ErrorText";
import Label from "@/app/components/FormLabel/FormLabel";

import { OcultEye1, OcultEye2 } from "@/assets/svg/eye";

import { Step2Props } from "@/types/react-hook-form";

export default function Step2(props: Step2Props) {
  const {
    apiError,
    setApiError,
    setActiveStep,
    register,
    handleSubmit,
    errors,
    watchPassword,
  } = props;

  const [isActive, setIsActive] = useState({
    eye1: false,
    eye2: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  async function onSubmit(data: RegisterFormTypes) {
    setIsLoading(true);
    try {
      const response = await api.post("/usuario/cadastro", {
        nome: data.name,
        email: data.email,
        senha: data.password,
      });
      setIsLoading(false);
      setActiveStep(3);
      return toast({
        title: "Sucesso!",
        description: response.data.message || response.data,
        status: "success",
        duration: 6000,
        isClosable: true,
        position: "top",
      });
    } catch (err: any) {
      setIsLoading(false);

      console.warn(err);

      setApiError(err.response.data.message || err.response.data || "");

      return toast({
        title: "error!",
        description: err.response.data.message || err.response.data || "",
        status: "error",
        duration: 6000,
        isClosable: true,
        position: "top",
      });
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
          px={{ base: "4", sm: "13" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Flex flexDirection="column" gap="35px">
            <Flex flexDirection="column" gap="25px 0px">
              <FormControl position="relative">
                <Label label="Senha" />
                <Input
                  id="password"
                  type={isActive.eye1 ? "text" : "password"}
                  placeholder="********"
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    validate: (fieldValue: string) =>
                      handleStrongPassword(fieldValue),
                  })}
                  isInvalid={thereIsError(errors.password, apiError)}
                  errorBorderColor="#ff0000"
                  onChange={() => setApiError("")}
                />
                {errors?.password?.type === "minLength" && (
                  <TextError msg="As senha deve ter 8 digitos" />
                )}
                {errors?.password?.type === "validate" && (
                  <TextError msg="Use minúsculas, maiúsculas, números, símbolos e tire espaços!" />
                )}
                {errors?.password?.type === "required" && (
                  <TextError msg="O campo é obrigatorio" />
                )}
                <OcultEye1 isActive={isActive} setIsActive={setIsActive} />
              </FormControl>
              <FormControl position="relative">
                <Label label="Repita a senha" />
                <Input
                  id="confirmPassword"
                  type={isActive.eye2 ? "text" : "password"}
                  placeholder="********"
                  {...register("passwordConfirm", {
                    validate: (fieldValue: string) =>
                      handleCheckConfirmPassword(watchPassword, fieldValue),
                  })}
                  isInvalid={thereIsError(errors.passwordConfirm, apiError)}
                  errorBorderColor="#ff0000"
                  onChange={() => setApiError("")}
                />
                {errors.passwordConfirm && (
                  <TextError msg="As senhas devem ser iguais!" />
                )}
                <OcultEye2 isActive={isActive} setIsActive={setIsActive} />
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
                fontSize="14px"
                fontWeight="400"
                isLoading={isLoading}
                onClick={() => handleSubmit(onSubmit)()}
              >
                Finalizar Cadastro
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
