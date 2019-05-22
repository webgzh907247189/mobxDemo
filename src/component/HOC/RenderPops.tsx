import * as React from 'react'
import * as styles from './index.less'

const ShowAttrs = props => {
  let PropsObjKey = Object.keys(props).filter(item => item !== 'children')

  return (
    <div className={styles['item-des']}>
      {props.children(props)}
      {PropsObjKey.map((item, index) => {
        return (
          <div key={index}>
            {item} -> {props[item]}
          </div>
        )
      })}
    </div>
  )
}

export default ShowAttrs
