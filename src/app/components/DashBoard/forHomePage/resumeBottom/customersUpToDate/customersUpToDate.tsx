import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import RowItem2 from "@/app/components/DashBoard/forHomePage/resumeBottom/rowItem2/rowItem2";

import CustomersUpToDateIcon from "@/assets/svg/forHomeDashboard/customersUpToDate";
import actionTypes from "@/redux/reducers/action-types";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

export default function CustomersUpToDate() {
  const { customersUpToDate }: { customersUpToDate: ClientType[] } =
    useSelector((rootReducer: any) => rootReducer.getApiReducer);

    const dispatch = useDispatch();
    const router = useRouter();

  return (
    <>
      <Box height="100%" width="48%" bg="#fff">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          border-radius="30px"
          height="20%"
          width="100%"
          padding="0 10%"
        >
          <Flex alignItems="center">
            <CustomersUpToDateIcon />
            <Text
              fontFamily="Montserrat"
              fontSize="0.9rem"
              fontStyle="normal"
              fontWeight="700"
              lineHeight="130%"
              color="#3F3F55"
            >
              Clientes em dia
            </Text>
          </Flex>
          <Box bg="#EEF6F6" borderRadius="0.5rem" padding="1% 3%">
            <Text
              fontFamily="Montserrat"
              fontSize="0.8rem"
              fontStyle="normal"
              fontWeight="700"
              lineHeight="130%"
              color="#1FA7AF"
            >
              {customersUpToDate.length}
            </Text>
          </Box>
        </Flex>
        <Box height="65%" width="100%" bg="#fff">
          <Flex
            alignItems="center"
            height="33%"
            borderTop="solid 1px #EFF0F6"
            borderBottom="solid 1px #EFF0F6"
          >
            <Text
              width="42%"
              textAlign="center"
              fontFamily="Nunito"
              fontSize="0.9rem"
              fontStyle="normal"
              fontWeight="700"
              lineHeight="130%"
              letterSpacing="0.08px"
              color="#3F3F55"
            >
              Cliente
            </Text>
            <Text
              width="27%"
              textAlign="center"
              fontFamily="Nunito"
              fontSize="0.9rem"
              fontStyle="normal"
              fontWeight="700"
              lineHeight="130%"
              letterSpacing="0.08px"
              color="#3F3F55"
            >
              ID do cliente
            </Text>
            <Text
              width="27%"
              textAlign="center"
              fontFamily="Nunito"
              fontSize="0.9rem"
              fontStyle="normal"
              fontWeight="700"
              lineHeight="130%"
              letterSpacing="0.08px"
              color="#3F3F55"
            >
              CPF
            </Text>
          </Flex>
          {customersUpToDate.map((item, index: number) => {
            if (index <= 2) {
              return (
                <RowItem2
                  key={item.id}
                  name={item.nome}
                  ID={item.id}
                  CPF={item.cpf}
                />
              );
            }
          })}
        </Box>
        <Flex
          justifyContent="center"
          alignItems="center"
          height="15%"
          width="100%"
          bg="#fff"
        >
          <Text
            fontFamily="Nunito"
            fontSize="0.9rem"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="130%"
            textDecoration="underline"
            color="#DA0175"
            cursor="pointer"
            onClick={() => {
              dispatch({
                type: actionTypes.seeAllUpToDateIsActiveKey,
                payload: true,
              });
              router.replace("/pages/dashboard/client")
            }}
          >
            Ver todos
          </Text>
        </Flex>
      </Box>
    </>
  );
}
