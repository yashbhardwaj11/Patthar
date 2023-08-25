import { Flex } from "@chakra-ui/react";
import Card from "./Card";

export default function DebrisHero({ data }) {
  return (
    <>
      <Flex flexWrap="wrap" pt={5}>
        {data
          ? data.map((item, index) => (
              <Card
                key={index}
                tokenId={item["tokenId"]}
                closingTimestamp={item["closingTimestamp"]}
              />
            ))
          : null}
      </Flex>
    </>
  );
}
