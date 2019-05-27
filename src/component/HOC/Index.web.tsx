import * as React from 'react'
import ProxyOne from './PropsProxy'
import PullAwayState from './PullAwayState'
import { GetComponetInstance, EnhancedComponent } from './RefComponent'
import {
  RenderHighjacke,
  CloneComponent,
  ChangeState
} from './InheritanceInversion'

/**
 * https://juejin.im/post/5c72b97de51d4545c66f75d5
 *
 * 如果一个函数 接受一个或多个函数作为参数  或者  返回一个函数 就可称之为 高阶函数
 * 如果一个函数 接受一个或多个组件作为参数  并且  返回一个组件 就可称之为 高阶组件。
 *
 * 无状态组件也称函数式组件
 * 高阶组件中返回的组件是 无状态组件（Stateless Component） 时，该高阶组件其实就是一个 高阶函数，因为 无状态组件 本身就是一个纯函数。
 */
class HOC extends React.Component {
  myRef: any
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  componentDidMount() {
    console.log(this.myRef.current, 'this.myRef.current')
    // render之后就可以输出该ref指向的那个节点
  }

  render() {
    let proxyOneObj = { nameDes: '添加新的属性', age: 20 }
    let pullAwayObj = { nameDes: '添加新的属性' }
    let redObj = { name: 'ref name' }
    let renderObj = { isLoading: true }
    // let forwardRefObj = {name: 'React.forwardRef',forwardedRef: 'forwardedRef'}
    return (
      <div>
        <ProxyOne {...proxyOneObj} />
        <PullAwayState {...pullAwayObj} />

        <GetComponetInstance {...redObj} />
        <EnhancedComponent ref={this.myRef} />

        <RenderHighjacke {...renderObj} />
        <CloneComponent />

        <ChangeState {...renderObj} />
      </div>
    )
  }
}

export default HOC
