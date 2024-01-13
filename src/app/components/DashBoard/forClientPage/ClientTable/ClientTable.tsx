import { Text, Flex, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import ClientRowItem from "@/app/components/Listing_Map/clientRowItem/clientRowItem";
import { Frame, Vector, X } from "@/assets/svg/not-found";

export default function ClientTable() {
  const {
    clients,
    customersUpToDate,
    defaultingCustomers,
  }: {
    clients: ClientType[];
    customersUpToDate: ClientType[];
    defaultingCustomers: ClientType[];
  } = useSelector((rootReducer: any) => rootReducer.getApiReducer);

  const { clientSearchValue }: { clientSearchValue: string } = useSelector(
    (rootReducer: any) => rootReducer.searchControlReducer
  );

  const {
    seeAllUpToDateIsActive,
    seeAllDefaultingCustomerIsActive,
  }: {
    seeAllUpToDateIsActive: boolean;
    seeAllDefaultingCustomerIsActive: boolean;
  } = useSelector((rootReducer: any) => rootReducer.seeAllReducer);

  function handleFilterItems(item: ClientType) {
    if (item.nome.toLowerCase().includes(clientSearchValue.toLowerCase()))
      return item;
    if (item.cpf.toLowerCase().includes(clientSearchValue.toLowerCase()))
      return item;
    if (item.email.toLowerCase().includes(clientSearchValue.toLowerCase()))
      return item;
    if (item.telefone.toLowerCase().includes(clientSearchValue.toLowerCase()))
      return item;

    return;
  }

  function noClientsToRender () {
    if ( clients.filter((item)=> {
      if (item.nome.toLowerCase().includes(clientSearchValue.toLowerCase())) return item;
    if (item.cpf.toLowerCase().includes(clientSearchValue.toLowerCase())) return item;
    if (item.email.toLowerCase().includes(clientSearchValue.toLowerCase())) return item;
    if (item.telefone.toLowerCase().includes(clientSearchValue.toLowerCase())) return item;

      return 
    }).length === 0) return false
    
    return true
}

  return (
    <>
    {!noClientsToRender() ? (
      <Flex flexDirection="column" height="100%" width="100%" overflowY="auto">
        <Flex
          alignItems="center"
          height="100%"
          borderTop="solid 1px #EFF0F6"
          borderBottom="solid 1px #EFF0F6"
          borderRadius="0.3rem"
          bg="#fff"
          display="flex"
        >
          <Box
            flexDirection="column"
            justifyItems="flex-end"
            position="absolute"
            top="30%"
            right="30%"
          >
            <Frame />
          </Box>
          <Box
            flexDirection="column"
            justifyItems="flex-end"
            position="absolute"
            top="40%"
            right="40%"
          >
            <Vector/>
          </Box>
          <Box
            flexDirection="column"
            justifyItems="flex-end"
            position="absolute"
            top="55%"
            right="35%"
          >
            <X/>
          </Box>
          <Box
            flexDirection="column"
            justifyItems="center"
            position="absolute"
            top="80%"
            right="26%"
          >
            <Text textAlign="center" fontFamily="Montserrat" fontWeight="600" fontStyle="normal" fontSize="28px" color="#F08889" lineHeight="normal">
              Nenhum resultado foi encontrado!
            </Text>
            <Text textAlign="center" fontFamily="Montserrat" fontWeight="600" fontStyle="normal" fontSize="24px" color="#9B9BB2" lineHeight="normal">
            Verifique se escrita está correta
            </Text>
          </Box>
        </Flex>
      </Flex>
    ) : (
    <>
      <Flex
        borderTopRightRadius="2rem"
        borderTopLeftRadius="2rem"
        height="11%"
        width="100%"
        bg="#fff"
      >
        <Text
          width="16.6%"
          textAlign="center"
          fontFamily="Nunito"
          fontSize="0.9rem"
          fontStyle="normal"
          fontWeight="700"
          lineHeight="50px"
          letterSpacing="0.2px"
          color="#3F3F55"
        >
          Client
        </Text>
        <Text
          width="16.6%"
          textAlign="center"
          fontFamily="Nunito"
          fontSize="0.9rem"
          fontWeight="700"
          lineHeight="50px"
          letterSpacing="0.2px"
          fontStyle="normal"
          color="#3F3F55"
        >
          CPF
        </Text>
        <Text
          width="16.6%"
          textAlign="center"
          fontFamily="Nunito"
          fontSize="0.9rem"
          fontWeight="700"
          lineHeight="50px"
          letterSpacing="0.2px"
          fontStyle="normal"
          color="#3F3F55"
        >
          E-mail
        </Text>
        <Text
          width="16.6%"
          textAlign="center"
          fontFamily="Nunito"
          fontSize="0.9rem"
          fontStyle="normal"
          fontWeight="700"
          lineHeight="50px"
          letterSpacing="0.2px"
          color="#3F3F55"
        >
          Telefone
        </Text>
        <Text
          width="16.6%"
          textAlign="center"
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
          textAlign="center"
          fontFamily="Nunito"
          fontSize="0.9rem"
          fontWeight="700"
          lineHeight="50px"
          letterSpacing="0.2px"
          fontStyle="normal"
          color="#3F3F55"
        >
          Criar Cobrança
        </Text>
        <Box className="spacer" width="2%"></Box>
      </Flex>
      <Flex flexDirection="column" height="89%" width="100%" overflowY="auto">
        {seeAllUpToDateIsActive
          ? customersUpToDate
              .filter((item) => {
                return handleFilterItems(item);
              })
              .map((item) => {
                return (
                  <ClientRowItem
                    key={item.id}
                    id={item.id}
                    name={item.nome}
                    CPF={item.cpf}
                    email={item.email}
                    phoneNumber={item.telefone}
                    status={item.status}
                  />
                );
              })
          : seeAllDefaultingCustomerIsActive
          ? defaultingCustomers
              .filter((item) => {
                return handleFilterItems(item);
              })
              .map((item) => {
                return (
                  <ClientRowItem
                    key={item.id}
                    id={item.id}
                    name={item.nome}
                    CPF={item.cpf}
                    email={item.email}
                    phoneNumber={item.telefone}
                    status={item.status}
                  />
                );
              })
          :
          clients
              .filter((item) => {
                return handleFilterItems(item);
              })
              .map((item) => {
                return (
                  <ClientRowItem
                    key={item.id}
                    id={item.id}
                    name={item.nome}
                    CPF={item.cpf}
                    email={item.email}
                    phoneNumber={item.telefone}
                    status={item.status}
                  />
                );
              })}
      </Flex>
      </>
    )}
  </>
);
}
