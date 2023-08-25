const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const { PattharAddress, PattharABI } = require("../constant_info.json");

const { ethers, BigNumber } = require("ethers");

const PROVIDER = process.env.MUMBAI_RPC;
const DEPLOYER = process.env.PK_DEPLOYER;

const provider = new ethers.providers.JsonRpcProvider(PROVIDER);
const wallet = new ethers.Wallet(DEPLOYER, provider);

const patthar = new ethers.Contract(PattharAddress, PattharABI, wallet);

async function create(_tokenURI, _type, _closingTimestamp, _floor) {
  try {
    const txn = await patthar.mintToken(
      _tokenURI,
      _type,
      _closingTimestamp,
      _floor,
      {
        gasLimit: 1000000,
      }
    );
    const receipt = await txn.wait(1);
    console.log(receipt);
    return receipt;
  } catch (err) {
    console.error(err);
  }
}

async function main() {
  const uri = "QmPDtxWsdFMUA4SUL3nXKt8ST7iKkJCorQ9r32EjqZBWFu";
  const type = 1;
  const floor = BigNumber.from("100000000000000000000");
  //   25 / 8 / 23;
  const closingTimestamp = "1693137600";
  await create(uri, type, closingTimestamp, floor);
}

main();
