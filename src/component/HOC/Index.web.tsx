import * as React from 'react'
import ProxyOne from './PropsProxy'

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
  render() {
    let proxyOneObj = { nameDes: '添加新的属性', age: 20 }

    return (
      <div>
        <ProxyOne {...proxyOneObj} />
      </div>
    )
  }
}

export { HOC }