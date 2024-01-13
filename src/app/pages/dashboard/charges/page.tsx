"use client";

import { Flex, Input, Text, Spinner, Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from 'react-hook-form';

import api from "@/api/api";

import { getLocalStorage } from "@/utils/localStorage";

import Perfil from "@/app/components/DashBoard/forHomePage/profile/perfil";
import Sidebar from "@/app/components/DashBoard/sidebar/sidebar";
import EditBillieModal from "../modals/editBillModal/editBillModal";
import DeleteBillModal from "../modals/deleteBillModal/deleteBillModal";
import BillDetailModal from "../modals/billDetailModal/billDetailModal";
import ChargesTable from "@/app/components/DashBoard/forChargesPage/ChargesTable/ChargesTable";

import SearchBarIcon from "@/assets/svg/forClientDashboard/searchBarIcon";
import FilterSearchIcon from "@/assets/svg/forClientDashboard/filterSearchIcon";
import FileIconOnBillieModal from "@/assets/svg/forClientDashboard/fileIconOnBillieModal";

import actionTypes from "@/redux/reducers/action-types";

export default function Charges() {
  const { updateBill }: { updateBill: boolean } = useSelector(
    (rootReducer: any) => rootReducer.getApiReducer
  );

  const { billId }: { billId: number } = useSelector(
    (rootReducer: any) => rootReducer.billReducer
  );
  const [isLoadingCharges, setIsLoadingCharges] = useState(true);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  async function getCharges(billId?: number) {
    try {
      const response = await api.get('/cobrancas', {
        headers: {
          authorization: getLocalStorage("token"),
        },
      });
  
      dispatch({
        type: actionTypes.billiesKey,
        payload: response.data.cobrancas,
      });
      setIsLoadingCharges(false);
    } catch (err) {
      console.warn(err);
    }
  }  

  async function getOneBill() {
    if (!billId) return;
    try {
      dispatch({
        type: actionTypes.oneBillLoadingKey,
        payload: true,
      });
      const response = await api.get(`/cobranca/${billId}`, {
        headers: {
          authorization: getLocalStorage("token"),
        },
      });

      dispatch({
        type: actionTypes.oneBillKey,
        payload: response.data[0],
      });

      dispatch({
        type: actionTypes.oneBillLoadingKey,
        payload: false,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.oneBillLoadingKey,
        payload: false,
      });
      console.warn(err);
    }
  }

  useEffect(() => {
    getCharges();
  }, [updateBill]);

  useEffect(() => {
    getOneBill();
  }, [billId]);

  useEffect(() => {
    dispatch({
      type: actionTypes.iconsStyleStateKey,
      payload: {
        home: false,
        user: false,
        file: true,
      },
    });
    dispatch({ type: actionTypes.isOpenClientDataKey, payload: false });
    dispatch({ type: actionTypes.seeAllUpToDateIsActiveKey, payload: false });
    dispatch({ type: actionTypes.seeAllDefaultingCustomerIsActiveKey, payload: false });
    dispatch({ type: actionTypes.clientSearchValueKey, payload: "" });
    dispatch({ type: actionTypes.chargeSearchValueKey, payload: "" });
  }, []);

  return (
    <>
      {isLoadingCharges && (
        <Flex justifyContent="center" alignItems="center" w="100vw" h="100vh">
          <Spinner size="xl" emptyColor="gray.200" color="pink.500" />
        </Flex>
      )}
      {!isLoadingCharges && (
        <Box
          height="100vh"
          width="100vw"
          position="relative"
          bg="#F8F8F9"
          overflow="hidden"
        >
          <EditBillieModal />
          <DeleteBillModal />
          <BillDetailModal />
          <Sidebar />
          <Flex
            alignItems="center"
            flexDirection="column"
            position="relative"
            height="100vh"
            width="100%"
            padding="2vh 2vw 2vh 9vw"
          >
            <Flex
              justifyContent="space-between"
              alignItems="end"
              borderBottom="solid 1px #ACD9C5"
              height="9%"
              width="100%"
            >
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
                Cobranças
              </Text>

              <Flex alignItems="center" height="100%" mr="10%">
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
                <FileIconOnBillieModal />

                <Text
                  fontFamily="Montserrat"
                  fontSize="1.5rem"
                  fontStyle="normal"
                  fontWeight="600"
                  lineHeight="130%"
                  color="#3F3F55"
                >
                  Cobranças
                </Text>
              </Flex>

              <Flex
                justifyContent="flex-end"
                alignItems="center"
                position="relative"
                width="50%"
              >
                <FilterSearchIcon />
                <Input
                  placeholder="Pesquisa"
                  borderRadius="10px"
                  width="50%"
                  color="#3F3F55"
                  marginLeft="5%"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <SearchBarIcon search={searchQuery} />
              </Flex>
            </Flex>
            <Flex
              flexDirection="column"
              borderRadius="16px"
              height="71vh"
              width="95%"
              margin="2vh 0"
              padding="2vh 2vw"
            >
              <ChargesTable />
            </Flex>
          </Flex>
        </Box>
      )}
    </>
  );
}
