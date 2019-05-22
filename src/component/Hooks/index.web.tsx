import * as React from 'react'
import HooksState from './HooksState'
import HooksUseState from './HooksUseState'
import UseContext from './Context'
import UseEffect from './UseEffect'

class Hooks extends React.Component {
  render() {
    return (
      <React.Fragment>
        <HooksState />
        <HooksUseState />

        <UseContext />
        <UseEffect />
      </React.Fragment>
    )
  }
}

export default Hooks
