import * as React from 'react'
import * as styles from './index.css'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { FooterInterface } from './interface'
import HocContext from './HocContext'
import { Toggleconsumer, ToggleContext } from './ToggleProvider'
import { trace } from 'mobx'

@observer
export default class Footer extends React.Component<FooterInterface, {}> {
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

  public render() {
    trace()
    return (
      <div className={styles['footer']}>
        <div className={styles['header']}>
          <div>
            <Toggleconsumer>
              {data => {
                return (
                  <span>
                    我是通过ctx (React.createContext) 传递来的 -> {data.name}
                  </span>
                )
              }}
            </Toggleconsumer>
            <HocContext />
            <UseContextComponent />
          </div>
        </div>

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
      </div>
    )
  }
}

const UseContextComponent = () => {
  let { name } = React.useContext(ToggleContext)
  return <div> 我是使用 React.useContext的name -> {name}</div>
}
