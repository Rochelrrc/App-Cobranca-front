"use client";

import {
  Flex,
  Box,
  Text,
  Textarea,
  FormControl,
  Input,
  Checkbox,
  Button,
  useToast,
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

export default function EditBillieForm() {
  const { oneBill }: { oneBill: BillType } = useSelector(
    (rootReducer: any) => rootReducer.getApiReducer
  );

  const { billId }: { billId: number } = useSelector(
    (rootReducer: any) => rootReducer.billReducer
  );

  const [initialInputs, setInitialInputs] = useState(oneBill);
  const [isCheck, setIsCheck] = useState(true);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditBillFormTypes>();

  async function onSubmit(data: EditBillFormTypes) {
    console.log(data);
    try {
      setIsLoading(true);

      let status = "";
      if (isCheck) {
        status = "paga";
      } else {
        status = "pendente";
      }

      await api.patch(
        `/cobranca/atualizar/${billId}`,
        {
          valor:
            formatterOnlyNumbers(String(Number(data.price).toFixed(2))) ||
            initialInputs.valor,
          descricao: data.discription || initialInputs.descricao,
          vencimento: data.date || initialInputs.vencimento,
          status: status,
        },
        {
          headers: {
            authorization: getLocalStorage("token"),
          },
        }
      );
      setIsLoading(false);

      dispatch({ type: actionTypes.editBillieModalIsOpenKey, payload: false });

      return toast({
        title: "Sucesso!",
        description: `Cobrança editada com sucesso!!!`,
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
        title: "Não foi possivel concluir a edição!",
        description: err.response.data.message || err.response.data || "",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  }

  function changeInitialInput(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    type: string
  ) {
    setApiError("");
    setInitialInputs({ ...initialInputs, [type]: e.target.value });
    return;
  }

  function formatDateToInput(date: string) {
    return date ? new Date(date).toISOString().split("T")[0] : "";
  }

  function handleRequiredTrueValidate(fieldType: string) {
    if (fieldType === "discription" && initialInputs.descricao === "") {
      return false;
    }
    if (fieldType === "date" && initialInputs.vencimento === "") {
      return false;
    }
    if (fieldType === "price" && String(initialInputs.valor) === "") {
      return false;
    }

    return true;
  }

  useEffect(() => {
    setInitialInputs(oneBill);
  }, [oneBill]);

  return (
    <>
      <Flex flexDirection="column" w="100%">
        <FormControl mb="5%">
          <Label label="Nome*" />
          <Input
            value={initialInputs?.nome_cliente}
            type="text"
            position="relative"
          />
        </FormControl>
        <FormControl mb="5%">
          <Label label="Descrição*" />
          <Textarea
            value={initialInputs.descricao}
            placeholder="Digite a descrição..."
            {...register("discription", {
              validate: () => {
                return handleRequiredTrueValidate("discription");
              },
            })}
            onChange={(e) => changeInitialInput(e, "descricao")}
          />
          {errors?.discription?.type === "validate" && (
            <Box position="absolute" w="100%" bottom="-25%">
              <TextError msg="Este Campo é obrigatorio!" />
            </Box>
          )}
        </FormControl>
        <Flex gap="5%" mb="5%">
          <FormControl>
            <Label label="Vencimento" />
            <Input
              type="date"
              value={formatDateToInput(initialInputs.vencimento)}
              {...register("date", {
                validate: () => {
                  return handleRequiredTrueValidate("date");
                },
              })}
              onChange={(e) => changeInitialInput(e, "vencimento")}
            />
            {errors?.date?.type === "validate" && (
              <TextError msg="Este Campo é obrigatorio!" />
            )}
          </FormControl>
          <FormControl position="relative">
            <Label label="Valor*" />
            <Input
              type="number"
              value={initialInputs.valor}
              {...register("price", {
                validate: () => {
                  return handleRequiredTrueValidate("price");
                },
              })}
              onChange={(e) => changeInitialInput(e, "valor")}
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
              type: actionTypes.editBillieModalIsOpenKey,
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
