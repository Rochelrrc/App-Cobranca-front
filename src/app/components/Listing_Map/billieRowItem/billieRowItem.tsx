import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";

import { formatterDate, formatterCoin } from "@/utils/formatters";

import EditBillieIcon from "@/assets/svg/forSpecificClient/editBillieIcon";
import DeleteBillieIcon from "@/assets/svg/forSpecificClient/deleteBillieIcon";

import actionTypes from "@/redux/reducers/action-types";

export default function BillieRowItem(props: billieRowItemType) {
  const { id, idClient, dataDeVencimento, valor, status, descricao } = props;

  const dispatch = useDispatch();

  function handleOpenBillDetail() {
    dispatch({ type: actionTypes.billIdKey, payload: id });

    dispatch({
      type: actionTypes.billDetailsModalIsOpenKey,
      payload: true,
    });

    return;
  }

  function handleEditBillButton() {
    dispatch({ type: actionTypes.billIdKey, payload: id });

    dispatch({
      type: actionTypes.editBillieModalIsOpenKey,
      payload: true,
    });

    return;
  }

  function handleDelteBillButton() {
    dispatch({ type: actionTypes.billIdKey, payload: id });

    dispatch({
      type: actionTypes.deleteBillModalIsOpenKey,
      payload: true,
    });
    return;
  }

  return (
    <Flex
      alignItems="center"
      borderBottom="solid 1px #EFF0F6"
      minH="33.3%"
      w="100%"
    >
      <Text
        width="17%"
        fontFamily="Nunito"
        fontSize="0.9rem"
        fontStyle="normal"
        fontWeight="400"
        lineHeight="40px"
        letterSpacing="0.07px"
        color="#6E6E85"
        cursor="pointer"
        onClick={handleOpenBillDetail}
      >
        {idClient}
      </Text>
      <Text
        width="18%"
        fontFamily="Nunito"
        fontSize="0.9rem"
        fontStyle="normal"
        fontWeight="400"
        lineHeight="40px"
        letterSpacing="0.07px"
        color="#6E6E85"
        cursor="pointer"
        onClick={handleOpenBillDetail}
      >
        {formatterDate(dataDeVencimento)}
      </Text>
      <Text
        width="11.5%"
        fontFamily="Nunito"
        fontSize="0.9rem"
        fontStyle="normal"
        fontWeight="400"
        lineHeight="40px"
        letterSpacing="0.07px"
        color="#6E6E85"
        cursor="pointer"
        onClick={handleOpenBillDetail}
      >
        {formatterCoin(valor)}
      </Text>
      <Box width="11%" cursor="pointer" onClick={handleOpenBillDetail}>
        {status.toLowerCase() === "paga" && (
          <Text
            width="fit-content"
            p="0% 6%"
            fontFamily="Nunito"
            fontSize="0.9rem"
            fontStyle="normal"
            fontWeight="600"
            lineHeight="1.5rem"
            letterSpacing="0.07px"
            color="#1FA7AF"
            bg="#EEF6F6"
          >
            Paga
          </Text>
        )}
        {status.toLowerCase() === "vencida" && (
          <Text
            width="fit-content"
            p="0% 6%"
            fontFamily="Nunito"
            fontSize="0.9rem"
            fontStyle="normal"
            fontWeight="600"
            lineHeight="1.5rem"
            letterSpacing="0.07px"
            color="#971D1D"
            bg="#FFEFEF"
          >
            Vencida
          </Text>
        )}
        {status.toLowerCase() === "pendente" && (
          <Text
            width="fit-content"
            p="0% 6%"
            fontFamily="Nunito"
            fontSize="0.9rem"
            fontStyle="normal"
            fontWeight="600"
            lineHeight="1.5rem"
            letterSpacing="0.07px"
            color="#C5A605"
            bg="#FCF6DC"
          >
            Pendente
          </Text>
        )}
      </Box>
      <Text
        width="30%"
        pr="1rem"
        fontFamily="Nunito"
        fontSize="0.9rem"
        fontStyle="normal"
        fontWeight="400"
        lineHeight="40px"
        letterSpacing="0.07px"
        color="#6E6E85"
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
        cursor="pointer"
        onClick={handleOpenBillDetail}
      >
        {descricao}
      </Text>
      <Flex justifyContent="space-around" alignItems="center" w="12.5%">
        <Flex
          flexDirection="column"
          alignItems="center"
          cursor="pointer"
          onClick={handleEditBillButton}
        >
          <EditBillieIcon />
          <Text
            color="#747488"
            fontFamily="Nunito"
            fontSize="0.5rem"
            fontStyle="normal"
            fontWeight="600"
            lineHeight="normal"
          >
            Editar
          </Text>
        </Flex>
        <Flex
          flexDirection="column"
          alignItems="center"
          cursor="pointer"
          onClick={handleDelteBillButton}
        >
          <DeleteBillieIcon />
          <Text
            color="#AE1100"
            fontFamily="Nunito"
            fontSize="0.5rem"
            fontStyle="normal"
            fontWeight="600"
            lineHeight="normal"
          >
            Excluir
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
