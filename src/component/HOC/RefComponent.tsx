/**
 * 通过 ref 访问到组件实例
 *
 * ref -> 它只能声明在 Class 类型的组件上，而无法声明在函数（无状态）类型的组件上
 *
 * ref 的值可以是字符串（不推荐使用）也可以是一个回调函数，如果是回调函数的话，它的执行时机是：
 *  1. 组件被挂载后（componentDidMount），回调函数立即执行，回调函数的参数为该组件的实例
 *  2. 组件被卸载（componentDidUnmount）或者原有的 ref 属性本身发生变化的时候，此时回调函数也会立即执行，且回调函数的参数为 null
 *
 */

// 想在 高阶组件 中获取到 WrappedComponent 组件的实例，可以通过 WrappedComponent 组件的 ref 属性，
// 该属性会在组件 componentDidMount 的时候执行 ref 的回调函数并传入该组件的实例

// 不能在无状态组件（函数类型组件）上使用 ref 属性，因为无状态组件没有实例

import * as React from 'react'
import { styleList } from './config'

function HigherOrderComponent(WrappedComponent: React.ComponentClass): any {
  return class extends React.Component {
    executeInstanceMethod = wrappedComponentInstance => {
      return wrappedComponentInstance.someMethod()
    }

    render() {
      return (
        <WrappedComponent {...this.props} ref={this.executeInstanceMethod} />
      )
    }
  }
}

@HigherOrderComponent
class GetComponetInstance extends React.Component<any, any> {
  someMethod = (): string => {
    console.log(
      '%c%s',
      styleList.join(';'),
      '在 高阶组件 中获取到 WrappedComponent 组件的实例 -> ref'
    )

    return '11'
  }

  render() {
    return <div>ref</div>
  }
}

export default GetComponetInstance
