import EthContract from 'ethjs-contract'
import { onReceipt } from 'ethjs-extras'
import BN from 'bignumber.js'
import { delay } from 'redux-saga'

import { eth, RPS } from '../../bootstrap/dapp-api'

const rpsEth = {
  async deployRPS (rps, accounts) {
    const contract = new EthContract(eth)

    const RPSInstance = eth.contract(RPS.abi, RPS.bytecode, {
      from: accounts[0],
      gas: 300000
    })

    // create a new contract
    const resultTx = await deployRPS(RPSInstance, accounts, rps.hash, rps.j2, rps.bid)

    let receipt

    while (!receipt) {
      receipt = await eth.getTransactionReceipt(resultTx)
      await delay(200)
    }

    return {tx: receipt}
  },
  async move2 (move2, accounts) {
    const contract = new EthContract(eth)

    const RPSInstance = eth.contract(RPS.abi, RPS.bytecode, {
      from: accounts[0],
      gas: 300000
    })

    const RPSDeployedInstance = await RPSInstance.at(move2.contractAddress)

    const resultTx = await play2RPS(RPSDeployedInstance, accounts, move2.move2, move2.amount)

    let receipt

    while (!receipt) {
      receipt = await eth.getTransactionReceipt(resultTx)
      await delay(200)
    }

    return {tx2: receipt}
  },
  async solve (move1, accounts) {
    const contract = new EthContract(eth)

    const RPSInstance = eth.contract(RPS.abi, RPS.bytecode, {
      from: accounts[0],
      gas: 300000
    })

    const RPSDeployedInstance = await RPSInstance.at(move1.contractAddress)

    const resultTx = await solveRPS(RPSDeployedInstance, accounts, move1.move1, move1.salt)

    let receipt

    while (!receipt) {
      receipt = await eth.getTransactionReceipt(resultTx)
      await delay(200)
    }

    return {tx3: receipt}
  }
}

const deployRPS = (RPS, accounts, hash, j2, amount) => {
  return new Promise((resolve, reject) => {
    RPS.new(
      hash,
      j2,
      {
        from: accounts[0],
        gas: 3000000,
        value: new BN(parseInt(amount, 10)) // 1000000000000000000 = 1 eth
      },
      (error, result) => {
      if (error)
        reject(error)
      resolve(result)
    })
  })
}

const play2RPS = (RPSDeployedInstance, accounts, move2, amount) => {
  return new Promise((resolve, reject) => {
    RPSDeployedInstance.play(
      move2,
      {
        from: accounts[0],
        gas: 300000,
        value: new BN(parseInt(amount, 10)) // 1000000000000000000 = 1 eth
      },
      (error, result) => {
      if (error)
        reject(error)
      resolve(result)
    })
  })
}

const solveRPS = (RPSDeployedInstance, accounts, move1, salt) => {
  return new Promise((resolve, reject) => {
    RPSDeployedInstance.solve(
      move1,
      salt,
      {
        from: accounts[0],
        gas: 300000
      },
      (error, result) => {
      if (error)
        reject(error)
      resolve(result)
    })
  })
}


export default rpsEth
