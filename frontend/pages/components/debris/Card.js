import { useEffect, useState } from "react";

import { Box, Flex, Text, Spacer } from "@chakra-ui/react";

export default function Card({ tokenId, closingTimestamp }) {
  const axios = require("axios");

  const currentTimestamp = Date.now();

  const [tokenObject, setTokenObject] = useState(undefined);
  const [uriData, setURIData] = useState(undefined);

  useEffect(() => {
    async function execute() {
      if (tokenObject) {
        const config = {
          method: "POST",
          url: `https://ipfs.io/ipfs/${tokenObject["uri"]}`,
        };

        const res = await axios(config);
        if (res) {
          setURIData(res.data);
        }
      }
    }
  }, [tokenObject]);

  useEffect(() => {
    async function execute() {
      const data = {
        id: `${tokenId}`,
      };

      const config = {
        method: "POST",
        url: "/api/getTokenData",
        data: data,
      };

      const res = await axios(config);
      if (res) {
        setTokenObject(res.data);
      }
    }

    execute();
  }, []);

  return (
    <>
      {currentTimestamp < closingTimestamp && tokenObject ? (
        <>
          <Box
            bgColor="#F3F3F3"
            w="22%"
            h="min-content"
            float="left"
            ml="2.5%"
            mb={5}
            borderRadius={10}
            boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
          >
            <>
              <Flex
                direction="column"
                fontFamily="Barlow"
                align="left"
                p={4}
                color="black"
              >
                <Flex direction="row">
                  <Text fontSize={25}>{tokenObject}</Text>
                  <Spacer />
                  <Text color="#3BC7A6">{}</Text>
                </Flex>
                <Flex direction="row">
                  <Text>Fee : </Text>
                  <Text color="#3BC7A6">{}</Text>
                </Flex>
                <Flex direction="row">
                  <Text>Intervals : </Text>
                  <Text color="#3BC7A6">{}</Text>
                </Flex>
                <Flex direction="row" mb={5}>
                  <Text>Total Supply : </Text>
                  <Text color="#3BC7A6">{}</Text>
                </Flex>
              </Flex>
            </>
          </Box>
        </>
      ) : null}
    </>
  );
}
