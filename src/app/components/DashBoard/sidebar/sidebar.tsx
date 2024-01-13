"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import actionTypes from "@/redux/reducers/action-types";

import HomeIcon from "../../../../assets/svg/forSideBar/homeIcon";
import UserIcon from "../../../../assets/svg/forSideBar/user";
import FileIcon from "../../../../assets/svg/forSideBar/fileIcon";

const Sidebar: React.FC = () => {
  const { iconsStyleState }: { iconsStyleState: iconsStyleStateProps } =
    useSelector((rootReducer: any) => rootReducer.linksReducer);

  const dispatch = useDispatch();
  const router = useRouter();

  const linkStyle: React.CSSProperties = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "4px",
    textDecoration: "none",
    color: "#343447",
    padding: "0 0.7rem",
    fontSize: "0.9rem",
  };

  const activeLinkStyle: React.CSSProperties = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "4px",
    textDecoration: "none",
    color: "#DA0175",
    padding: "0 0.7rem",
    borderRight: "3px solid #DA0175",
    fontSize: "0.9rem",
  };

  function homeIsclicked() {
    router.replace("/pages/dashboard/home");
  }

  function userIsclicked() {
    dispatch({ type: actionTypes.isOpenClientDataKey, payload: false });

    router.replace("/pages/dashboard/client");
  }

  function fileIsclicked() {
    router.replace("/pages/dashboard/charges");
  }

  return (
    <Box
      display="inline-flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      gap="5vh"
      position="absolute"
      top={0}
      bottom={0}
      left={0}
      width="7vw"
      padding="8px 0"
      background="#F0F0F5"
      color="#F0F0F5"
      zIndex={1}
    >
      <button
        onClick={() => homeIsclicked()}
        style={iconsStyleState.home ? activeLinkStyle : linkStyle}
      >
        <HomeIcon />
        Home
      </button>
      <button
        onClick={() => userIsclicked()}
        style={iconsStyleState.user ? activeLinkStyle : linkStyle}
      >
        <UserIcon />
        Clientes
      </button>
      <button
        onClick={() => fileIsclicked()}
        style={iconsStyleState.file ? activeLinkStyle : linkStyle}
      >
        <FileIcon />
        Cobranças
      </button>
    </Box>
  );
};

export default Sidebar;
