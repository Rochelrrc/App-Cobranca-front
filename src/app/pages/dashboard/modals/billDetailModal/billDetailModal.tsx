"use client";

import { Box, Flex, Text, Spinner } from "@chakra-ui/react";
import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";

import CloseModalIcon from "@/assets/svg/forClientDashboard/closeModalIcon";
import FileIconOnBillieModal from "@/assets/svg/forClientDashboard/fileIconOnBillieModal";

import actionTypes from "@/redux/reducers/action-types";

import "./modal.css";
import { formatterCoin, formatterDate } from "@/utils/formatters";

export default function BillDetailModal() {
  const { billDetailsModalIsOpen }: { billDetailsModalIsOpen: boolean } =
    useSelector((rootReducer: any) => rootReducer.modalControllerReducer);

  const {
    oneBill,
    oneBillLoading,
  }: { oneBill: BillType; oneBillLoading: boolean } = useSelector(
    (rootReducer: any) => rootReducer.getApiReducer
  );

  const dispatch = useDispatch();

  function handleCloseModal() {
    dispatch({ type: actionTypes.billDetailsModalIsOpenKey, payload: false });
  }

  return (
    <>
      <Modal
        isOpen={billDetailsModalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="example label"
        overlayClassName="modal-overlay"
        className="modal-content-billDetail"
        ariaHideApp={false}
      >
        {oneBillLoading && (
          <Flex justifyContent="center" alignItems="center" w="100%" h="100%">
            <Spinner size="xl" emptyColor="gray.200" color="pink.500" />
          </Flex>
        )}
        {!oneBillLoading && (
          <Flex flexDirection="column" h="100%" w="100%">
            <Box
              position="absolute"
              right="6%"
              top="8%"
              onClick={() => handleCloseModal()}
            >
              <CloseModalIcon />
            </Box>
            <Flex gap="2%" h="fit-content" w="100%">
              <FileIconOnBillieModal />
              <Text
                fontFamily="Montserrat"
                fontSize="1.5rem"
                fontStyle="normal"
                fontWeight="600"
                lineHeight="130%"
                whiteSpace="nowrap"
              >
                Detalhe da Cobrança
              </Text>
            </Flex>
            <Flex
              flexDirection="column"
              justifyContent="space-between"
              gap="2%"
              h="100%"
              w="100%"
              p="5% 0"
            >
              <Flex
                flexDirection="column"
                justifyContent="space-between"
                h="18%"
              >
                <Text>Nome</Text>
                <Text>{oneBill.nome_cliente}</Text>
              </Flex>
              <Flex
                flexDirection="column"
                justifyContent="space-between"
                minH="18%"
                maxH="25%"
              >
                <Text>Descrição</Text>
                <Text>{oneBill.descricao}</Text>
              </Flex>
              <Flex h="18%">
                <Flex
                  flexDirection="column"
                  justifyContent="space-between"
                  w="50%"
                >
                  <Text>Vencimento</Text>
                  <Text>{formatterDate(oneBill.vencimento)}</Text>
                </Flex>
                <Flex
                  flexDirection="column"
                  justifyContent="space-between"
                  w="50%"
                >
                  <Text>Valor</Text>
                  <Text>{formatterCoin(oneBill.valor)}</Text>
                </Flex>
              </Flex>
              <Flex h="18%">
                <Flex
                  flexDirection="column"
                  justifyContent="space-between"
                  w="50%"
                >
                  <Text>ID Cobranças</Text>
                  <Text>{oneBill.id}</Text>
                </Flex>
                <Flex
                  flexDirection="column"
                  justifyContent="space-between"
                  w="50%"
                >
                  <Text>Status</Text>
                  <Text>{oneBill.status}</Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        )}
      </Modal>
    </>
  );
}
