"use client";

import {
  Avatar,
  Box,
  Flex,
  Popover,
  PopoverTrigger,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

import { getLocalStorage } from "@/utils/localStorage";

import { ModalUser } from "@/app/pages/dashboard/modals/ModalEditUser/ModalUser";

function Perfil() {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [name, setName] = useState("");
  const firstFieldRef = useRef(null);

  useEffect(() => {
    setName(getLocalStorage("userName"));
  }, []);

  return (
    <Flex alignItems="center" gap="0 0.9rem" mb="3%">
      <Avatar size="md" name={name} />
      <Text color="#0E8750" whiteSpace="nowrap">
        Olá, {name}
      </Text>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <ModalUser />
        </PopoverTrigger>
      </Popover>
    </Flex>
  );
}

export default Perfil;
