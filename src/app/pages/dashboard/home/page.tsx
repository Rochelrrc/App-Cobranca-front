"use client";

import { Flex, Text, Spinner, Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import api from "@/api/api";

import { getLocalStorage } from "@/utils/localStorage";

import PaidBox from "@/app/components/DashBoard/forHomePage/resumosTop/paidBox/paidBox";
import WaitingBox from "@/app/components/DashBoard/forHomePage/resumosTop/waitingBox/waitingBox";
import OverdueBox from "@/app/components/DashBoard/forHomePage/resumosTop/overdueBox/overdueBox";
import DefaultingCustomer from "@/app/components/DashBoard/forHomePage/resumeBottom/defaultingCustomer/defaultingCustomer";
import CustomersUpToDate from "@/app/components/DashBoard/forHomePage/resumeBottom/customersUpToDate/customersUpToDate";
import Perfil from "@/app/components/DashBoard/forHomePage/profile/perfil";

import actionTypes from "@/redux/reducers/action-types";
import Sidebar from "@/app/components/DashBoard/sidebar/sidebar";

export default function Home() {
  const [isLoadingBills, setIsloadingBills] = useState(true);
  const [isLoadingClients, setIsloadingClients] = useState(true);

  const dispatch = useDispatch();

  async function getPaidBills() {
    try {
      const response = await api.get("/listarStatusCobrancas/paga/999999", {
        headers: {
          authorization: getLocalStorage("token"),
        },
      });
      dispatch({
        type: actionTypes.paidBillKey,
        payload: response.data.cobrancas,
      });
      setIsloadingBills(false);
      return;
    } catch (err) {
      console.warn(err);
    }
  }

  async function getWaitingBills() {
    try {
      const response = await api.get("/listarStatusCobrancas/pendente/999999", {
        headers: {
          authorization: getLocalStorage("token"),
        },
      });
      dispatch({
        type: actionTypes.pedingBillKey,
        payload: response.data.cobrancas,
      });
      setIsloadingBills(false);
      return;
    } catch (err) {
      console.warn(err);
    }
  }

  async function getOverBills() {
    try {
      const response = await api.get("/listarStatusCobrancas/vencida/999999", {
        headers: {
          authorization: getLocalStorage("token"),
        },
      });
      dispatch({
        type: actionTypes.overBillKey,
        payload: response.data.cobrancas,
      });
      setIsloadingBills(false);
      return;
    } catch (err) {
      console.warn(err);
    }
  }

  async function getCustomersUpToDate() {
    try {
      const response = await api.get("/listarStatusClientes/em-dia/999999", {
        headers: {
          authorization: getLocalStorage("token"),
        },
      });

      console.log(response.data);
      dispatch({
        type: actionTypes.customersUpToDateKey,
        payload: response.data.clientes,
      });
      setIsloadingClients(false);
      return;
    } catch (err) {
      console.warn(err);
    }
  }

  async function getDefaultingCustomers() {
    try {
      const response = await api.get(
        "/listarStatusClientes/Inadimplente/999999",
        {
          headers: {
            authorization: getLocalStorage("token"),
          },
        }
      );
      dispatch({
        type: actionTypes.defaultingCustomersKey,
        payload: response.data.clientes,
      });
      setIsloadingClients(false);
      return;
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    getPaidBills();
    getWaitingBills();
    getOverBills();
    getCustomersUpToDate();
    getDefaultingCustomers();
    dispatch({
      type: actionTypes.iconsStyleStateKey,
      payload: {
        home: true,
        user: false,
        file: false,
      },
    });
    dispatch({ type: actionTypes.isOpenClientDataKey, payload: false });
    dispatch({ type: actionTypes.seeAllUpToDateIsActiveKey, payload: false });
    dispatch({ type: actionTypes.seeAllDefaultingCustomerIsActiveKey, payload: false });
    dispatch({ type: actionTypes.seeAlloverBillsIsActiveKey, payload: false });
    dispatch({ type: actionTypes.seeAllpaidBillsIsActiveKey, payload: false });
    dispatch({ type: actionTypes.seeAllpedingBillsIsActiveKey, payload: false });
    dispatch({ type: actionTypes.clientSearchValueKey, payload: "" });
  }, []);

  function handleVerifyLoadPage() {
    if (isLoadingBills) return false;
    if (isLoadingClients) return false;
    return true;
  }

  return (
    <>
      {!handleVerifyLoadPage() && (
        <Flex justifyContent="center" alignItems="center" w="100vw" h="100vh">
          <Spinner size="xl" emptyColor="gray.200" color="pink.500" />
        </Flex>
      )}
      {handleVerifyLoadPage() && (
        <Box
          height="100vh"
          width="100vw"
          position="relative"
          bg="#F8F8F9"
          overflow="hidden"
        >
          <Sidebar />
          <Flex
            height="100vh"
            width="100%"
            flexDirection="column"
            padding="2vh 2vw 2vh 9vw"
          >
            <Flex
              width="107%"
              justifyContent="space-between"
              alignItems="center"
              borderBottom="solid 1px #ACD9C5"
              height="10%"
            >
              <Text
                paddingLeft="2vw"
                textAlign="center"
                fontFamily="Montserrat"
                fontSize="1.4rem"
                fontStyle="normal"
                fontWeight="600"
                lineHeight="130%"
                color="#343447"
              >
                Resumo das Cobranças
              </Text>
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
              justifyContent="space-around"
              height="60%"
              width="100%"
              gap="0 1vw"
              padding="2vh 2vw"
            >
              <PaidBox />
              <WaitingBox />
              <OverdueBox />
            </Flex>
            <Flex
              justifyContent="space-between"
              height="40%"
              width="100%"
              padding="2vh 3.5vw"
            >
              <DefaultingCustomer />
              <CustomersUpToDate />
            </Flex>
          </Flex>
        </Box>
      )}
    </>
  );
}
