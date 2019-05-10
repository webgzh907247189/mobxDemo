import * as React from 'react'

// 创建 context
let ToggleContext = React.createContext({
  name: 'ctx默认值'
})

// 创建 provider
export class ToogleProvider extends React.Component<any> {
  state = {
    name: 'ctx传值'
  }

  render() {
    return (
      <ToggleContext.Provider value={this.state}>
        {this.props.children}
      </ToggleContext.Provider>
    )
  }
}

// 创建 consumer
export const Toggleconsumer = (ToggleContext as any).Consumer
