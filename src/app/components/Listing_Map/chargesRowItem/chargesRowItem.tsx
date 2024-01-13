import React from "react";
import { Text, Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import { formatterCoin, formatterDate } from "@/utils/formatters";

import EditBillieIcon from "@/assets/svg/forSpecificClient/editBillieIcon";
import DeleteBillieIcon from "@/assets/svg/forSpecificClient/deleteBillieIcon";
import actionTypes from "@/redux/reducers/action-types";

export default function ChargesRowItem(props: ChargesRowItemType) {
  const { id, name, idCharge, valor, dataDeVencimento, status, descricao } =
    props;

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

  function handleDeleteBillButton() {
    dispatch({ type: actionTypes.billIdKey, payload: id });

    dispatch({
      type: actionTypes.deleteBillModalIsOpenKey,
      payload: true,
    });

    return;
  }

  return (
    <>
      <Flex
        alignItems="center"
        height="15%"
        minHeight="15%"
        borderTop="solid 1px #EFF0F6"
        borderBottom="solid 1px #EFF0F6"
        bg="#fff"
      >
        <Text
          width="17.6%"
          padding="0 3%"
          fontFamily="Nunito"
          fontSize="0.8rem"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="130%"
          letterSpacing="0.08px"
          color="#6E6E85"
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
          cursor="pointer"
          onClick={handleOpenBillDetail}
        >
          {name}
        </Text>
        <Text
          width="10.0%"
          fontFamily="Nunito"
          fontSize="0.8rem"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="130%"
          letterSpacing="0.08px"
          color="#6E6E85"
          cursor="pointer"
          onClick={handleOpenBillDetail}
        >
          {idCharge}
        </Text>
        <Text
          width="12.6%"
          p="0 3.7% 0 0"
          fontFamily="Nunito"
          fontSize="0.8rem"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="130%"
          letterSpacing="0.08px"
          color="#6E6E85"
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
          cursor="pointer"
          onClick={handleOpenBillDetail}
        >
          {formatterCoin(valor)}
        </Text>
        <Text
          width="11.0%"
          fontFamily="Nunito"
          fontSize="0.8rem"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="130%"
          letterSpacing="0.08px"
          color="#6E6E85"
          cursor="pointer"
          onClick={handleOpenBillDetail}
        >
          {formatterDate(dataDeVencimento)}
        </Text>
        <Flex
          justifyContent="center"
          alignItems="center"
          width="15.0%"
          cursor="pointer"
          onClick={handleOpenBillDetail}
        >
          {status.toLowerCase() === "pendente" ? (
            <Text
              borderRadius="0.5rem"
              width="fit-content"
              p="2% 6%"
              fontFamily="Nunito"
              fontSize="0.8rem"
              fontStyle="normal"
              fontWeight="600"
              lineHeight="normal"
              color="#C5A605"
              bg="#FCF6DC"
            >
              Pendente
            </Text>
          ) : status.toLowerCase() === "vencida" ? (
            <Text
              borderRadius="0.5rem"
              width="fit-content"
              p="2% 6%"
              fontFamily="Nunito"
              fontSize="0.8rem"
              fontStyle="normal"
              fontWeight="600"
              lineHeight="normal"
              color="#971D1D"
              bg="#FFEFEF"
            >
              Vencida
            </Text>
          ) : (
            <Text
              borderRadius="0.5rem"
              width="fit-content"
              p="2% 6%"
              fontFamily="Nunito"
              fontSize="0.8rem"
              fontStyle="normal"
              fontWeight="600"
              lineHeight="normal"
              color="#1FA7AF"
              bg="#EEF6F6"
            >
              Paga
            </Text>
          )}
        </Flex>
        <Text
          width="24%"
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
        <Flex justifyContent="space-around" alignItems="center" w="8.5%">
          <Flex
            flexDirection="column"
            alignItems="center"
            cursor="pointer"
            onClick={() => handleEditBillButton()}
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
            onClick={handleDeleteBillButton}
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
    </>
  );
}
