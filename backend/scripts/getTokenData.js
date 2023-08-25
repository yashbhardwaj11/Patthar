const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const { PattharAddress, PattharABI } = require("../constant_info.json");

const { ethers } = require("ethers");

const PROVIDER = process.env.MUMBAI_RPC;
const DEPLOYER = process.env.PK_DEPLOYER;

const provider = new ethers.providers.JsonRpcProvider(PROVIDER);
const wallet = new ethers.Wallet(DEPLOYER, provider);

const patthar = new ethers.Contract(PattharAddress, PattharABI, wallet);

async function getData(id) {
  try {
    const closingAt = await patthar.getClosingTimestamp(id);
    const highestBid = await patthar.getHighestBid(id);
    const floorValue = await patthar.getFloorValue(id);

    console.log(closingAt.toString());
    if (highestBid.toString() != 0) {
      console.log(highestBid.toString());
    } else {
      console.log(floorValue.toString());
    }
    const uri = await patthar.tokenURI(id);
    console.log(uri);
  } catch (err) {
    console.error(err);
  }
}

async function main() {
  const id = 0;

  await getData(id);
}

main();
