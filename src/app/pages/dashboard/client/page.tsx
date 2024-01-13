"use client";

import { Box, Button, Flex, Input, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import api from "@/api/api";

import { getLocalStorage } from "@/utils/localStorage";

import Perfil from "@/app/components/DashBoard/forHomePage/profile/perfil";
import ClientDetails from "@/app/components/DashBoard/forClientPage/ClientDetails/clientDetails";
import ClientTable from "@/app/components/DashBoard/forClientPage/ClientTable/ClientTable";
import NewClientModal from "@/app/pages/dashboard/modals/newClientModal/newClientModal";
import EditClientModal from "@/app/pages/dashboard/modals/editClientModal/editClientModal";
import AddBillieModal from "@/app/pages/dashboard/modals/addBillModal/addBillModal";
import EditBillieModal from "../modals/editBillModal/editBillModal";

import UserIcon from "@/assets/svg/forClientDashboard/userIcon";
import FilterSearchIcon from "@/assets/svg/forClientDashboard/filterSearchIcon";

import actionTypes from "@/redux/reducers/action-types";
import Sidebar from "@/app/components/DashBoard/sidebar/sidebar";
import DeleteBillModal from "../modals/deleteBillModal/deleteBillModal";
import NotFoundPage from "@/app/components/DashBoard/NotFoundPage/NotFoundPage";
import SearchBarIcon from "@/assets/svg/forClientDashboard/searchBarIcon";

export default function Client() {
  const [isLoadingClients, setIsLoadingClients] = useState(true);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const {
    clientId,
    isOpenClientData,
    updateClientList,
    updateOneClient,
    clientList
  }: {
    clientId: number;
    isOpenClientData: boolean;
    updateClientList: boolean;
    updateOneClient: boolean;
    clientList: ClientType[];
  } = useSelector((rootReducer: any) => rootReducer.clientReducer);

  const {
    oneClient,
    oneClientLoading,
    updateBill,
    clients
  }: { oneClient: ClientType; oneClientLoading: boolean; updateBill: boolean; clients: ClientType[] } =
    useSelector((rootReducer: any) => rootReducer.getApiReducer);

  function handleCloseClientData() {
    dispatch({ type: actionTypes.isOpenClientDataKey, payload: false });
  }

  async function getClients() {
    try {
      const response = await api.get("/clientes", {
        headers: {
          authorization: getLocalStorage("token"),
        },
      });
      dispatch({
        type: actionTypes.clientsKey,
        payload: response.data.clientes,
      });
      setIsLoadingClients(false);

      return;
    } catch (err) {
      console.warn(err);
    }
  }

  async function getOneClient() {
    if (!clientId) return;
    dispatch({
      type: actionTypes.oneClientLoadingKey,
      payload: true,
    });
    try {
      const response = await api.get(`/cliente/${clientId}`, {
        headers: {
          authorization: getLocalStorage("token"),
        },
      });
      dispatch({
        type: actionTypes.oneClientKey,
        payload: response.data,
      });
      dispatch({
        type: actionTypes.oneClientLoadingKey,
        payload: false,
      });
      return;
    } catch (err) {
      console.warn(err);
    }
  }

  async function getBills() {
    try {
      const response = await api.get("/cobrancas", {
        headers: {
          authorization: getLocalStorage("token"),
        },
      });
      dispatch({
        type: actionTypes.billiesKey,
        payload: response.data.cobrancas,
      });
      return;
    } catch (err) {
      console.warn(err);
    }
  }

  function handleSearch(e: any) {
    if (e.code !== "Enter") return;

    dispatch({
      type: actionTypes.clientSearchValueKey,
      payload: e.target.value,
    });
  }

  useEffect(() => {
    dispatch({
      type: actionTypes.iconsStyleStateKey,
      payload: {
        home: false,
        user: true,
        file: false,
      },
    });
    dispatch({ type: actionTypes.seeAlloverBillsIsActiveKey, payload: false });
    dispatch({ type: actionTypes.seeAllpaidBillsIsActiveKey, payload: false });
    dispatch({ type: actionTypes.seeAllpedingBillsIsActiveKey, payload: false });
    dispatch({ type: actionTypes.clientSearchValueKey, payload: "" });
  }, []);

  useEffect(() => {
    getClients();
  }, [updateClientList]);

  useEffect(() => {
    getOneClient();
  }, [clientId, updateOneClient]);

  useEffect(() => {
    getBills();
  }, [updateBill]);

  function handleNotFoundIsActive(item: ClientType) {
    if (item.nome.toLowerCase().includes(search.toLowerCase()))
    return item;
  if (item.cpf.toLowerCase().includes(search.toLowerCase()))
  return item;
if (item.email.toLowerCase().includes(search.toLowerCase()))
return item;
if (item.telefone.toLowerCase().includes(search.toLowerCase()))
return item;

return;
}
console.log(clients.filter((item) => handleNotFoundIsActive(item)))

  return (
    <>
      {isLoadingClients && (
        <Flex justifyContent="center" alignItems="center" w="100vw" h="100vh">
          <Spinner size="xl" emptyColor="gray.200" color="pink.500" />
        </Flex>
      )}
      
      {!isLoadingClients && (
        <>
        <Box
          height="100vh"
          width="100vw"
          position="relative"
          bg="#F8F8F9"
          overflow="hidden"
        >
          <Sidebar />
          <Flex
            alignItems="center"
            flexDirection="column"
            position="relative"
            height="100vh"
            width="100%"
            padding="2vh 2vw 2vh 9vw"
          >
            <NewClientModal />
            <EditClientModal />
            <AddBillieModal />
            <EditBillieModal />
            <DeleteBillModal />
            <Flex
              justifyContent="space-between"
              alignItems="end"
              borderBottom="solid 1px #ACD9C5"
              height="9%"
              width="100%"
            >
              {isOpenClientData ? (
                <Flex>
                  <Text
                    paddingLeft="2vw"
                    textAlign="center"
                    fontFamily="Montserrat"
                    fontSize="0.9rem"
                    fontStyle="normal"
                    fontWeight="600"
                    lineHeight="130%"
                    color="#0E8750"
                    cursor="pointer"
                    onClick={() => handleCloseClientData()}
                  >
                    Clientes
                  </Text>
                  <Text
                    paddingLeft="1.8vw"
                    textAlign="center"
                    fontFamily="Montserrat"
                    fontSize="0.9rem"
                    fontStyle="normal"
                    fontWeight="600"
                    lineHeight="130%"
                    color="#747488"
                  >
                    {">"}
                  </Text>
                  <Text
                    paddingLeft="1.8vw"
                    textAlign="center"
                    fontFamily="Montserrat"
                    fontSize="0.9rem"
                    fontStyle="normal"
                    fontWeight="600"
                    lineHeight="130%"
                    color="#747488"
                  >
                    Detalhes do cliente
                  </Text>
                </Flex>
              ) : (
                <Text
                  paddingLeft="2vw"
                  textAlign="center"
                  fontFamily="Montserrat"
                  fontSize="0.9rem"
                  fontStyle="normal"
                  fontWeight="600"
                  lineHeight="130%"
                  color="#0E8750"
                >
                  Clientes
                </Text>
              )}
              <Flex
                className="perfil"
                alignItems="center"
                height="100%"
                mr="10%"
              >
                <Perfil />
              </Flex>
            </Flex>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              borderRadius="16px"
              height="10%"
              width="95%"
              gap="0 1vw"
              margin="2vh 0"
              padding="2vh 2vw"
              bg="#fff"
            >
              <Flex alignItems="center" gap="1rem">
                <UserIcon />
                {isOpenClientData ? (
                  !oneClientLoading && (
                    <Text
                      fontFamily="Montserrat"
                      fontSize="1.5rem"
                      fontStyle="normal"
                      fontWeight="600"
                      lineHeight="130%"
                      whiteSpace="nowrap"
                      color="#3F3F55"
                    >
                      {oneClient.nome}
                    </Text>
                  )
                ) : (
                  <Text
                    fontFamily="Montserrat"
                    fontSize="1.5rem"
                    fontStyle="normal"
                    fontWeight="600"
                    lineHeight="130%"
                    color="#3F3F55"
                  >
                    Clientes
                  </Text>
                )}
              </Flex>
              {!isOpenClientData && (
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  position="relative"
                  width="50%"
                >
                  <Button
                    borderRadius="10px"
                    width="40%"
                    color="#fff"
                    bg="#DA0175"
                    _hover={{ bg: "rgb(179, 9, 99)" }}
                    _active={{ bg: "rgb(141, 7, 79)" }}
                    onClick={() =>
                      dispatch({
                        type: actionTypes.newClientModalIsOpenKey,
                        payload: true,
                      })
                    }
                  >
                    + Adicionar Cliente
                  </Button>
                  <FilterSearchIcon />
                  <Input
                    placeholder="Pesquisa"
                    borderRadius="0.6rem"
                    boxShadow="0.2rem 0.3rem rgba(218, 1, 117, 0.1)"
                    width="50%"
                    color="#3F3F55"
                    onKeyDown={(e) => handleSearch(e)}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <SearchBarIcon search={search} />
                </Flex>
              )}
            </Flex>
            <Flex
              flexDirection="column"
              borderRadius="16px"
              height="71vh"
              width="95%"
              margin="2vh 0"
              padding="2vh 2vw"
            >
              {isOpenClientData ? <ClientDetails /> : <ClientTable />}
            </Flex>
          </Flex>
        </Box>
        </>
      )}
    </>
  );
}
