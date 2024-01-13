import { Text, Flex, Box, Icon } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

import ChargesRowItem from "@/app/components/Listing_Map/chargesRowItem/chargesRowItem";

import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { Frame, Vector, X } from "@/assets/svg/not-found";
import NotFoundPage from "../../NotFoundPage/NotFoundPage";

export default function ChargesTable() {
  const {
    billies,
    overBills,
    pedingBills,
    paidBills,
  }: {
    billies: BillType[];
    overBills: BillType[];
    pedingBills: BillType[];
    paidBills: BillType[];
  } = useSelector((rootReducer: any) => rootReducer.getApiReducer);

  const {
    chargeSearchValue,
  }: {
    chargeSearchValue: string
  } = useSelector((rootReducer: any) => rootReducer.billReducer);

  const {
    seeAlloverBillsIsActive,
    seeAllpaidBillsIsActive,
    seeAllpedingBillsIsActive,
  }: {
    seeAlloverBillsIsActive: boolean;
    seeAllpaidBillsIsActive: boolean;
    seeAllpedingBillsIsActive: boolean;
  } = useSelector((rootReducer: any) => rootReducer.seeAllReducer);

  function handleFilterItems(item: BillType) {
    if (item.nome_cliente.toLowerCase().includes(chargeSearchValue.toLowerCase()))
      return item;
    if (String(item.id).toLowerCase().includes(chargeSearchValue.toLowerCase()))
      return item;

    return;
  }

  function noBillsToRender () {
    if ( billies.filter((item)=> {
      if (item.nome_cliente.toLowerCase().includes(chargeSearchValue.toLowerCase()))
      return item;
    if (String(item.id).toLowerCase().includes(chargeSearchValue.toLowerCase()))
      return item;

    }).length === 0) return false

    return true
  }

  return (
    <>
      {!noBillsToRender() ? (
        <NotFoundPage />
      ) : (
        <>
          <Flex height="11%" width="100%" padding="0 3%">
            <Text
              width="14.6%"
              fontFamily="Nunito"
              fontSize="0.9rem"
              fontStyle="normal"
              fontWeight="700"
              lineHeight="50px"
              letterSpacing="0.2px"
              color="#3F3F55"
            >
              <Icon
                as={HiMiniArrowsUpDown}
                boxSize={4}
                color="#3F3F55"
                marginRight="5%"
              />
              Cliente
            </Text>
            <Text
              width="11.3%"
              fontFamily="Nunito"
              fontSize="0.9rem"
              fontWeight="700"
              lineHeight="50px"
              letterSpacing="0.2px"
              fontStyle="normal"
              color="#3F3F55"
            >
              <Icon
                as={HiMiniArrowsUpDown}
                boxSize={4}
                color="#3F3F55"
                marginRight="5%"
              />
              iD Cob.
            </Text>
            <Text
              width="13%"
              fontFamily="Nunito"
              fontSize="0.9rem"
              fontWeight="700"
              lineHeight="50px"
              letterSpacing="0.2px"
              fontStyle="normal"
              color="#3F3F55"
            >
              Valor
            </Text>
            <Text
              width="17.4%"
              fontFamily="Nunito"
              fontSize="0.9rem"
              fontStyle="normal"
              fontWeight="700"
              lineHeight="50px"
              letterSpacing="0.2px"
              color="#3F3F55"
            >
              Data de venc.
            </Text>
            <Text
              width="9.6%"
              fontFamily="Nunito"
              fontSize="0.9rem"
              fontWeight="700"
              lineHeight="50px"
              letterSpacing="0.2px"
              fontStyle="normal"
              color="#3F3F55"
            >
              Status
            </Text>
            <Text
              width="16.6%"
              fontFamily="Nunito"
              fontSize="0.9rem"
              fontWeight="700"
              lineHeight="50px"
              letterSpacing="0.2px"
              fontStyle="normal"
              color="#3F3F55"
            >
              Descrição
            </Text>
            <Box width="2%"></Box>
          </Flex>
          <Flex
            flexDirection="column"
            height="89%"
            width="100%"
            overflowY="auto"
          >
            {seeAlloverBillsIsActive
              ? overBills.filter((item)=> handleFilterItems(item)).map((item: BillType) => (
                  <ChargesRowItem
                    key={item.id}
                    id={item.id}
                    name={item.nome_cliente}
                    idCharge={item.id}
                    valor={item.valor}
                    dataDeVencimento={item.vencimento}
                    status={item.status}
                    descricao={item.descricao}
                  />
                ))
              : seeAllpaidBillsIsActive
              ? paidBills.filter((item)=> handleFilterItems(item)).map((item: BillType) => (
                  <ChargesRowItem
                    key={item.id}
                    id={item.id}
                    name={item.nome_cliente}
                    idCharge={item.id}
                    valor={item.valor}
                    dataDeVencimento={item.vencimento}
                    status={item.status}
                    descricao={item.descricao}
                  />
                ))
              : seeAllpedingBillsIsActive
              ? pedingBills.filter((item)=> handleFilterItems(item)).map((item: BillType) => (
                  <ChargesRowItem
                    key={item.id}
                    id={item.id}
                    name={item.nome_cliente}
                    idCharge={item.id}
                    valor={item.valor}
                    dataDeVencimento={item.vencimento}
                    status={item.status}
                    descricao={item.descricao}
                  />
                ))
              : billies.filter((item)=> handleFilterItems(item)).map((item: BillType) => (
                  <ChargesRowItem
                    key={item.id}
                    id={item.id}
                    name={item.nome_cliente}
                    idCharge={item.id}
                    valor={item.valor}
                    dataDeVencimento={item.vencimento}
                    status={item.status}
                    descricao={item.descricao}
                  />
                ))}
          </Flex>
        </>
      )}
    </>
  );
}
