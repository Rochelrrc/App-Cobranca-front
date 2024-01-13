import React from "react";
import { Text, Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import { formatterCPF, formatterPhoneNumber } from "@/utils/formatters";

import AddBillieIcon from "@/assets/svg/forClientDashboard/addBillieIcon";

import actionTypes from "@/redux/reducers/action-types";

export default function ClientRowItem(props: clientRowItemType) {
  const { id, name, CPF, email, phoneNumber, status } = props;

  const { isOpenClientData }: { isOpenClientData: boolean } = useSelector(
    (rootReducer: any) => rootReducer.clientReducer
  );

  const dispatch = useDispatch();

  function handleOpenUser() {
    dispatch({ type: actionTypes.clientIdKey, payload: id });
    dispatch({ type: actionTypes.isOpenClientDataKey, payload: true });

    return;
  }

  function handleAddBillButton() {
    dispatch({ type: actionTypes.clientIdKey, payload: id });
    dispatch({
      type: actionTypes.addBillieModalIsOpenKey,
      payload: true,
    });

    return;
  }

  return (
    <>
      {!isOpenClientData && (
        <Flex
          alignItems="center"
          height="15%"
          minHeight="15%"
          borderTop="solid 1px #EFF0F6"
          borderBottom="solid 1px #EFF0F6"
          bg="#fff"
        >
          <Text
            width="16.6%"
            padding="0 3%"
            textAlign="center"
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
            onClick={handleOpenUser}
          >
            {name}
          </Text>
          <Text
            width="16.6%"
            textAlign="center"
            fontFamily="Nunito"
            fontSize="0.8rem"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="130%"
            letterSpacing="0.08px"
            color="#6E6E85"
            cursor="pointer"
            onClick={handleOpenUser}
          >
            {formatterCPF(CPF)}
          </Text>
          <Text
            width="16.6%"
            p="0 0.5%"
            textAlign="center"
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
            onClick={handleOpenUser}
          >
            {email}
          </Text>
          <Text
            width="16.6%"
            textAlign="center"
            fontFamily="Nunito"
            fontSize="0.8rem"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="130%"
            letterSpacing="0.08px"
            color="#6E6E85"
            cursor="pointer"
            onClick={handleOpenUser}
          >
            {formatterPhoneNumber(phoneNumber)}
          </Text>
          <Flex
            justifyContent="center"
            alignItems="center"
            width="16.6%"
            cursor="pointer"
            onClick={handleOpenUser}
          >
            {status === "Inadimplente" ? (
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
                Inamdimplente
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
                Em dia
              </Text>
            )}
          </Flex>
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width="16.6%"
            onClick={() => {handleAddBillButton()}}
          >
            <AddBillieIcon />
            <Text
              textAlign="center"
              fontFamily="Nunito"
              fontSize="0.8rem"
              fontStyle="normal"
              fontWeight="400"
              lineHeight="130%"
              letterSpacing="0.08px"
              color="#DA0175"
              cursor="pointer"
            >
              Cobrança
            </Text>
          </Flex>
        </Flex>
      )}
    </>
  );
}
