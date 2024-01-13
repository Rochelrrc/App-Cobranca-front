import { FormLabel } from "@chakra-ui/react";
import React from "react";

export default function LabelStyled({ label }: { label: string }) {
  return (
    <FormLabel
      fontFamily="Nunito"
      fontSize="0.8rem"
      fontStyle="normal"
      fontWeight="600"
      lineHeight="20px"
      color="#344054"
    >
      {label}
    </FormLabel>
  );
}
