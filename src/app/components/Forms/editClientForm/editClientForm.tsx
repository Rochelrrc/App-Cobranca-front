"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
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

import Label from "@/app/components/FormLabel/FormLabel";
import TextError from "@/app/components/ErrorText/ErrorText";

import { getLocalStorage } from "@/utils/localStorage";
import { formatterOnlyNumbers } from "@/utils/formatters";
import thereIsError from "@/utils/thereIsErrorEditUser";

import actionTypes from "@/redux/reducers/action-types";

export default function EditClientForm() {
  const { oneClient }: { oneClient: ClientType } = useSelector(
    (rootReducer: any) => rootReducer.getApiReducer
  );

  const { updateOneClient }: { updateOneClient: boolean } = useSelector(
    (rootReducer: any) => rootReducer.clientReducer
  );

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [errorViaCep, setErrorViaCep] = useState(false);
  const [initialInputs, setInitialInputs] = useState(oneClient);

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
      await api.patch(
        `/cliente/atualizar_cadastro/${oneClient.id}`,
        {
          nome: data.name,
          email: data.email,
          cpf: formatterOnlyNumbers(data.cpf),
          telefone: formatterOnlyNumbers(data.phoneNumber) || "",
          cep: formatterOnlyNumbers(data.cep) || "",
          logradouro: data.address || initialInputs.logradouro || "",
          bairro: data.neighbourhood || initialInputs.bairro || "",
          complemento: data.addressDetail || "",
          uf: data.state || initialInputs.uf || "",
          cidade: data.city || initialInputs.cidade || "",
        },
        {
          headers: {
            authorization: getLocalStorage("token"),
          },
        }
      );

      setIsLoading(false);

      dispatch({ type: actionTypes.editClientModalIsOpenKey, payload: false });
      dispatch({
        type: actionTypes.updateOneClientKey,
        payload: !updateOneClient,
      });

      return toast({
        title: "Sucesso!",
        description: `Atualizado com sucesso!!!`,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    } catch (err: any) {
      setIsLoading(false);

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
    changeInitialInput(e, "cep");
    const formatter = formatterOnlyNumbers(e.target.value);
    setApiError("");

    if (formatter === undefined){
      return
    }

    if (formatter.length <= 7) {
      return;
    }

    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${formatter}/json/`
      );

      if (response.data.erro) {
        setErrorViaCep(true);
      } else {
        const changeLocalidadeToCidade = {
          ...response.data,
          cidade: response.data.localidade,
        };
        setInitialInputs(changeLocalidadeToCidade);
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
          value={initialInputs?.nome}
          type="text"
          {...register("name", {
            required: true,
          })}
          isInvalid={thereIsError(errors.name?.type, apiError)}
          errorBorderColor="#ff0000"
          onChange={(e) => changeInitialInput(e, "nome")}
        />
        {errors?.name?.type === "required" && (
          <TextError msg="Este Campo é obrigatorio!" />
        )}
      </FormControl>
      <FormControl mt="4%" position="relative">
        <Label label="E-mail*" />
        <Input
          value={initialInputs?.email}
          type="email"
          {...register("email", {
            required: true,
          })}
          isInvalid={thereIsError(errors.email?.type, apiError)}
          errorBorderColor="#ff0000"
          onChange={(e) => changeInitialInput(e, "email")}
        />
        {errors?.email?.type === "required" && (
          <TextError msg="Este Campo é obrigatorio!" />
        )}
      </FormControl>
      <Flex className="row" justifyContent="space-between" gap="10%" mt="4%">
        <FormControl>
          <Label label="CPF*" />
          <Input
            value={initialInputs?.cpf}
            as={InputMask}
            type="text"
            mask="999.999.999-99"
            {...register("cpf", {
              required: true,
            })}
            isInvalid={thereIsError(errors.cpf?.type, apiError)}
            errorBorderColor="#ff0000"
            onChange={(e) => changeInitialInput(e, "cpf")}
          />
          {errors?.cpf?.type === "required" && (
            <TextError msg="Este Campo é obrigatorio!" />
          )}
        </FormControl>
        <FormControl>
          <Label label="Telefone*" />
          <Input
            value={initialInputs?.telefone}
            as={InputMask}
            type="text"
            mask="(99) 9 9999-9999"
            {...register("phoneNumber", {
              required: true,
            })}
            isInvalid={thereIsError(errors.phoneNumber?.type, apiError)}
            errorBorderColor="#ff0000"
            onChange={(e) => changeInitialInput(e, "telefone")}
          />
          {errors?.phoneNumber?.type === "required" && (
            <TextError msg="Este Campo é obrigatorio!" />
          )}
        </FormControl>
      </Flex>
      <FormControl mt="6%" position="relative">
        <Label label="Enderenço" />
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
          value={initialInputs?.complemento}
          type="text"
          {...register("addressDetail", {})}
          isInvalid={thereIsError(errors.addressDetail?.type, apiError)}
          errorBorderColor="#ff0000"
          onChange={(e) => changeInitialInput(e, "complemento")}
        />
      </FormControl>
      <Flex className="row2" gap="10%" mt="4%">
        <FormControl>
          <Label label="CEP" />
          <Input
            value={initialInputs?.cep}
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
            value={initialInputs?.cidade}
            type="text"
            {...register("city", {})}
            isInvalid={thereIsError(errors.city?.type, apiError)}
            errorBorderColor="#ff0000"
            onChange={(e) => changeInitialInput(e, "cidade")}
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
              type: actionTypes.editClientModalIsOpenKey,
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
