import * as React from 'react'
import { ContextOne, ContextTwo, ConsumerOne, ConsumerTwo } from './UseContext'
import * as styles from './index.less'

const UseContextTest = () => {
  let { name: consumerOneName } = React.useContext(ContextOne)
  let { name: consumerTwoName } = React.useContext(ContextTwo)
  return (
    <React.Fragment>
      <div className={styles['header']}>
        <p className={styles['title']}>使用 React.useContext</p>
        <p>useContextOne -> {consumerOneName}</p>
        <p>useContextOne -> {consumerTwoName}</p>
      </div>

      <div className={styles['header']}>
        <p className={styles['title']}>使用 createContext</p>
        <ConsumerOne>
          {data1 => {
            return (
              <ConsumerTwo>
                {data2 => {
                  return (
                    <div>
                      <p>使用context的Consumer -> {data1.name}</p>
                      <p>使用context的Consumer -> {data2.name}</p>
                    </div>
                  )
                }}
              </ConsumerTwo>
            )
          }}
        </ConsumerOne>
      </div>
    </React.Fragment>
  )
}

export default UseContextTest
