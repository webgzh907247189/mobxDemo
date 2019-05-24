import * as React from 'react'
import HooksState from './HooksState'
import HooksUseState from './HooksUseState'
import UseContext from './Context'
import UseEffect from './UseEffect'
import { ContextOne, ProviderTwo } from './UseContext'

class Hooks extends React.Component {
  render() {
    let obj = { name: '我是直接使用 ContextOne.Provider 传递的' }
    return (
      <React.Fragment>
        <HooksState />
        <HooksUseState />

        <ContextOne.Provider value={obj}>
          <ProviderTwo>
            <UseContext />
          </ProviderTwo>
        </ContextOne.Provider>

        <UseEffect />
      </React.Fragment>
    )
  }
}

export default Hooks
