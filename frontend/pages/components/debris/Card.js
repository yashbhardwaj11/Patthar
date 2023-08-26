import { useEffect, useState } from "react";

import { Box, Flex, Text, Spacer, Input, Button } from "@chakra-ui/react";

import { useContractRead } from "wagmi";
import { PattharABI, PattharAddress } from "@/constants/info";
import Approval from "./Approval";

import { toast } from "react-toastify";

export default function Card({ tokenId }) {
  const axios = require("axios");

  const [tokenObject, setTokenObject] = useState(undefined);
  const [uriData, setURIData] = useState(undefined);
  const [highestBid, setHighestBid] = useState(undefined);
  const [floorValue, setFloorValue] = useState(undefined);
  const [bid, setBid] = useState("0");

  const [startApproval, setStartApproval] = useState(false);

  useContractRead({
    address: PattharAddress,
    abi: PattharABI,
    functionName: "getHighestBid",
    args: [tokenId],
    onSuccess(data) {
      const final = removeZeros(data.toString());
      setHighestBid(final);
    },
  });

  useContractRead({
    address: PattharAddress,
    abi: PattharABI,
    functionName: "getFloorValue",
    args: [tokenId],
    onSuccess(data) {
      const final = removeZeros(data.toString());
      setFloorValue(final);
    },
  });

  useEffect(() => {
    async function execute() {
      if (tokenObject && uriData == undefined) {
        const config = {
          method: "GET",
          url: `https://ipfs.io/ipfs/${tokenObject["uri"]}`,
        };

        const res = await axios(config);
        if (res) {
          setURIData(res.data);
          console.log("URI DATA", res.data);
        }
      }
    }

    execute();
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

  function removeZeros(originalString) {
    const modifiedString = originalString.substring(
      0,
      originalString.length - 36
    );
    return modifiedString;
  }

  function appendZero(str) {
    const zerosToAdd = "0".repeat(36);
    const stringWithZeros = str + zerosToAdd;
    return stringWithZeros;
  }

  const handleClick = () => {
    setStartApproval(true);
  };

  return (
    <>
      {tokenObject && uriData ? (
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
                  <Text fontSize={25}>{uriData["Organsiation"]}</Text>
                  <Spacer />
                  <Text color="#3BC7A6">{tokenId}</Text>
                </Flex>
                <Flex direction="row">
                  <Text>Mission Code : </Text>
                  <Text color="#3BC7A6">{uriData["project"]}</Text>
                </Flex>
                <Flex direction="row">
                  <Text>Weight : </Text>
                  <Text color="#3BC7A6">{uriData["Weight"]}</Text>
                </Flex>
                <Flex direction="row">
                  <Text>Launch Date : </Text>
                  <Text color="#3BC7A6">{uriData["launch date"]}</Text>
                </Flex>
                <Flex direction="row">
                  <Text>X - Dimension : </Text>
                  <Text color="#3BC7A6">{uriData["x-dim"]}</Text>
                </Flex>
                <Flex direction="row" mb={5}>
                  <Text>Y - Dimension : </Text>
                  <Text color="#3BC7A6">{uriData["y-dim"]}</Text>
                </Flex>

                {floorValue ? (
                  <>
                    <Flex direction="row" mb={5}>
                      <Text>Current Highest Bid : </Text>
                      <Text color="#3BC7A6">
                        $
                        {parseInt(highestBid) > parseInt(floorValue)
                          ? highestBid
                          : floorValue}
                      </Text>
                    </Flex>
                    <Flex direction="column">
                      <Text fontSize={22}>Place Bid</Text>
                      <Input
                        type="Number"
                        placeholder={"$" + floorValue}
                        onChange={(e) =>
                          setBid(appendZero(e.target.value.toString()))
                        }
                      ></Input>
                      <Button
                        bgColor="green.400"
                        _active={{ bgColor: "green:600" }}
                        _hover={{ bgColor: "green.500" }}
                        onClick={handleClick}
                      >
                        Initiate
                      </Button>
                    </Flex>
                  </>
                ) : null}
              </Flex>
            </>
          </Box>
        </>
      ) : null}
      {startApproval ? <Approval amount={bid} tokenId={tokenId} /> : null}
    </>
  );
}
