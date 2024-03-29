import React from "react";

import { useSelector } from "react-redux";

const FileIcon = () => {
  const { iconsStyleState }: { iconsStyleState: iconsStyleStateProps } =
    useSelector((rootReducer: any) => rootReducer.linksReducer);

  return (
    <>
      {iconsStyleState.file ? (
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
                d="M16 38.5H33C35.2092 38.5 37 36.7092 37 34.5V18L28.5 9.5H16C13.7909 9.5 12 11.2909 12 13.5V34.5C12 36.7092 13.7909 38.5 16 38.5Z"
                stroke="#DA0175"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                id="Vector_2"
                d="M36.5 18.5H28V10"
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
                d="M16 38.5H33C35.2092 38.5 37 36.7092 37 34.5V18L28.5 9.5H16C13.7909 9.5 12 11.2909 12 13.5V34.5C12 36.7092 13.7909 38.5 16 38.5Z"
                stroke="#343447"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                id="Vector_2"
                d="M36.5 18.5H28V10"
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

export default FileIcon;
