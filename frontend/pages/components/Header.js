import { Flex, Spacer, Text } from "@chakra-ui/react";
import Link from "next/link";
import "@fontsource/barlow/600.css";

import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  const { address } = useAccount();

  return (
    <>
      <Flex direction="row" p={5}>
        <Text fontFamily="Barlow" fontSize={40}>
          PATTHAR
        </Text>
        <Spacer />
        <Flex direction="row" gap={10} align="center" justify="center">
          <Link href="/components/about/AboutHero">About</Link>
          {address ? (
            <>
              <Link href="/components/bid/BidHero">Bid</Link>
              <Link href="/components/bid/DashboardHero">Dashboard</Link>
            </>
          ) : null}
          <ConnectButton label="Connect" showBalance={false} />
        </Flex>
      </Flex>
    </>
  );
}
