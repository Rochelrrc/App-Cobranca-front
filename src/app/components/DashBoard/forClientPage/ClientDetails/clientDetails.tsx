import { Box, Button, Flex, Spacer, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import BillieRowItem from "@/app/components/Listing_Map/billieRowItem/billieRowItem";

import EditClientIcon from "@/assets/svg/forSpecificClient/editClientIcon";

import actionTypes from "@/redux/reducers/action-types";

export default function ClientDetails() {
  const dispatch = useDispatch();

  const { billies }: { billies: BillType[] } = useSelector(
    (rootReducer: any) => rootReducer.getApiReducer
  );

  const {
    oneClient,
    oneClientLoading,
  }: { oneClient: ClientType; oneClientLoading: boolean } = useSelector(
    (rootReducer: any) => rootReducer.getApiReducer
  );

  function handleAddBillButton() {
    dispatch({
      type: actionTypes.addBillieModalIsOpenKey,
      payload: true,
    });
    return;
  }

  return (
    <>
      {oneClientLoading && (
        <Flex justifyContent="center" alignItems="center" w="100%" h="100%">
          <Spinner size="xl" emptyColor="gray.200" color="pink.500" />
        </Flex>
      )}
      {!oneClientLoading && (
        <>
          <Flex
            flexDirection="column"
            gap="7% 0"
            w="100%"
            h="47%"
            mb="3%"
            p="1% 1%"
            bg="#fff"
          >
            <Flex justifyContent="space-between" alignItems="center" h="20%">
              <Text
                fontFamily="Montserrat"
                fontSize="1rem"
                fontStyle="normal"
                fontWeight="700"
                lineHeight="130%"
              >
                Dados Do Cliente
              </Text>
              <Button
                border="solid 1px #DEDEE9"
                h="100%"
                w="20%"
                color="#0E8750"
                bg="#F8F8F9"
                onClick={() =>
                  dispatch({
                    type: actionTypes.editClientModalIsOpenKey,
                    payload: true,
                  })
                }
              >
                <EditClientIcon />
                Editar Cliente
              </Button>
            </Flex>
            <Flex justifyContent="space-between" width="60%">
              <Box>
                <Text>E-mail</Text>
                <Text>{oneClient.email}</Text>
              </Box>
              <Box>
                <Text>Telefone</Text>
                <Text>{oneClient.telefone}</Text>
              </Box>
              <Box>
                <Text>CPF</Text>
                <Text>{oneClient.cpf}</Text>
              </Box>
            </Flex>
            <Spacer />
            <Flex justifyContent="space-between" width="100%">
              <Box>
                <Text>Endereço</Text>
                <Text>{oneClient.logradouro}</Text>
              </Box>
              <Box>
                <Text>Bairro</Text>
                <Text>{oneClient.bairro}</Text>
              </Box>
              <Box>
                <Text>Complemento</Text>
                <Text>{oneClient.complemento}</Text>
              </Box>
              <Box>
                <Text>CEP</Text>
                <Text>{oneClient.cep}</Text>
              </Box>
              <Box>
                <Text>Cidade</Text>
                <Text>{oneClient.cidade}</Text>
              </Box>
              <Box>
                <Text>UF</Text>
                <Text>{oneClient.uf}</Text>
              </Box>
            </Flex>
          </Flex>
          <Box h="50%" w="100%" p="1% 1%" bg="#fff">
            <Flex h="15%" justifyContent="space-between" alignItems="center">
              <Text
                color="#3F3F55"
                fontFamily="Montserrat"
                fontSize="1rem"
                fontStyle="normal"
                fontWeight="700"
                lineHeight="130%"
              >
                Cobranças do Cliente
              </Text>
              <Button
                h="100%"
                w="25%"
                mr="6%"
                color="#F8F8F9"
                bg="#DA0175"
                _hover={{ bg: "rgb(167, 8, 93)" }}
                _active={{ bg: "rgb(141, 7, 79)" }}
                onClick={() => handleAddBillButton()}
              >
                + Nova Cobrança
              </Button>
            </Flex>
            <Flex
              alignItems="center"
              borderBottom="solid 1px #EFF0F6"
              mt="1%"
              h="20%"
            >
              <Text width="17%">ID Cob.</Text>
              <Text width="18%">Data de venc.</Text>
              <Text width="11.5%">Valor</Text>
              <Text width="11%">Status</Text>
              <Text width="30%">Descrição</Text>
            </Flex>
            <Box h="60%" w="100%" overflow="auto">
              {billies
                .filter((item) => item.nome_cliente === oneClient.nome)
                .map((item) => {
                  return (
                    <>
                      <BillieRowItem
                        key={item.id}
                        id={item.id}
                        idClient={item.id}
                        dataDeVencimento={item.vencimento}
                        valor={item.valor}
                        status={item.status}
                        descricao={item.descricao}
                      />
                    </>
                  );
                })}
            </Box>
          </Box>
        </>
      )}
    </>
  );
}
