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
          <Link href="/layouts/AboutLayout">About</Link>
          {address ? (
            <>
              <Link href="/layouts/MeteoriteLayout">Meteorites</Link>
              <Link href="/layouts/DebrisLayout">Debris</Link>
            </>
          ) : null}
          <ConnectButton label="Connect" showBalance={false} />
        </Flex>
      </Flex>
    </>
  );
}
