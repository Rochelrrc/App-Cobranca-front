import React from "react";

import { useSelector } from "react-redux";

const HomeIcon = () => {
  const { iconsStyleState }: { iconsStyleState: iconsStyleStateProps } =
    useSelector((rootReducer: any) => rootReducer.linksReducer);

  return (
    <>
      {iconsStyleState.home ? (
        <svg
          width="49"
          height="48"
          viewBox="0 0 49 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Frame">
            <path
              id="Vector"
              d="M14 38.5004H34.9999C37.2091 38.5004 38.9999 36.7096 38.9999 34.5004V19.5005L24.4999 9.50049L10 19.5005V34.5004C10 36.7096 11.7909 38.5004 14 38.5004Z"
              stroke="#DA0175"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="Vector_2"
              d="M20 31.4985C20 29.2893 21.7909 27.4985 23.9999 27.4985H24.9999C27.2091 27.4985 28.9999 29.2893 28.9999 31.4985V38.4985H20V31.4985Z"
              stroke="#DA0175"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      ) : (
        <svg
          width="49"
          height="48"
          viewBox="0 0 49 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Frame">
            <path
              id="Vector"
              d="M14 38.5004H34.9999C37.2091 38.5004 38.9999 36.7096 38.9999 34.5004V19.5005L24.4999 9.50049L10 19.5005V34.5004C10 36.7096 11.7909 38.5004 14 38.5004Z"
              stroke="#343447"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="Vector_2"
              d="M20 31.4985C20 29.2893 21.7909 27.4985 23.9999 27.4985H24.9999C27.2091 27.4985 28.9999 29.2893 28.9999 31.4985V38.4985H20V31.4985Z"
              stroke="#343447"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      )}
    </>
  );
};

export default HomeIcon;
