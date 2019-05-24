/**
 * 使用HOC 处理 Context Consumer
 */
import * as React from 'react'
import { Toggleconsumer } from './ToggleProvider'
const WithContext = (Component: any): any => {
  return class extends Component {
    render() {
      // const { props } = this;  {...props}
      return (
        <Toggleconsumer>{data => <Component data={data} />}</Toggleconsumer>
      )
    }
  }
}

@WithContext
class Des extends React.Component<any, any> {
  render() {
    // let {name} = this.props.data
    console.log(this)
    return (
      <div>
        <span>我是通过HOC (React.createContext) 传递来的 -></span>
      </div>
    )
  }
}

export default Des
