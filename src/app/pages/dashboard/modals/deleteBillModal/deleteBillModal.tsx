"use client";

import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";

import api from "@/api/api";

import CloseModalIcon from "@/assets/svg/forClientDashboard/closeModalIcon";
import WarnIcon from "@/assets/svg/forBillDashboard/warnIcon";

import actionTypes from "@/redux/reducers/action-types";

import "./modal.css";
import { getLocalStorage } from "@/utils/localStorage";

export default function DeleteBillModal() {
  const { deleteBillModalIsOpen }: { deleteBillModalIsOpen: boolean } =
    useSelector((rootReducer: any) => rootReducer.modalControllerReducer);

  const { updateBill }: { updateBill: boolean } = useSelector(
    (rootReducer: any) => rootReducer.getApiReducer
  );

  const { billId }: { billId: number } = useSelector(
    (rootReducer: any) => rootReducer.billReducer
  );

  const dispatch = useDispatch();
  const toast = useToast();

  function handleCloseModal() {
    dispatch({ type: actionTypes.deleteBillModalIsOpenKey, payload: false });
  }

  async function handleConfirmDelete() {
    if (!billId) return;
    try {
      await api.delete(`/cobranca/deletar/${billId}`, {
        headers: {
          authorization: getLocalStorage("token"),
        },
      });

      dispatch({ type: actionTypes.updateBillKey, payload: !updateBill });
      dispatch({ type: actionTypes.deleteBillModalIsOpenKey, payload: false });

      return toast({
        title: "Sucesso!",
        description: `Cobrança deletada com sucesso!!!`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    } catch (err: any) {
      console.warn(err);

      return toast({
        title: "Falha ao deletar cobraça.",
        description: err.response.data.message || err.response.data || "",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  }

  return (
    <>
      <Modal
        isOpen={deleteBillModalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="example label"
        overlayClassName="modal-overlay"
        className="modal-content-deleteBill"
        ariaHideApp={false}
      >
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          h="100%"
        >
          <Box
            position="absolute"
            right="6%"
            top="8%"
            onClick={() => handleCloseModal()}
          >
            <CloseModalIcon />
          </Box>
          <WarnIcon />
          <Text
            textAlign="center"
            fontFamily="Montserrat"
            fontSize="1rem"
            fontStyle="normal"
            fontWeight="600"
            lineHeight="130%"
            whiteSpace="nowrap"
            color="#CC7800"
          >
            Tem certeza que deseja excluir esta cobrança?
          </Text>
          <Flex justifyContent="center" gap="4%" w="100%" m="4% 0">
            <Button
              borderRadius="0.25rem"
              h="110%"
              w="21%"
              textAlign="center"
              fontFamily="Nunito"
              fontSize="1rem"
              fontStyle="normal"
              fontWeight="400"
              lineHeight="130%"
              whiteSpace="nowrap"
              color="#AE1100"
              bg="#F2D6D0"
              onClick={() =>
                dispatch({
                  type: actionTypes.deleteBillModalIsOpenKey,
                  payload: false,
                })
              }
            >
              Não
            </Button>
            <Button
              borderRadius="0.25rem"
              h="110%"
              w="21%"
              textAlign="center"
              fontFamily="Nunito"
              fontSize="1rem"
              fontStyle="normal"
              fontWeight="400"
              lineHeight="130%"
              whiteSpace="nowrap"
              color="#034A2A"
              bg="#ACD9C5"
              onClick={handleConfirmDelete}
            >
              Sim
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
}
