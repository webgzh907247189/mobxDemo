import * as React from 'react'
import HooksState from './HooksState'
import HooksUseState from './HooksUseState'
import UseContext from './Context'
import UseEffect from './UseEffect'
import { ProviderOne, ProviderTwo } from './UseContext'

class Hooks extends React.Component {
  render() {
    return (
      <React.Fragment>
        <HooksState />
        <HooksUseState />

        <ProviderOne>
          <ProviderTwo>
            <UseContext />
          </ProviderTwo>
        </ProviderOne>

        <UseEffect />
      </React.Fragment>
    )
  }
}

export default Hooks
