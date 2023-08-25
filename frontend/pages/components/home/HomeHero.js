import { Heading, Text, Flex } from "@chakra-ui/react";
import "@fontsource/barlow/800.css";

export default function HomeHero() {
  return (
    <>
      <Flex direction="column" h="600" w="100%" align="center" justify="center">
        <Heading align="center" fontFamily="Barlow" fontSize={120} w="80%">
          Patthar : Marketplace of the future
        </Heading>
        <Text
          fontSize={30}
          fontWeight="500"
          align="center"
          w="70%"
          mt={5}
          color="gray"
        >
          Powered by blockchain, you too can be a proud owner of meteorites
          right from the space or debris of famous projects.
        </Text>
      </Flex>
    </>
  );
}
