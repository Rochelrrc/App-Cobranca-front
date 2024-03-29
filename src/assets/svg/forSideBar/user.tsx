import React from "react";

import { useSelector } from "react-redux";

const UserIcon = () => {
  const { iconsStyleState }: { iconsStyleState: iconsStyleStateProps } =
    useSelector((rootReducer: any) => rootReducer.linksReducer);

  return (
    <>
      {iconsStyleState.user ? (
        <>
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
                d="M12.0638 38.5H26.937C28.066 38.5 28.9544 37.5634 28.7294 36.457C28.1084 33.4024 26.0798 28 19.5004 28C12.921 28 10.8925 33.4024 10.2714 36.457C10.0464 37.5634 10.9348 38.5 12.0638 38.5Z"
                stroke="#DA0175"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                id="Vector_2"
                d="M32 28C36.1576 28 37.8604 32.2958 38.5478 35.392C38.919 37.064 37.5666 38.5 35.8538 38.5H34"
                stroke="#DA0175"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                id="Vector_3"
                d="M19.5 20.5C22.5376 20.5 25 18.0376 25 15C25 11.9624 22.5376 9.5 19.5 9.5C16.4624 9.5 14 11.9624 14 15C14 18.0376 16.4624 20.5 19.5 20.5Z"
                stroke="#DA0175"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                id="Vector_4"
                d="M30 20.5C33.0376 20.5 35 18.0376 35 15C35 11.9624 33.0376 9.5 30 9.5"
                stroke="#DA0175"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </>
      ) : (
        <>
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
                d="M12.0638 38.5H26.937C28.066 38.5 28.9544 37.5634 28.7294 36.457C28.1084 33.4024 26.0798 28 19.5004 28C12.921 28 10.8925 33.4024 10.2714 36.457C10.0464 37.5634 10.9348 38.5 12.0638 38.5Z"
                stroke="#343447"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                id="Vector_2"
                d="M32 28C36.1576 28 37.8604 32.2958 38.5478 35.392C38.919 37.064 37.5666 38.5 35.8538 38.5H34"
                stroke="#343447"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                id="Vector_3"
                d="M19.5 20.5C22.5376 20.5 25 18.0376 25 15C25 11.9624 22.5376 9.5 19.5 9.5C16.4624 9.5 14 11.9624 14 15C14 18.0376 16.4624 20.5 19.5 20.5Z"
                stroke="#343447"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                id="Vector_4"
                d="M30 20.5C33.0376 20.5 35 18.0376 35 15C35 11.9624 33.0376 9.5 30 9.5"
                stroke="#343447"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </>
      )}
    </>
  );
};

export default UserIcon;
