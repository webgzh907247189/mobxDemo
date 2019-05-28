/**
 * 反向继承（Inheritance Inversion）
 *
 * 反向继承其实就是 一个函数接受一个 WrappedComponent 组件作为参数传入，并返回一个继承了该传入 WrappedComponent 组件的类，
 * 且在该类的 render() 方法中返回 super.render() 方法。
 *
 *
 * 反向继承 -> 渲染劫持  (必须要class组件)
 * 反向继承不能保证完整的子组件树被解析
 * 反向继承的渲染劫持可以控制 WrappedComponent 的渲染过程，也就是说这个过程中我们可以对 elements tree、state、props 或 render() 的结果做各种操作。
 * 但是如果渲染 elements tree 中包含了 function 类型的组件的话，这时候就不能操作组件的子组件了。
 */

import * as React from 'react'
import * as styles from './index.less'
import { styleList } from './config'

// 反向继承 -> 渲染劫持 -> 条件渲染  (组件渲染性能追踪)
function withLoading(WrappedComponent: any): any {
  return class extends WrappedComponent<any, any> {
    constructor(props) {
      super(props)
      this.state = {
        isLoading: this.props.isLoading
      }
      this.start = 0
      this.end = 0
    }

    componentWillMount() {
      super.componentWillMount && super.componentWillMount()
      this.start = Date.now()
    }

    componentDidMount() {
      super.componentDidMount && super.componentDidMount()
      this.end = Date.now()
      console.log(
        '%c%s',
        styleList.join(';'),
        `${WrappedComponent.name} 组件渲染时间为 ${this.end -
          this.start} ms  ->  组件渲染性能追踪`
      )

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
      //   console.log(tree.props,'tree.props.children')
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
    // return <div>
    //     <p>21313</p>
    //     <p>123</p>
    // </div>
  }
}

/**
 * 反向继承 -> 操作state
 */
function withLogging(WrappedComponent: any): any {
  return class extends WrappedComponent {
    render() {
      let reg = /.+?(省|市|自治区|自治州|县|区)/g
      let list = '广东省广州市黄埔区'.match(reg)

      return (
        <div>
          <h2 className={styles['red']}>
            Debugger Component Logging... -> state & props 来自于
            WrappedComponent 组件
          </h2>
          <p>state: -> {JSON.stringify(this.state, null, 4)}</p>
          <p>props: -> {JSON.stringify(this.props, null, 4)}</p>
          <p>
            JSON.stringify ->{' '}
            {JSON.stringify(
              { name: '1', sex: '2', age: '3', address: '4', fix: '5' },
              ['name', 'age'],
              4
            )}
          </p>
          <p>匹配 -> {list}</p>
          {super.render()}
        </div>
      )
    }
  }
}

@withLogging
class ChangeState extends React.Component {
  static getName() {
    console.log(
      '%c%s',
      styleList.join(';'),
      '我是class里面的静态方法 -> 静态方法并未丢失，因为使用了 ->  反向继承 渲染劫持'
    )
  }

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
console.log(ChangeState.getName())

export { RenderHighjacke, CloneComponent, ChangeState }
