import { Box } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";

import actionTypes from "@/redux/reducers/action-types";

export default function EditBillieIcon() {
  const dispatch = useDispatch();
  return (
    <>
      <Box>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
        >
          <g clipPath="url(#clip0_84257_4016)">
            <path
              d="M1.25 15.325L5.5 14.325L14.7929 5.03216C15.1834 4.64163 15.1834 4.00847 14.7929 3.61794L12.9571 1.78216C12.5666 1.39163 11.9334 1.39163 11.5429 1.78216L2.25 11.075L1.25 15.325Z"
              stroke="#747488"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.75 15.3252H10.25"
              stroke="#747488"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_84257_4016">
              <rect
                width="16"
                height="16"
                fill="white"
                transform="translate(0.5 0.0751953)"
              />
            </clipPath>
          </defs>
        </svg>
      </Box>
    </>
  );
}
