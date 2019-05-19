import * as React from 'react'

interface SwitchPops {
  initialState: boolean
  children: ({ on: boolean, toogle: Function }) => React.ReactNode
}

interface SwitchState {
  on: boolean
}

export default class Switch extends React.Component<SwitchPops, SwitchState> {
  constructor(props) {
    super(props)
    this.state = {
      on: props.initialState || false
    }
  }

  toogle = () => {
    this.setState({
      on: !this.state.on
    })
  }

  render() {
    let { on } = this.state
    return (
      <React.Fragment>
        {this.props.children({
          on,
          toogle: this.toogle
        })}
      </React.Fragment>
    )
  }
}
