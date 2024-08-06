import { Alchemy, Network, Wallet, AlchemyProvider } from "alchemy-sdk";
import { ethers } from "ethers";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { OrbisKeyDidAuth } from "@useorbis/db-sdk/auth";
import { type EASChainConfig } from "@/types/index";

export const runtime = "edge";

const EAS_CHAIN_CONFIGS: EASChainConfig[] = [
  {
    chainId: 8453,
    chainName: "Base Mainnet",
    subdomain: "base.",
    version: "1.0.1",
    contractAddress: "0x4200000000000000000000000000000000000021",
    schemaRegistryAddress: "0x4200000000000000000000000000000000000020",
    etherscanURL: "https://basescan.org/",
    contractStartBlock: 15200327,
    rpcProvider: `https://sepolia.infura.io/v3/`,
  },
];

const activeChainConfig: EASChainConfig = EAS_CHAIN_CONFIGS[0];

const { ALCHEMY_API_KEY } = process.env;
const settings = {
  apiKey: ALCHEMY_API_KEY,
  network: Network.BASE_MAINNET,
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // get hash of file
    const hashValue = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashValue));
    // get bytes32 hash
    const hashHex =
      "0x" + hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    console.log(hashHex);

    // get cid
    const cid = formData.get("imageCid") as string;
    const name = formData.get("fileName") as string;

    const key = await OrbisKeyDidAuth.generateSeed("hex");

    const provider = new ethers.providers.StaticJsonRpcProvider(
      `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      "mainnet"
    );

    const signer = new ethers.Wallet(key, provider);

    // set up EAS
    const eas = new EAS(activeChainConfig.contractAddress)
    const connected = await eas.connect(signer)
    const offchain = await connected.getOffchain()

    const schemaEncoder = new SchemaEncoder(
      "bytes32 Contenthash, string CID, address Owner, string Name, uint48 StartTimestamp, uint48 EndTimestamp, string AdditionalMeta"
    );
    const encoded = schemaEncoder.encodeData([
      { name: "Contenthash", type: "bytes32", value: hashHex },
      { name: "CID", type: "string", value: cid },
      { name: "Owner", type: "address", value: signer.address },
      { name: "Name", type: "string", value: name },
      {
        name: "StartTimestamp",
        type: "uint48",
        value: Math.floor(Date.now() / 1000),
      },
      {
        name: "EndTimestamp",
        type: "uint48",
        value: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365,
      },
      { name: "AdditionalMeta", type: "string", value: "additional meta" },
    ]);

    // const offchainAttestation = await offchain.signOffchainAttestation(
    //   {
    //     schema: "0xf4d0b0f64b0966976a956b983adfcf404ef8991e2a9c1aee8309af029cb43973",
    //     recipient: signer.address,
    //     time: Math.floor(Date.now() / 1000),
    //     expirationTime: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365,
    //     revocable: true,
    //     refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
    //     data: encoded,
    //     version: 1,
    //   },
    //   signer
    // );
    // console.log(offchainAttestation);

    return Response.json({ data: connected }, { status: 200 });
  } catch (error) {
    return Response.json({ error: `Something went wrong` }, { status: 500 });
  }
}
