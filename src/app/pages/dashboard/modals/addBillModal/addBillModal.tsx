"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";

import AddBillieForm from "@/app/components/Forms/AddBillieForm/addBillieForm";

import CloseModalIcon from "@/assets/svg/forClientDashboard/closeModalIcon";
import FileIconOnBillieModal from "@/assets/svg/forClientDashboard/fileIconOnBillieModal";

import actionTypes from "@/redux/reducers/action-types";

import "./modal.css";

export default function AddBillieModal() {
  const { addBillieModalIsOpen }: { addBillieModalIsOpen: boolean } =
    useSelector((rootReducer: any) => rootReducer.modalControllerReducer);

  const dispatch = useDispatch();

  function handleCloseModal() {
    dispatch({ type: actionTypes.addBillieModalIsOpenKey, payload: false });
  }

  return (
    <>
      <Modal
        isOpen={addBillieModalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="example label"
        overlayClassName="modal-overlay"
        className="modal-content-addBill"
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
            Cadastro de Cobrança
          </Text>
        </Flex>
        <Box overflow="auto" height="100%">
          <AddBillieForm />
        </Box>
      </Modal>
    </>
  );
}
