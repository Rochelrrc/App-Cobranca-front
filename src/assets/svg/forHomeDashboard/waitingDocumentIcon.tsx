import { Box } from "@chakra-ui/react";
import { relative } from "path";
import React from "react";

export default function waitingDocumentIcon() {
  return (
    <>
      <Box position="relative">
        <svg
          width="31"
          height="36"
          viewBox="0 0 31 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="Vector"
            d="M13.6673 34.6875H5.50065C2.92332 34.6875 0.833984 32.5982 0.833984 30.0208V5.52079C0.833984 2.94346 2.92332 0.854126 5.50065 0.854126H20.084L30.0007 10.7708V34.6875"
            stroke="#C5A605"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <Box position="absolute" bottom={0} right="25%">
          <svg
            width="5"
            height="18"
            viewBox="0 0 5 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Group 2960">
              <path
                id="Vector"
                d="M2.54297 1.10413V6.93745"
                stroke="#C5A605"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                id="Vector_2"
                d="M4.00065 15.6875C4.00065 16.4928 3.34761 17.1458 2.54232 17.1458C1.73703 17.1458 1.08398 16.4928 1.08398 15.6875C1.08398 14.8822 1.73703 14.2291 2.54232 14.2291C3.34761 14.2291 4.00065 14.8822 4.00065 15.6875Z"
                stroke="#C5A605"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </Box>
      </Box>
    </>
  );
}
