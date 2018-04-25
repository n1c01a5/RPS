import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { RenderIf } from 'lessdux'

import * as walletActions from '../../actions/wallet'
import * as rpsActions from '../../actions/rps'
import * as walletSelectors from '../../reducers/wallet'
import Identicon from '../../components/identicon'

import './balance.css'

class Balance extends PureComponent {
  static propTypes = {
    // Redux State
    balance: walletSelectors.balanceShape.isRequired,

    // Action Dispatchers
    fetchBalance: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetchBalance } = this.props
    fetchBalance()
  }

  handleDeployRps = () => {
    console.log('wefewf')
    const { createRPS } = this.props
    createRPS({
      c1Hash: "0x109c7d1a56a8d4555ebed5c963048374daedb9b1e99458bd3683101437843e0e",
      j2: "0xca35b7d915458ef540ade6068dfe2f44e8fa733c"
    })
  }

  render() {
    const { balance } = this.props

    console.log(rpsActions)

    return (
      <div className="Balance">
        <div className="Balance-message">
          <b>Hello CryptoWorld</b>
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
    RPS: state.rps.RPS,
  }),
  {
    fetchBalance: walletActions.fetchBalance,
    createRPS: rpsActions.createRPS
  }
)(Balance)
