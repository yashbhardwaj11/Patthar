import { ChakraProvider } from "@chakra-ui/react";

import { useState, useEffect } from "react";

const RPC =
  "https://polygon-mumbai.g.alchemy.com/v2/eH-QZss2iiTRnRLoHooQbkOcb6IBDFtf";
const PROJECT_ID = "bb4d5889a8d2a37affe34112b7b479e7";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import chakraTheme from "@/styles/chakraTheme";

const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [
    jsonRpcProvider({
      rpc: (polygonMumbai) => ({
        http: `${RPC}`,
      }),
    }),
    // publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Patthar",
  projectId: PROJECT_ID,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }) {
  const toastStyle = {
    fontFamily: "Barlow",
  };

  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {ready ? (
        <>
          <ChakraProvider theme={chakraTheme}>
            <WagmiConfig config={wagmiConfig}>
              <RainbowKitProvider chains={chains} modalSize="compact">
                <Component {...pageProps} />
                <ToastContainer
                  toastStyle={toastStyle}
                  position="top-center"
                  autoClose={8000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick={false}
                  rtl={false}
                  pauseOnFocusLoss={false}
                  draggable={false}
                  pauseOnHover={false}
                  theme="light"
                />
              </RainbowKitProvider>
            </WagmiConfig>
          </ChakraProvider>
        </>
      ) : null}
    </>
  );
}
