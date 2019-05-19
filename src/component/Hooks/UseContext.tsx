import * as React from 'react'

// 创建 context
let ContextOne = React.createContext({
  name: '我是ContextOne'
})

// 创建 provider
class ProviderOne extends React.Component<{}> {
  state = {
    name: '我是ContextOne -> one'
  }

  render() {
    return (
      <ContextOne.Provider value={this.state}>
        {this.props.children}
      </ContextOne.Provider>
    )
  }
}

// 创建 consumer
const ConsumerOne = ContextOne.Consumer

// 创建 context
let ContextTwo = React.createContext({
  name: '我是ContextTwo'
})

// 创建 provider
class ProviderTwo extends React.Component<{}> {
  state = {
    name: '我是ContextTwo -> two'
  }

  render() {
    return (
      <ContextTwo.Provider value={this.state}>
        {this.props.children}
      </ContextTwo.Provider>
    )
  }
}

// 创建 consumer
const ConsumerTwo = ContextTwo.Consumer

export {
  ContextOne,
  ConsumerOne,
  ProviderOne,
  ContextTwo,
  ConsumerTwo,
  ProviderTwo
}
