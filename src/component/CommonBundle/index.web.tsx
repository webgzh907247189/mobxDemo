import * as React from 'react'

export default class CommonBundle extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      mod: null
    }
  }
  componentWillMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.load !== this.props.load) {
      this.load(nextprops)
    }
  }

  load(props) {
    this.setState({
      mod: null
    })

    props.load().then(mod => {
      this.setState({
        mod: mod.default ? mod.default : mod
      })
    })
  }

  render() {
    return this.state.mod ? (this.props as any).children(this.state.mod) : null
  }
}
