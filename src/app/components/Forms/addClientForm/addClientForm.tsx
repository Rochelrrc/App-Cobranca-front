"use client";

import {
  Box,
  Button,
  FormControl,
  Input,
  useToast,
  Text,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import InputMask from "react-input-mask";
import axios from "axios";

import api from "@/api/api";

import { getLocalStorage } from "@/utils/localStorage";
import { formatterOnlyNumbers } from "@/utils/formatters";
import thereIsError from "@/utils/thereIsErrorEditUser";

import TextError from "@/app/components/ErrorText/ErrorText";
import Label from "@/app/components/FormLabel/FormLabel";

import actionTypes from "@/redux/reducers/action-types";

export default function AddClientForm() {
  const { updateClientList }: { updateClientList: boolean } = useSelector(
    (rootReducer: any) => rootReducer.clientReducer
  );

  const [apiError, setApiError] = useState<string>("");
  const [errorViaCep, setErrorViaCep] = useState<boolean>(false);
  const [initialInputs, setInitialInputs] = useState<initialInputsTypes>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormType>();

  async function onSubmit(data: ClientFormType) {
    setIsLoading(true);
    try {
      await api.post(
        "/cadastroCliente",
        {
          nome: data.name,
          email: data.email,
          cpf: formatterOnlyNumbers(data.cpf),
          telefone: formatterOnlyNumbers(data.phoneNumber),
          cep: formatterOnlyNumbers(data.cep),
          logradouro: data.address || initialInputs?.logradouro || "",
          bairro: data.neighbourhood || initialInputs?.bairro || "",
          complemento: data.addressDetail,
          uf: data.state || initialInputs?.uf || "",
          cidade: data.city || initialInputs?.localidade || "",
        },
        {
          headers: {
            authorization: getLocalStorage("token"),
          },
        }
      );
      setIsLoading(false);
      dispatch({ type: actionTypes.newClientModalIsOpenKey, payload: false });
      dispatch({
        type: actionTypes.updateClientListKey,
        payload: !updateClientList,
      });

      return toast({
        title: "Sucesso!",
        description: `Cliente criado com sucesso!!!`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    } catch (err: any) {
      setIsLoading(false);

      console.warn(err);

      setApiError(err.response.data.message || err.response.data || "");

      return toast({
        title: "Erro! Criação não concluida!",
        description: err.response.data.message || err.response.data || "",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  }

  async function getViaCepData(e: React.ChangeEvent<HTMLInputElement>) {
    const formattedValue = formatterOnlyNumbers(e.target.value);

    if (formattedValue === undefined){
      return
    }

    setApiError("");
    if (formattedValue.length <= 7) {
      return;
    }

    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${formattedValue}/json/`
      );

      if (response.data.erro) {
        setErrorViaCep(true);
      } else {
        setInitialInputs(response.data);
        setErrorViaCep(false);
      }

      return;
    } catch (err) {
      setErrorViaCep(true);
      return;
    }
  }

  function changeInitialInput(
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) {
    setApiError("");
    setInitialInputs({ ...initialInputs, [type]: e.target.value });
    return;
  }

  return (
    <>
      <FormControl mt="4%" position="relative">
        <Label label="Nome*" />
        <Input
          type="text"
          {...register("name", {
            required: true,
          })}
          isInvalid={thereIsError(errors.name?.type, apiError)}
          errorBorderColor="#ff0000"
          onChange={() => setApiError("")}
        />
        {errors?.name?.type === "required" && (
          <TextError msg="Este Campo é obrigatorio!" />
        )}
      </FormControl>
      <FormControl mt="4%" position="relative">
        <Label label="E-mail*" />
        <Input
          type="email"
          {...register("email", {
            required: true,
          })}
          isInvalid={thereIsError(errors.email?.type, apiError)}
          errorBorderColor="#ff0000"
          onChange={() => setApiError("")}
        />
        {errors?.email?.type === "required" && (
          <TextError msg="Este Campo é obrigatorio!" />
        )}
      </FormControl>
      <Flex className="row" justifyContent="space-between" gap="10%" mt="4%">
        <FormControl>
          <Label label="CPF*" />
          <Input
            as={InputMask}
            type="text"
            mask="999.999.999-99"
            {...register("cpf", {
              required: true,
            })}
            isInvalid={thereIsError(errors.cpf?.type, apiError)}
            errorBorderColor="#ff0000"
            onChange={() => setApiError("")}
          />
          {errors?.cpf?.type === "required" && (
            <TextError msg="Este Campo é obrigatorio!" />
          )}
        </FormControl>
        <FormControl>
          <Label label="Telefone*" />
          <Input
            as={InputMask}
            type="text"
            mask="(99) 9 9999-9999"
            {...register("phoneNumber", {
              required: true,
            })}
            isInvalid={thereIsError(errors.phoneNumber?.type, apiError)}
            errorBorderColor="#ff0000"
            onChange={() => setApiError("")}
          />
          {errors?.phoneNumber?.type === "required" && (
            <TextError msg="Este Campo é obrigatorio!" />
          )}
        </FormControl>
      </Flex>
      <FormControl mt="6%" position="relative">
        <Label label="Endereço" />
        <Input
          value={initialInputs?.logradouro}
          type="text"
          {...register("address", {})}
          isInvalid={thereIsError(errors.address?.type, apiError)}
          errorBorderColor="#ff0000"
          onChange={(e) => changeInitialInput(e, "logradouro")}
        />
      </FormControl>
      <FormControl mt="4%" position="relative">
        <Label label="Complemento" />
        <Input
          type="text"
          {...register("addressDetail", {})}
          isInvalid={thereIsError(errors.addressDetail?.type, apiError)}
          errorBorderColor="#ff0000"
          onChange={() => setApiError("")}
        />
      </FormControl>
      <Flex className="row2" gap="10%" mt="4%">
        <FormControl>
          <Label label="CEP" />
          <Input
            as={InputMask}
            mask="99999-999"
            type="text"
            {...register("cep", {})}
            isInvalid={thereIsError(errorViaCep, apiError)}
            errorBorderColor="#ff0000"
            onChange={(e) => getViaCepData(e)}
          />
          {errorViaCep && <TextError msg="CEP não encontrado!" />}
        </FormControl>
        <FormControl>
          <Label label="Bairro" />
          <Input
            value={initialInputs?.bairro}
            type="text"
            {...register("neighbourhood", {})}
            isInvalid={thereIsError(errors.neighbourhood?.type, apiError)}
            errorBorderColor="#ff0000"
            onChange={(e) => changeInitialInput(e, "bairro")}
          />
        </FormControl>
      </Flex>
      <Flex className="row3" gap="10%" mt="4%">
        <FormControl>
          <Label label="Cidade" />
          <Input
            value={initialInputs?.localidade}
            type="text"
            {...register("city", {})}
            isInvalid={thereIsError(errors.city?.type, apiError)}
            errorBorderColor="#ff0000"
            onChange={(e) => changeInitialInput(e, "localidade")}
          />
        </FormControl>
        <FormControl>
          <Label label="UF" />
          <Input
            value={initialInputs?.uf}
            as={InputMask}
            mask="aa"
            type="text"
            {...register("state", {})}
            isInvalid={thereIsError(errors.state?.type, apiError)}
            errorBorderColor="#ff0000"
            onChange={(e) => changeInitialInput(e, "uf")}
          />
        </FormControl>
      </Flex>
      <Flex justifyContent="space-around" width="100%" m="5% 0 0 0">
        <Button
          width="40%"
          color="#0E8750"
          bg="#F8F8F9"
          _hover={{ bg: "#DEDEE9" }}
          _active={{ bg: "#c5c5cc" }}
          onClick={() =>
            dispatch({
              type: actionTypes.newClientModalIsOpenKey,
              payload: false,
            })
          }
        >
          Cancelar
        </Button>
        <Button
          width="40%"
          color="#fff"
          bg="#DA0175"
          _hover={{ bg: "rgb(167, 8, 93)" }}
          _active={{ bg: "rgb(141, 7, 79)" }}
          isLoading={isLoading}
          onClick={() => handleSubmit(onSubmit)()}
        >
          Aplicar
        </Button>
      </Flex>
    </>
  );
}
