import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";

import { WagmiConfig, createClient, configureChains, goerli } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";

const { provider, webSocketProvider } = configureChains(
  [goerli],
  [alchemyProvider({ apiKey: "ZxqwLlN6BozfXbz4h1fS05-nu7PKnmn1" })]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
};

export default api.withTRPC(MyApp);
