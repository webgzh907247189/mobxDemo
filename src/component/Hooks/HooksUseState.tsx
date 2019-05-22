import * as React from 'react'
import { Button, Modal } from './StateButtonModal'
import * as styles from './index.less'

/** hooks */
let HooksUseState = () => {
  /* eslint-disable */
  const [on, setOn] = React.useState(false)
  /* eslint-enable */

  console.log(on, 'on', setOn)

  return (
    <div className={styles['header']}>
      <p className={styles['title']}>使用 React.useState</p>
      <Button
        onClick={() => {
          console.log('1111', on)
          setOn(true)
        }}
      />
      <Modal
        onSure={() => {
          console.log('2222', on)
          setOn(false)
        }}
        visible={on}
      />
    </div>
  )
}

export default HooksUseState
