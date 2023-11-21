import * as ethers from "ethers"
import { createPublicClient, encodeFunctionData, formatEther, getContract, http } from "viem"
import { mainnet } from "viem/chains"
import l2messenger_abi from "./l2messenger.json"
import gateway_abi from "./gateway.json"
import oracle_abi from "./oracle.json"

// const mainnetProvider = new ethers.getDefaultProvider("mainnet")
const scrollProvider = new ethers.JsonRpcProvider("https://rpc.scroll.io/")
const mainnetClient = createPublicClient({
  chain: mainnet,
  transport: http(),
})

// const scrollClient = createPublicClient({
//   chain: scroll,
//   transport: http(),
// })

const contracts = {
  l1gateway: "0x7F2b8C31F88B6006c382775eea88297Ec1e3E905",
  l2gateway: "0x6EA73e05AdC79974B931123675ea8F78FfdacDF0",
  l1messenger: "0x7885bcbd5cecef1336b5300fb5186a12ddd8c478",
  l2messenger: "0x781e90f1c8Fc4611c9b7497C3B47F99Ef6969CbC",
  l2messenger_from: "0x7885bcbd5cecef1336b5300fb5186a12ddd8c478",
}

const l1GatewayAddress = contracts.l1gateway
const FAKE_AMONUT = BigInt(1)
const MIN_GASLIMIT = 14e4
const getGasLimitGeneric = async (walletCurrentAddress) => {
  const message = encodeFunctionData({
    abi: gateway_abi,
    functionName: "finalizeDepositETH",
    args: [
      walletCurrentAddress,
      walletCurrentAddress,
      FAKE_AMONUT,
      "0x",
    ],
  })
  const l2GatewayAddress = await mainnetClient.readContract({
    functionName: 'counterpart',
    abi: gateway_abi,
    address: l1GatewayAddress
  })
  const calldata = encodeFunctionData({
    abi: l2messenger_abi,
    functionName: "relayMessage",
    args: [
      l1GatewayAddress, // l1 gateway
      l2GatewayAddress, // l2 gateway
      FAKE_AMONUT,
      ethers.MaxUint256,
      message,
    ],
  })
  try {
    const gaslimit = await scrollProvider.estimateGas({
      from: contracts.l2messenger_from,
      to: contracts.l2messenger,
      data: calldata,
    })

    return (
      (BigInt(Math.max(Number(gaslimit), MIN_GASLIMIT)) * BigInt(120)) /
      BigInt(100)
    )
  } catch (error) {
    throw new Error(error)
  }
}

const gaslimit = await getGasLimitGeneric("0x4d881a075db1cf7b4be76b2d8900faed6a4c7d77")
const gasBasefee = await mainnetClient.readContract({
  address: '0x987e300fDfb06093859358522a79098848C33852',
  abi: oracle_abi,
  functionName: 'l2BaseFee',
})

const gasPrice = gasBasefee * gaslimit

console.log("The total price is", formatEther(gasPrice), "ETH")
