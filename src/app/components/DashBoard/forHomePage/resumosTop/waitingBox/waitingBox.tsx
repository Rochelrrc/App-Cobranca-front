import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { formatterCoin } from "@/utils/formatters";

import RowItem from "@/app/components/DashBoard/forHomePage/resumosTop/rowItem/rowItem";

import WaitingDocumentIcon from "@/assets/svg/forHomeDashboard/waitingDocumentIcon";
import { useRouter } from "next/navigation";
import actionTypes from "@/redux/reducers/action-types";

export default function WaitingBox() {
  const { pedingBills }: { pedingBills: BillType[] } = useSelector(
    (rootReducer: any) => rootReducer.getApiReducer
  );

  const dispatch = useDispatch();
    const router = useRouter();

  function SumAllBillsValue(bills: BillType[]) {
    if (!bills) return 0;
    if (bills.length === 0) return 0;

    const sum = bills.reduce((acc, cur: any) => Number(acc) + cur.valor, [0]);

    return Number(sum);
  }

  function howManyBills(bills: BillType[]) {
    if (!bills) return 0;

    return bills.length;
  }

  return (
    <>
      <Flex
        flexDirection="column"
        gap="1vh 0"
        borderTopRightRadius="2rem"
        borderTopLeftRadius="2rem"
        height="100%"
        width="29%"
        bg="#fff"
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          borderRadius="1rem"
          height="21%"
          width="100%"
          mb="5%"
          padding="0 18%"
          bg="#FCF6DC"
        >
          <WaitingDocumentIcon />
          <Flex flexDirection="column">
            <Text
              fontFamily="Montserrat"
              fontSize="0.9rem"
              fontStyle="normal"
              fontWeight="700"
              lineHeight="130%"
              color="#3F3F55"
            >
              Cobranças Prevista
            </Text>
            <Text
              fontFamily="Montserrat"
              fontSize="1.3rem"
              fontStyle="normal"
              fontWeight="700"
              lineHeight="130%"
              color="#343447"
            >
              {formatterCoin(SumAllBillsValue(pedingBills))}
            </Text>
          </Flex>
        </Flex>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          borderRadius="2rem"
          height="14%"
          width="100%"
          padding="0 17%"
        >
          <Text
            fontFamily="Montserrat"
            fontSize="0.9rem"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="130%"
            color="#3F3F55"
          >
            Cobranças Previstas
          </Text>
          <Box bg="#FCF6DC" borderRadius="0.5rem" padding="1% 8%">
            <Text
              fontFamily="Montserrat"
              fontSize="0.8rem"
              fontStyle="normal"
              fontWeight="700"
              lineHeight="130%"
              color="#C5A605"
            >
              {howManyBills(pedingBills)}
            </Text>
          </Box>
        </Flex>
        <Box height="52%" width="100%" bg="#fff">
          <Flex
            alignItems="center"
            height="24%"
            borderTop="solid 1px #EFF0F6"
            borderBottom="solid 1px #EFF0F6"
          >
            <Text
              width="33%"
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
              width="33%"
              textAlign="center"
              fontFamily="Nunito"
              fontSize="0.9rem"
              fontStyle="normal"
              fontWeight="700"
              lineHeight="130%"
              letterSpacing="0.08px"
              color="#3F3F55"
            >
              ID da cob.
            </Text>
            <Text
              width="33%"
              textAlign="center"
              fontFamily="Nunito"
              fontSize="0.9rem"
              fontStyle="normal"
              fontWeight="700"
              lineHeight="130%"
              letterSpacing="0.08px"
              color="#3F3F55"
            >
              Valor
            </Text>
          </Flex>
          {pedingBills.map((item, index: number) => {
            if (index <= 3) {
              return (
                <RowItem
                  key={item.id}
                  name={item.nome_cliente}
                  ID={item.id}
                  value={item.valor}
                />
              );
            }
          })}
        </Box>
        <Flex
          justifyContent="center"
          alignItems="center"
          height="8%"
          width="100%"
          bg="#fff"
        >
          <Text
            marginBottom="2%"
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
                type: actionTypes.seeAllpedingBillsIsActiveKey,
                payload: true,
              });
              router.replace("/pages/dashboard/charges")
            }}
          >
            Ver todos
          </Text>
        </Flex>
      </Flex>
    </>
  );
}
