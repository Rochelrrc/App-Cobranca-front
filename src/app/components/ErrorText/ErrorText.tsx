import { Text } from "@chakra-ui/react";
import React from "react";

export default function TextError({ msg }: { msg: string }) {
  return (
    <Text
      position="absolute"
      bottom="-33%"
      fontFamily="Nunito"
      fontSize="0.93rem"
      font-weight="400"
      letterSpacing=""
      flexWrap="nowrap"
      color="#ff0000"
    >
      {msg}
    </Text>
  );
}
