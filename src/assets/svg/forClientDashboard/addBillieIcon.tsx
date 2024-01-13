import { Box } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";

import actionTypes from "@/redux/reducers/action-types";

export default function AddBillieIcon() {
  const dispatch = useDispatch();
  return (
    <>
      <Box
        cursor="pointer"
        onClick={() =>
          dispatch({
            type: actionTypes.addBillieModalIsOpenKey,
            payload: true,
          })
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
        >
          <path
            d="M11.75 19.2988H8.25C7.14543 19.2988 6.25 18.4034 6.25 17.2988V6.79883C6.25 5.69426 7.14543 4.79883 8.25 4.79883H14.5L18.75 9.04883V11.2988"
            stroke="#DA0175"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.5 14.7988V19.2988"
            stroke="#DA0175"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.75 17.0488H15.25"
            stroke="#DA0175"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.5 9.29883H14.25V5.04883"
            stroke="#DA0175"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Box>
    </>
  );
}
