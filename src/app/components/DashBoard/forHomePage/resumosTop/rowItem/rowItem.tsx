import { Flex, Text } from "@chakra-ui/react";
import React from "react";

import { formatterCoin } from "@/utils/formatters";

export default function RowItem(props: rowItemProps) {
  const { name, value, ID } = props;

  return (
    <>
      <Flex
        alignItems="center"
        height="19%"
        borderTop="solid 1px #EFF0F6"
        borderBottom="solid 1px #EFF0F6"
        bg="#fff"
      >
        <Text
          width="33%"
          padding="0 3%"
          textAlign="center"
          fontFamily="Nunito"
          fontSize="0.8rem"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="130%"
          letterSpacing="0.08px"
          color="#6E6E85"
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          {name}
        </Text>
        <Text
          width="33%"
          textAlign="center"
          fontFamily="Nunito"
          fontSize="0.8rem"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="130%"
          letterSpacing="0.08px"
          color="#6E6E85"
        >
          {ID}
        </Text>
        <Text
          width="33%"
          textAlign="center"
          fontFamily="Nunito"
          fontSize="0.8rem"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="130%"
          letterSpacing="0.08px"
          color="#6E6E85"
        >
          {formatterCoin(value)}
        </Text>
      </Flex>
    </>
  );
}
