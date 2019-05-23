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

/**
 * refs 属性不能透传
 * 高阶组件可以传递所有的 props 给包裹的组件 WrappedComponent，但是有一种属性不能传递，它就是 ref。与其他属性不同的地方在于 React 对其进行了特殊的处理。
 *
 * 向一个由高阶组件创建的组件的元素添加 ref 引用，那么 ref 指向的是最外层容器组件实例的，而不是被包裹的 WrappedComponent 组件。
 *
 * 有一定要传递 ref 的需求呢，别急，React 为我们提供了一个名为 React.forwardRef 的 API 来解决这一问题（在 React 16.3 版本中被添加）
 */
// function withLogging(WrappedComponent: any): any {
//   class Enhance extends WrappedComponent<any, any> {
//     constructor(props) {
//       super(props)
//     }

//     componentWillReceiveProps(nextProps) {
//       console.log('Current props', this.props)
//       console.log('Next props', nextProps)
//     }

//     render() {
//       const { forwardedRef, ...rest } = this.props
//       // 把 forwardedRef 赋值给 ref
//       return <WrappedComponent {...rest} ref={forwardedRef} />
//     }
//   }

// //   React.forwardRef 方法会传入 props 和 ref 两个参数给其回调函数
// //   所以这边的 ref 是由 React.forwardRef 提供的
// //   function forwardRef(props: any, ref: any): any {
// //     return <Enhance {...props} forwardRef={ref} />
// //   }

//   return React.forwardRef((props: any, ref: any): any => {
//     // return <Enhance {...props} forwardRef={ref} />
//     // return <Enhance/>
//   })
// }
// const EnhancedComponent = withLogging(GetComponetInstance)

export { GetComponetInstance }
