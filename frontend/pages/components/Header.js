import { Flex, Spacer, Text } from "@chakra-ui/react";
import Link from "next/link";
import "@fontsource/barlow/600.css";

import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  const { address } = useAccount();

  return (
    <>
      <Flex direction="row">
        <Text fontFamily="Barlow">PATTHAR</Text>
        <Spacer />
        <Flex direction="row" gap={5}>
          {address ? (
            <>
              <Link href="/components/bid/BidHero">Bid</Link>
              <Link href="/components/bid/DashboardHero">DashboardHero</Link>
            </>
          ) : null}
          <ConnectButton />
        </Flex>
      </Flex>
    </>
  );
}
