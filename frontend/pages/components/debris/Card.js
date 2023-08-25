import { useEffect } from "react";

export default function Card({ tokenId, closingTimestamp }) {
  const axios = require("axios");

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
        console.log(res);
      }
    }

    execute();
  }, []);

  return <></>;
}
