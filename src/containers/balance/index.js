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

import './balance.css'

class Balance extends PureComponent {
  state = {
    c1: null,
    salt: null,
    j2: null,
    bid: 0
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

  handleC1 = e => this.setState({c1: e.target.value})

  handleSalt = e => this.setState({salt: e.target.value})

  handleJ2 = e => this.setState({j2: e.target.value})

  handleBid = e => this.setState({bid: e.target.value})

  render() {
    const { balance } = this.props

    console.log('0x' + abi.soliditySHA3(["uint8", "uint256"],[1, 42]).toString('hex'))

    return (
      <div className="Balance">
        <div className="Balance-message">
          <b>RPS</b>
        </div>
        <br />
        <br />
        <div className="Balance-message">
          <RenderIf
            resource={balance}
            loading="Loading balance..."
            done={
              balance.data && (
                <span>
                  Welcome{' '}
                  <Identicon
                    seed="Placeholder"
                    className="Balance-message-identicon"
                  />, You have {balance.data.toString()} ETH.
                  <button onClick={this.handleDeployRps}>Deploy</button>
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
    rps: state.rps.RPS,
  }),
  {
    fetchBalance: walletActions.fetchBalance,
    createRPS: rpsActions.createRPS,
    move2RPS: rpsActions.move2RPS
  }
)(Balance)
