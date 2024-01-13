"use client";

import {
  Flex,
  Box,
  Text,
  FormControl,
  Input,
  Checkbox,
  Button,
  useToast,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import api from "@/api/api";

import { getLocalStorage } from "@/utils/localStorage";
import { formatterOnlyNumbers } from "@/utils/formatters";

import Label from "@/app/components/FormLabel/FormLabel";
import TextError from "@/app/components/ErrorText/ErrorText";

import actionTypes from "@/redux/reducers/action-types";

export default function AddBillieForm() {
  const {
    oneClient,
    updateBill,
  }: { oneClient: ClientType; updateBill: boolean } = useSelector(
    (rootReducer: any) => rootReducer.getApiReducer
  );

  const { clientId }: { clientId: number } = useSelector(
    (rootReducer: any) => rootReducer.clientReducer
  );

  const [isCheck, setIsCheck] = useState(true);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddBillFormTypes>();

  async function onSubmit(data: AddBillFormTypes) {
    if (!clientId) return;
    try {
      let status = "";
      isCheck ? (status = "cobrança paga") : (status = "cobrança pendente");

      setIsLoading(true);
      await api.post(
        `/cadastrar/cobranca/${clientId}`,
        {
          nome: oneClient.nome,
          valor: formatterOnlyNumbers(String(Number(data.price).toFixed(2))),
          descricao: data.discription,
          vencimento: data.date,
          status: status,
        },
        {
          headers: {
            authorization: getLocalStorage("token"),
          },
        }
      );

      setIsLoading(false);

      dispatch({ type: actionTypes.updateBillKey, payload: !updateBill });
      dispatch({ type: actionTypes.addBillieModalIsOpenKey, payload: false });

      return toast({
        title: "Sucesso!",
        description: `Cobrança criada com sucesso!!!`,
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

  return (
    <>
      <Flex flexDirection="column" w="100%">
        <FormControl mb="5%">
          <Label label="Nome*" />
          <Input value={oneClient.nome} type="text" position="relative" />
        </FormControl>
        <FormControl mb="5%">
          <Label label="Descrição*" />
          <Textarea
            placeholder="Digite a descrição..."
            {...register("discription", {
              required: true,
            })}
          />
          {errors?.discription?.type === "required" && (
            <TextError msg="Este Campo é obrigatorio!" />
          )}
        </FormControl>
        <Flex gap="5%" mb="5%">
          <FormControl>
            <Label label="Vencimento" />
            <Input
              type="date"
              {...register("date", {
                required: true,
              })}
            />
            {errors?.date?.type === "required" && (
              <TextError msg="Este Campo é obrigatorio!" />
            )}
          </FormControl>
          <FormControl position="relative">
            <Label label="Valor*" />
            <Input
              type="number"
              {...register("price", {
                required: true,
              })}
            />
            {errors?.price?.type === "required" && (
              <TextError msg="Este Campo é obrigatorio!" />
            )}
          </FormControl>
        </Flex>
        <Label label="Status*" />
        <Box w="100%">
          <Checkbox
            value="cobrança paga"
            isChecked={isCheck}
            size="lg"
            colorScheme="green"
            borderRadius="1rem"
            h="2.2rem"
            w="100%"
            p="0 5%"
            mb="2%"
            bg="#F0F0F5"
            onChange={() => setIsCheck(true)}
          >
            Cobrança Paga
          </Checkbox>

          <Checkbox
            value="cobrança pedente"
            isChecked={!isCheck}
            size="lg"
            colorScheme="green"
            borderRadius="1rem"
            h="2.2rem"
            w="100%"
            p="0 5%"
            bg="#F0F0F5"
            onChange={() => setIsCheck(false)}
          >
            Cobrança Pedente
          </Checkbox>
        </Box>
      </Flex>
      <Flex
        justifyContent="space-around"
        alignItems="start"
        width="100%"
        m="5% 0 0 0"
      >
        <Button
          width="40%"
          color="#0E8750"
          bg="#F8F8F9"
          _hover={{ bg: "#DEDEE9" }}
          _active={{ bg: "#c5c5cc" }}
          onClick={() =>
            dispatch({
              type: actionTypes.addBillieModalIsOpenKey,
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
