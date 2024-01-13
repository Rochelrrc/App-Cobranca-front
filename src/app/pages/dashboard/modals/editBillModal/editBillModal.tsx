"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";

import CloseModalIcon from "@/assets/svg/forClientDashboard/closeModalIcon";
import FileIconOnBillieModal from "@/assets/svg/forClientDashboard/fileIconOnBillieModal";

import EditBillieForm from "@/app/components/Forms/EditBillieForm/editBillieForm";

import actionTypes from "@/redux/reducers/action-types";

import "./editbill.css";

export default function EditBillieModal() {
  const { editBillieModalIsOpen }: { editBillieModalIsOpen: boolean } =
    useSelector((rootReducer: any) => rootReducer.modalControllerReducer);

  const dispatch = useDispatch();

  function handleCloseModal() {
    dispatch({ type: actionTypes.editBillieModalIsOpenKey, payload: false });
  }

  return (
    <>
      <Modal
        isOpen={editBillieModalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="example label"
        overlayClassName="modal-overlay"
        className="modal-content-editBill"
        ariaHideApp={false}
      >
        <Flex gap="0 2%" mb="3%">
          <Box
            position="absolute"
            right="6%"
            top="5%"
            onClick={() => handleCloseModal()}
          >
            <CloseModalIcon />
          </Box>
          <FileIconOnBillieModal />
          <Text
            fontFamily="Montserrat"
            fontSize="1.5rem"
            fontStyle="normal"
            fontWeight="600"
            lineHeight="130%"
            color="#3F3F55"
          >
            Edição de Cobrança
          </Text>
        </Flex>
        <Box overflow="auto" height="100%">
          <EditBillieForm />
        </Box>
      </Modal>
    </>
  );
}
