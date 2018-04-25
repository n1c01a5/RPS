import EthContract from 'ethjs-contract'
import { onReceipt } from 'ethjs-extras'

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

    const tx = await onReceipt(resultTx, {network: 'kovan'})

    return {tx}
  },
  async move2 (move2, accounts) {
    console.log('move2',move2)
    const contract = new EthContract(eth)
    //
    // const RPSInstance = eth.contract(RPS.abi, RPS.bytecode, {
    //   from: accounts[0],
    //   gas: 300000
    // })

    // create a new contract
    // const resultTx = await deployRPS(RPSInstance, accounts, move2)
    //
    // const tx = await eth.getBlockByHash(resultTx, true)

    return {move2}
  }
}

const deployRPS = (RPS, accounts, hash, j2, amount) => {
  return new Promise((resolve, reject) => {
    const contract = RPS.new(
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
