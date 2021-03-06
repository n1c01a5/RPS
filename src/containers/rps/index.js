import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { RenderIf } from 'lessdux'
import { eth } from '../../bootstrap/dapp-api'
import abi from 'ethereumjs-abi'

import * as walletActions from '../../actions/wallet'
import * as rpsActions from '../../actions/rps'
import * as walletSelectors from '../../reducers/wallet'
import Identicon from '../../components/identicon'

import './rps.css'

class RPS extends PureComponent {
  state = {
    c1: null,
    salt: null,
    j2: null,
    bid: 0,
    contractAddress: null
  }
  static propTypes = {
    // Redux State
    balance: walletSelectors.balanceShape.isRequired,

    // Action Dispatchers
    fetchBalance: PropTypes.func.isRequired,
    createRPS: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetchBalance } = this.props
    fetchBalance()
  }

  handleDeployRps = () => {
    const { createRPS } = this.props
    const { c1, salt, j2, bid } = this.state
    const hash = '0x' + abi.soliditySHA3(["uint8", "uint256"],[c1, salt]).toString('hex')
    createRPS({hash, j2, bid})
  }

  handleMove2 = e => {
    const { move2RPS, rps } = this.props
    const { bid } = this.state
    this.setState({contractAddress: rps.data.tx.contractAddress})
    move2RPS({contractAddress: rps.data.tx.contractAddress, move2: e.target.value, amount: bid})
  }

  handleSolve = e => {
    const { solveRPS } = this.props
    const { contractAddress, c1, salt } = this.state
    solveRPS({contractAddress, move1: c1, salt})
  }

  handleC1 = e => this.setState({c1: e.target.value})

  handleSalt = e => this.setState({salt: e.target.value})

  handleJ2 = e => this.setState({j2: e.target.value})

  handleBid = e => this.setState({bid: e.target.value})

  render() {
    const { balance, rps } = this.props

    return (
      <div className="RPS">
        <div className="RPS-message">
          <b>RPS</b>
        </div>
        <div className="RPS-message">
          <RenderIf
            resource={balance}
            loading="Loading balance..."
            done={
              balance.data && (
                <span>
                  Welcome{' '}
                  <Identicon
                    seed="Placeholder"
                    className="RPS-message-identicon"
                  />
                {
                  rps.data === null && (
                    <span>
                    <div>
                      <select onChange={this.handleC1}>
                        <option value={null}>Move</option>
                        <option value={1}>Rock</option>
                        <option value={2}>Paper</option>
                        <option value={3}>Scissors</option>
                        <option value={4}>Lizard</option>
                        <option value={5}>Spock</option>
                      </select>
                      <input onChange={this.handleSalt} type="number" name="salt" placeholder="salt" />
                    </div>
                    <div>
                      <input onChange={this.handleJ2} type="string" name="j2" placeholder="j2 address" />
                    </div>
                    <div>
                      <input onChange={this.handleBid} type="number" name="bid" placeholder="Bid (wei)" />
                    </div>
                    <button onClick={this.handleDeployRps}>Deploy RPS</button>
                    </span>
                  )
                }
                {
                  rps.data && rps.data.tx && (
                    <div>
                      <select onChange={this.handleMove2}>
                        <option value={null}>Move</option>
                        <option value={1}>Rock</option>
                        <option value={2}>Paper</option>
                        <option value={3}>Scissors</option>
                        <option value={4}>Lizard</option>
                        <option value={5}>Spock</option>
                      </select>
                    </div>
                  )
                }
                {
                  rps.data && rps.data.tx2 && (
                    <div>
                      <button onClick={this.handleSolve}>Solve</button>
                    </div>
                  )
                }
                {
                  rps.data && rps.data.tx3 && (
                    <div>
                      <h1>Game Over</h1>
                      <h4>Funds have been released</h4>
                    </div>
                  )
                }
                </span>
              )
            }
            failedLoading={
              <span>
                There was an error fetching your balance. Make sure{' '}
                <a
                  className="Balance-message-link"
                  href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
                >
                  MetaMask
                </a>{' '}
                is unlocked and refresh the page.
              </span>
            }
          />
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    balance: state.wallet.balance,
    rps: state.rps.rps
  }),
  {
    fetchBalance: walletActions.fetchBalance,
    createRPS: rpsActions.createRPS,
    move2RPS: rpsActions.move2RPS,
    solveRPS: rpsActions.solveRPS
  }
)(RPS)
