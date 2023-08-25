const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const { PattharAddress, PattharABI } = require("../constant_info");

const { ethers } = require("ethers");

const PROVIDER = process.env.MUMBAI_RPC;
const DEPLOYER = process.env.PK_DEPLOYER;

const provider = new ethers.providers.JsonRpcProvider(PROVIDER);
const wallet = new ethers.Wallet(DEPLOYER, provider);

const patthar = new ethers.Contract(PattharAddress, PattharABI, wallet);

async function cap() {
  try {
    const ans = await patthar.getCurrentTokenId();
    console.log(ans);
  } catch (err) {
    console.error(err);
  }
}

async function main() {
  await cap();
}

main();
