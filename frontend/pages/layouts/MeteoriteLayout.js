import Header from "../components/Header";
import MeteoriteHero from "../components/meteorite/MeteoriteHero";

import { useState, useEffect } from "react";

import { subgraphEndpoint } from "@/constants/info";

import { toast } from "react-toastify";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default function MeteoriteLayout() {
  const [data, setData] = useState(undefined);
  const [noAsset, setNoAsset] = useState(undefined);

  const query = `{\nmeteoriteAddeds(first: 10) {\nclosingTimestamp\ntokenId\n}\n}`;

  const client = new ApolloClient({
    uri: subgraphEndpoint,
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    // To get user's specific position information.
    async function execute() {
      var { data } = await client.query({
        query: gql`
          ${query}
        `,
      });
      const finalArray = data.meteoriteAddeds;
      console.log(finalArray);
      if (finalArray.length == 0) setNoAsset(true);
      else setData(finalArray);
    }

    toast.info("Fetching User Data.");

    execute();
  }, []);

  return (
    <>
      <Header />
      {data ? <MeteoriteHero data={data} /> : null}
    </>
  );
}
