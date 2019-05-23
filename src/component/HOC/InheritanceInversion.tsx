/**
 * 反向继承（Inheritance Inversion）
 *
 * 反向继承其实就是 一个函数接受一个 WrappedComponent 组件作为参数传入，并返回一个继承了该传入 WrappedComponent 组件的类，
 * 且在该类的 render() 方法中返回 super.render() 方法。
 */
import * as React from 'react'
// import {InversionInterface} from './interface'
import * as styles from './index.less'

// 反向继承 -> 渲染劫持 -> 条件渲染
function withLoading(WrappedComponent: any): any {
  return class extends WrappedComponent<any, any> {
    constructor(props) {
      super(props)
      this.state = {
        isLoading: this.props.isLoading
      }
    }

    componentDidMount() {
      setTimeout(() => {
        this.setState({ isLoading: false })
      }, 5000)
    }

    render() {
      if (this.state.isLoading) {
        return <Loading />
      } else {
        return super.render()
      }
    }
  }
}

const Loading = () => {
  return <div>Loading... 请求中，请稍后，5s请求完成</div>
}

@withLoading
class RenderHighjacke extends React.Component<{}, {}> {
  render() {
    return <div>HOC 的 反向继承</div>
  }
}

/**
 * 修改由 render() 输出的 React 元素树
 */

interface PropsInter {
  value?: string
}

// 反向继承 -> 渲染劫持 -> 修改由 render() 输出的 React 元素树
function HigherOrderComponent(WrappedComponent: any): any {
  return class extends WrappedComponent {
    render() {
      const tree = super.render()

      const newProps: PropsInter = {}
      if (tree && tree.type === 'input' && !tree.props.value) {
        // console.log(tree.props.value)
        newProps.value = 'something here' + tree.props.value
      }

      const props = {
        ...tree.props,
        ...newProps
      }
      const newTree = React.cloneElement(tree, props, tree.props.children)
      return newTree
    }
  }
}

@HigherOrderComponent
class CloneComponent extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = { val: '' }
  }

  onChange = e => {
    let value = e.target.value
    this.setState({ val: value })
  }

  render() {
    return <input onChange={this.onChange} value={this.state.val} />
  }
}

/**
 * 反向继承 -> 操作state
 */
function withLogging(WrappedComponent: any): any {
  return class extends WrappedComponent {
    render() {
      return (
        <div>
          <h2 className={styles['red']}>
            Debugger Component Logging... -> state & props 来自于
            WrappedComponent 组件
          </h2>
          <p>state: -> {JSON.stringify(this.state, null, 4)}</p>
          <p>props: -> {JSON.stringify(this.props, null, 4)}</p>
          {super.render()}
        </div>
      )
    }
  }
}

@withLogging
class ChangeState extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '反向继承'
    }
  }
  render() {
    return <div>操作state</div>
  }
}

export { RenderHighjacke, CloneComponent, ChangeState }
