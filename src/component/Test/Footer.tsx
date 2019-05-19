import * as React from 'react'
import * as styles from './index.css'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { FooterInterface, StateInterface } from './interface'
import { Toggleconsumer, ToggleContext } from './ToggleProvider'
import { trace } from 'mobx'
import {
  ConsumerOne,
  ConsumerTwo,
  ContextOne,
  ContextTwo
} from '../Hooks/UseContext'

import { EffectTest } from '../Hooks/UseEffect'

@observer
export default class Footer extends React.Component<
  FooterInterface,
  StateInterface
> {
  constructor(props) {
    super(props)
    this.state = { val: '11' }
  }

  allTodos = () => {
    let { allTodos } = this.props.filterListStore
    allTodos()
  }

  activedTodos = () => {
    let { activedTodos } = this.props.filterListStore
    activedTodos()
  }

  didedTodos = () => {
    let { didedTodos } = this.props.filterListStore
    didedTodos()
  }

  btnClick = () => {
    let valNew = this.state.val + 1
    this.setState({ val: valNew })
  }

  public render() {
    trace()
    return (
      <div className={styles['footer']}>
        <Toggleconsumer>
          {data => {
            return <span>我是通过ctx 传递来的 -> {data.name}</span>
          }}
        </Toggleconsumer>
        <span className={styles['item']} onClick={this.allTodos}>
          全部item
        </span>
        <span className={styles['item']} onClick={this.activedTodos}>
          活跃item
        </span>
        <span className={styles['item']} onClick={this.didedTodos}>
          死亡item
        </span>
        <div>
          77777<Link to={'/img'}>0000</Link>
        </div>

        <UseContextComponent />

        <ConsumerOne>
          {data1 => {
            return (
              <ConsumerTwo>
                {data2 => {
                  return (
                    <div>
                      <UseContextTest />
                      <p>使用context的Consumer -> {data1.name}</p>
                      <p>使用context的Consumer -> {data2.name}</p>
                    </div>
                  )
                }}
              </ConsumerTwo>
            )
          }}
        </ConsumerOne>
        <button onClick={this.btnClick}>点击修改useEffect</button>
        <EffectTest val={this.state.val} />
      </div>
    )
  }
}

const UseContextComponent = () => {
  let { name } = React.useContext(ToggleContext)
  return <div> 我是使用 useContext的name -> {name}</div>
}

const UseContextTest = () => {
  let { name: consumerOneName } = React.useContext(ContextOne)
  let { name: consumerTwoName } = React.useContext(ContextTwo)
  return (
    <React.Fragment>
      <p>useContextOne -> {consumerOneName}</p>
      <p>useContextOne -> {consumerTwoName}</p>
    </React.Fragment>
  )
}
