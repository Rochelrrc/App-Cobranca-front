"use client";

import {
  Box,
  Button,
  Flex,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useRouter } from "next/navigation";

import api from "@/api/api";

import thereIsError from "@/utils/thereIsErrorEditUser";
import { formatterOnlyNumbers } from "@/utils/formatters";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "@/utils/localStorage";

import Label from "@/app/components/FormLabel/FormLabel";
import TextError from "@/app/components/ErrorText/ErrorText";

import { IoIosArrowDown } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import { OcultEye1, OcultEye2 } from "@/assets/svg/eye";
import Verify from "@/assets/svg/verify";

import actionTypes from "@/redux/reducers/action-types";

export function ModalUser() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [initialInputs, setInitialInputs] = useState<UserType>();
  const [isActive, setIsActive] = useState({
    eye1: false,
    eye2: false,
  });
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isloading, setIsloading] = useState(false);

  const router = useRouter();
  const toast = useToast();
  const dispatch = useDispatch();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserTypes>();

  const handleLogout = () => {
    removeLocalStorage("userName");
    removeLocalStorage("token");

    router.push("/");
  };

  function changeInitialInput(
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) {
    setApiError("");
    setInitialInputs({ ...initialInputs, [type]: e.target.value });
    return;
  }

  async function onSubmit(data: EditUserTypes) {
    setIsloading(true);
    try {
      await api.patch(
        "/usuario/atualizar",
        {
          nome: data.name,
          email: data.email,
          telefone: formatterOnlyNumbers(data.phoneNumber) || "",
          cpf: formatterOnlyNumbers(data.cpf) || "",
          senhaAtual: data.currentPassword,
          novaSenha: data.newPassword,
        },
        {
          headers: {
            authorization: getLocalStorage("token"),
          },
        }
      );

      setLocalStorage("userName", data.name);
      setApiError("");
      setSuccess(true);

      setTimeout(() => {
        router.refresh();
        onClose();

        setSuccess(false);
      }, 3000);

      setIsloading(false);

      return toast({
        title: "Sucesso!",
        description: `Seus dados foram atualizados com sucesso!`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (err: any) {
      setIsloading(false);

      console.warn(err);

      setApiError(err.response.data.message || err.response.data || "");

      return toast({
        title: "Erro!",
        description: err.response.data.message || err.response.data || "",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  }

  async function getCurrentUser() {
    try {
      const response = await api.get(`/usuario`, {
        headers: {
          authorization: getLocalStorage("token"),
        },
      });
      dispatch({
        type: actionTypes.userKey,
        payload: response.data,
      });
      setInitialInputs(response.data);
      return;
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <IconButton
            aria-label=""
            style={{ color: "#0E8750" }}
            size="md"
            icon={<IoIosArrowDown />}
          />
        </PopoverTrigger>
        <Portal>
          <PopoverContent maxW="fit-content" width="auto" p={1}>
            <PopoverArrow />
            <PopoverBody display="flex" gap="0 7%">
              <Box>
                <IconButton
                  aria-label=""
                  style={{ color: "#0E8750" }}
                  size="md"
                  icon={<FaRegEdit />}
                  onClick={onOpen}
                />
                <Text>Editar</Text>
              </Box>
              <Box>
                <IconButton
                  aria-label=""
                  icon={<IoExitOutline />}
                  onClick={handleLogout}
                />
                <Text>Sair</Text>
              </Box>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        variant="custom"
      >
        <ModalOverlay />
        <ModalContent
          m={success ? "4.5% 0" : "2% 0"}
          boxSize={success ? "75%" : "90%"}
        >
          <ModalCloseButton />
          {success && (
            <>
              <Flex
                h="100%"
                w="100%"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap="2rem 0 "
              >
                <Verify />
                <Text fontFamily="Montserrat" fontSize="1.4rem" color="#343447">
                  Cadastro Alterado com sucesso!
                </Text>
              </Flex>
            </>
          )}
          {!success && (
            <>
              <ModalHeader display="flex" justifyContent="center">
                <Text
                  textAlign="center"
                  fontFamily="Montserrat"
                  fontSize="1.5rem"
                  fontStyle="normal"
                  fontWeight="700"
                  lineHeight="130%"
                  color="#343447"
                >
                  Edite seu Cadastro
                </Text>
              </ModalHeader>
              <ModalBody pb={4}>
                <FormControl position="relative">
                  <Label label="Nome*" />
                  <Input
                    value={initialInputs?.nome}
                    placeholder="Digite seu nome"
                    {...register("name", {
                      required: true,
                    })}
                    isInvalid={thereIsError(errors.name?.type, apiError)}
                    errorBorderColor="#ff0000"
                    onChange={(e) => changeInitialInput(e, "nome")}
                  />
                  {errors.name && <TextError msg="O campo é obrigatorio!" />}
                </FormControl>
                <FormControl mt={4}>
                  <Label label="Email*" />
                  <Input
                    value={initialInputs?.email}
                    placeholder="Digite seu e-mail"
                    {...register("email", {
                      required: true,
                    })}
                    isInvalid={thereIsError(errors.email, apiError)}
                    errorBorderColor="#ff0000"
                    onChange={(e) => changeInitialInput(e, "email")}
                  />
                  {errors.email && <TextError msg="O campo é obrigatorio!" />}
                </FormControl>
                <Flex gap="5%" mt={4}>
                  <FormControl position="relative">
                    <Label label="CPF" />
                    <Input
                      as={InputMask}
                      mask="999-999-999-99"
                      value={initialInputs?.cpf}
                      placeholder="Digite seu CPF"
                      {...register("cpf", {})}
                      isInvalid={thereIsError(errors.cpf, apiError)}
                      errorBorderColor="#ff0000"
                      onChange={(e) => changeInitialInput(e, "cpf")}
                    />
                  </FormControl>
                  <FormControl position="relative">
                    <Label label="Telefone" />
                    <Input
                      as={InputMask}
                      mask="(99) 9 9999-9999"
                      placeholder="Digite seu telefone"
                      value={initialInputs?.telefone}
                      {...register("phoneNumber", {})}
                      isInvalid={thereIsError(errors.phoneNumber, apiError)}
                      errorBorderColor="#ff0000"
                      onChange={(e) => changeInitialInput(e, "telefone")}
                    />
                  </FormControl>
                </Flex>
                <FormControl mt={4}>
                  <Flex flexDirection="column" gap="25px 0px">
                    <Box position="relative">
                      <Label label="Senha Atual*" />
                      <Input
                        id="password"
                        type={isActive.eye1 ? "text" : "password"}
                        placeholder="********"
                        {...register("currentPassword", {
                          required: true,
                        })}
                        isInvalid={thereIsError(
                          errors.currentPassword,
                          apiError
                        )}
                        errorBorderColor="#ff0000"
                        onChange={() => setApiError("")}
                      />
                      {errors.currentPassword && (
                        <TextError msg="O campo é obrigatorio!" />
                      )}
                      <OcultEye1
                        isActive={isActive}
                        setIsActive={setIsActive}
                      />
                    </Box>
                    <Box position="relative">
                      <Label label="Nova Senha" />
                      <Input
                        id="repeatPassword"
                        type={isActive.eye2 ? "text" : "password"}
                        placeholder="********"
                        {...register("newPassword", {})}
                        isInvalid={thereIsError(errors.newPassword, apiError)}
                        errorBorderColor="#ff0000"
                        onChange={() => setApiError("")}
                      />
                      {errors.newPassword && (
                        <TextError msg="O campo é obrigatorio!" />
                      )}
                      <OcultEye2
                        isActive={isActive}
                        setIsActive={setIsActive}
                      />
                    </Box>
                  </Flex>
                </FormControl>
              </ModalBody>
              <ModalFooter display="flex" justifyContent="center" mt="1">
                <Button
                  color="white"
                  backgroundColor="#DA0175"
                  width="160px"
                  height="33px"
                  padding="4px 40px 4px 40px"
                  borderRadius="10px"
                  gap="4px"
                  _hover={{ bg: "rgb(167, 8, 93)" }}
                  _active={{ bg: "rgb(141, 7, 79)" }}
                  isLoading={isloading}
                  onClick={() => handleSubmit(onSubmit)()}
                >
                  Aplicar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
