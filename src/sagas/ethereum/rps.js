import EthContract from 'ethjs-contract'

import { eth, RPS } from '../../bootstrap/dapp-api'

const rpsEth = {
  async deployRPS (rps, accounts) {
    const contract = new EthContract(eth)

    const RPSInstance = eth.contract(RPS.abi, RPS.bytecode, {
      from: accounts[0],
      gas: 300000
    })

    // create a new contract
    const resultTx = await deployRPS(RPSInstance, accounts, rps.hash, rps.j2, rps.amount)

    return {'tx': resultTx}
  }
}

const deployRPS = (RPS, accounts, hash, j2, amount) => {
  return new Promise((resolve, reject) => {
    RPS.new(
      hash,
      j2,
      {
        from: accounts[0],
        gas: 300000,
        value: amount // 1000000000000000000 = 1 eth
      },
      (error, result) => {
      if (error)
        reject(error)
      resolve(result)
    })
  })
}


export default rpsEth
