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
    fetchBalance: PropTypes.func.isRequired,
    createRPS: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetchBalance } = this.props
    fetchBalance()
  }

  handleDeployRps = () => {
    const { createRPS } = this.props
    createRPS({c1Hash: 'hash', js: 'j2address'})
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
    rps: state.rps.RPS,
  }),
  {
    fetchBalance: walletActions.fetchBalance,
    createRPS: rpsActions.createRPS
  }
)(Balance)
