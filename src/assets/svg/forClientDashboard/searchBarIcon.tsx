import { Box } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";

import actionTypes from "@/redux/reducers/action-types";

export default function SearchBarIcon(props: SearchButtonIconProps) {
  const { search } = props;

  const dispatch = useDispatch();

  return (
    <>
      <Box
        position="absolute"
        right="2%"
        top="18%"
        cursor="pointer"
        zIndex={1}
        onClick={() => {
          dispatch({
            type: actionTypes.clientSearchValueKey,
            payload: search,
          });
          dispatch({
            type: actionTypes.chargeSearchValueKey,
            payload: search,
          });
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        >
          <path
            d="M19.25 19.75L15.5 16M4.75 11.5C4.75 8.04822 7.54822 5.25 11 5.25C14.4518 5.25 17.25 8.04822 17.25 11.5C17.25 14.9518 14.4518 17.75 11 17.75C7.54822 17.75 4.75 14.9518 4.75 11.5Z"
            stroke="#3F3F55"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Box>
    </>
  );
}
