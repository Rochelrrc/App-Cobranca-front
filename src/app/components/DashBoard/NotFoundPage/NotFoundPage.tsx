import { Frame, Vector, X } from "@/assets/svg/not-found";
import { Box, Flex, Text } from "@chakra-ui/react";

export default function NotFoundPage() {
 return (
   <Flex flexDirection="column" height="100%" width="100%" overflowY="auto" zIndex="1100">
     <Flex
       alignItems="center"
       height="100%"
       borderTop="solid 1px #EFF0F6"
       borderBottom="solid 1px #EFF0F6"
       borderRadius="0.3rem"
       bg="#fff"
       display="flex"
     >
       <Box
         flexDirection="column"
         justifyItems="flex-end"
         position="absolute"
         top="30%"
         right="30%"
       >
         <Frame />
       </Box>
       <Box
         flexDirection="column"
         justifyItems="flex-end"
         position="absolute"
         top="40%"
         right="40%"
       >
         <Vector/>
       </Box>
       <Box
         flexDirection="column"
         justifyItems="flex-end"
         position="absolute"
         top="55%"
         right="35%"
       >
         <X/>
       </Box>
       <Box
         flexDirection="column"
         justifyItems="center"
         position="absolute"
         top="80%"
         right="26%"
       >
         <Text textAlign="center" fontFamily="Montserrat" fontWeight="600" fontStyle="normal" fontSize="28px" color="#F08889" lineHeight="normal">
           Nenhum resultado foi encontrado!
         </Text>
         <Text textAlign="center" fontFamily="Montserrat" fontWeight="600" fontStyle="normal" fontSize="24px" color="#9B9BB2" lineHeight="normal">
           Verifique se escrita está correta
         </Text>
       </Box>
     </Flex>
   </Flex>
 );
}
