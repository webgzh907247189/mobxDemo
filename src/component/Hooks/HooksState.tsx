import * as React from 'react'
import Switch from './Switch'
import { RenderProps } from './interface'
import { Button, Modal } from './StateButtonModal'
import * as styles from './index.less'

class HooksState extends React.Component {
  render() {
    return (
      <div className={styles['header']}>
        <p className={styles['title']}>使用 React render Props</p>
        <Switch initialState={false}>
          {({ on, toogle }: RenderProps) => {
            return (
              <div>
                <Button onClick={toogle} />
                <Modal onSure={toogle} visible={on} />
              </div>
            )
          }}
        </Switch>
      </div>
    )
  }
}

export default HooksState
