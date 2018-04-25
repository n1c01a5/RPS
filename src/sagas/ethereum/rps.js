import EthContract from 'ethjs-contract'

import { eth, RPS } from '../../bootstrap/dapp-api'

const rpsEth = {
  async deployRPS (rps) {
    const accounts = await eth.accounts()
    const contract = new EthContract(eth)

    const RPSInstance = eth.contract(RPS.abi, RPS.bytecode, {
      from: accounts[0],
      gas: 300000
    })

    // create a new contract
    const resultTx = await deployRPS(RPSInstance, accounts)

    return {'tx': resultTx}
  }
}

const deployRPS = (SimpleStore,accounts) => {
  return new Promise((resolve, reject) => {
    SimpleStore.new(
      "0x109c7d1a56a8d4555ebed5c963048374daedb9b1e99458bd3683101437843e0e",
      "0xca35b7d915458ef540ade6068dfe2f44e8fa733c",
      {
        from: accounts[0],
        gas: 300000,
        value: 10000000000000000 // 0.01 eth
      },
      (error, result) => {
      if (error)
        reject(error)
      resolve(result)
    })
  })
}


export default rpsEth
