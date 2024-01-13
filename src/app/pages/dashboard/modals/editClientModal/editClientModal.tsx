import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";

import EditClientForm from "@/app/components/Forms/editClientForm/editClientForm";

import CloseModalIcon from "@/assets/svg/forClientDashboard/closeModalIcon";
import UserIcon from "@/assets/svg/forClientDashboard/userIcon";

import actionTypes from "@/redux/reducers/action-types";

import "./modal.css";

export default function EditClientModal() {
  const { editClientModalIsOpen }: { editClientModalIsOpen: boolean } =
    useSelector((rootReducer: any) => rootReducer.modalControllerReducer);

  const dispatch = useDispatch();

  function handleCloseModal() {
    dispatch({ type: actionTypes.editClientModalIsOpenKey, payload: false });
  }

  return (
    <>
      <Modal
        isOpen={editClientModalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="example label"
        overlayClassName="modal-overlay"
        className="modal-content"
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
          <UserIcon />
          <Text
            fontFamily="Montserrat"
            fontSize="1.5rem"
            fontStyle="normal"
            fontWeight="600"
            lineHeight="130%"
            color="#3F3F55"
          >
            Editar Cliente
          </Text>
        </Flex>
        <Box overflow="auto" height="100%">
          <EditClientForm />
        </Box>
      </Modal>
    </>
  );
}
