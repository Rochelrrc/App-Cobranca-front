"use client";

import {
  Flex,
  Spacer,
  Text,
  Box,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepSeparator,
  Container,
  Button,
  Link,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Step1 from "@/app/components/Register/Step1/Step1";
import Step2 from "@/app/components/Register/Step2/Step2";

import Verify from "@/assets/svg/verify";

export default function Cadastro() {
  const [activeStep, setActiveStep] = useState(1);
  const [apiError, setApiError] = useState("");
  const steps = [1, 2, 3];

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormTypes>();

  const watchPassword = watch("password");

  return (
    <>
      <Flex bg="#F8F8F8" w="100vw" h="100vh" overflow="hidden">
        <Flex flexDirection="column" bg="#F0F0F5" w="46.5vw" padding="0px 40px">
          <Spacer />
          <Flex gap="0px 20px">
            <Stepper
              index={activeStep}
              orientation="vertical"
              colorScheme="green"
              height="200px"
              gap="0"
            >
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>
                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
            <Flex gap="2.5rem" flexDirection="column">
              <Box>
                <Text
                  color="#38A169"
                  fontFamily="Montserrat"
                  fontWeight="700"
                  fontSize="0.9rem"
                >
                  Cadastre-se
                </Text>
                <Text fontFamily="Nunito" fontWeight="600" fontSize="15px">
                  Por favor, escreve seu nome e e-mail
                </Text>
              </Box>
              <Box>
                <Text
                  color="#38A169"
                  fontFamily="Montserrat"
                  fontWeight="700"
                  fontSize="15px"
                >
                  Escolha uma senha
                </Text>
                <Text fontFamily="Nunito" fontWeight="600" fontSize="15px">
                  Escolha uma senha segura
                </Text>
              </Box>
              <Box>
                <Text
                  color="#38A169"
                  fontFamily="Montserrat"
                  fontWeight="700"
                  fontSize="15px"
                >
                  Cadastro realizado com sucesso
                </Text>
                <Text fontFamily="Nunito" fontWeight="600" fontSize="15px">
                  E-mail e senha cadastrados com sucesso
                </Text>
              </Box>
            </Flex>
          </Flex>

          <Spacer />
          <Spacer />
        </Flex>
        <Flex
          flexDirection="column"
          w="100%"
          justifyContent="center"
          alignItems="center"
        >
          {activeStep === 1 && (
            <Step1
              apiError={apiError}
              setApiError={setApiError}
              setActiveStep={setActiveStep}
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
            />
          )}
          {activeStep === 2 && (
            <Step2
              apiError={apiError}
              setApiError={setApiError}
              setActiveStep={setActiveStep}
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              watchPassword={watchPassword}
            />
          )}
          {activeStep === 3 && (
            <>
              <Container
                maxW="lg"
                py={{ base: "0", md: "28" }}
                px={{ base: "0", sm: "8" }}
                bg="#F0F0F5"
                marginBottom={10}
              >
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  gap="25px"
                  h="100%"
                  w="100%"
                >
                  <Verify />
                  <Text
                    textAlign="center"
                    fontFamily="Montserrat"
                    fontSize="20px"
                    fontWeight="700"
                  >
                    Cadastro realizado com sucesso!
                  </Text>
                </Flex>
              </Container>
              <Link href="/">
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
                  fontFamily="Nunito"
                  fontSize="14px"
                  fontWeight="400"
                  onClick={() => setActiveStep(3)}
                >
                  Ir para Login
                </Button>
              </Link>
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
}
