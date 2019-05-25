/**
 * 使用HOC 处理 Context Consumer
 */
import * as React from 'react'
import { Toggleconsumer } from './ToggleProvider'

const WithContext = (Component: any, Toggleconsumer: any): any => {
  return function() {
    return class extends Component {
      render() {
        // const { props } = this;  {...props}
        return (
          <Toggleconsumer>{data => <Component data={data} />}</Toggleconsumer>
        )
      }
    }
  }
}
/* eslint-disable */
@WithContext(HocContext, Toggleconsumer)
class HocContext extends React.Component<any, any> {
  render() {
    let { name } = this.props.data
    console.log(this)
    return (
      <div>
        <span>我是通过HOC (React.createContext) 传递来的 -> {name}</span>
      </div>
    )
  }
}

export default HocContext
/* eslint-enable */
