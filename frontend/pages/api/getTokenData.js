require("dotenv").config();
const { ethers } = require("ethers");

const { PattharAddress, PattharABI } = require("../constant_info.json");

const PROVIDER = process.env.MUMBAI_RPC;
const DEPLOYER = process.env.PK_DEPLOYER;

const provider = new ethers.providers.JsonRpcProvider(PROVIDER);
const wallet = new ethers.Wallet(DEPLOYER, provider);

const patthar = new ethers.Contract(PattharAddress, PattharABI, wallet);

async function getData(id) {
  try {
    const uri = await patthar.tokenURI(id);
    const closingAt = await patthar.getClosingTimestamp(id);
    const highestBid = await patthar.getHighestBid(id);
    const floorValue = await patthar.getFloorValue(id);

    if (highestBid.toString() != 0) {
      return [uri, closingAt, highestBid];
    } else {
      return [uri, closingAt, floorValue];
    }
  } catch (err) {
    console.error(err);
    return [undefined, undefined, undefined];
  }
}

export default async function handler(req, res) {
  if (req.method == "GET") {
    const data = req.body;

    const { id } = data;
    const result = await getData(id);

    if (result[0] == undefined)
      res.status(500).json({ error: "Return values undefined" });
    else
      res
        .status(200)
        .json({
          uri: result[0],
          closeTimestamp: result[1],
          highestBid: result[2],
        });
  }
}
