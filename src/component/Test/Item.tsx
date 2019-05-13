import * as React from 'react'
import { observer } from 'mobx-react'
// import { TodoItemInterFace } from './interface'
import * as styles from './index.css'
import { trace } from 'mobx'

@observer
export default class TodoItem extends React.Component<any, any> {
  itemFilter(itemId) {
    let { itemFilterMobx } = this.props.actionFilter
    itemFilterMobx(itemId)
  }

  public render() {
    trace()
    let { isActive, id, title } = this.props.item

    return (
      <React.Fragment>
        <div
          className={isActive ? styles['green'] : styles['red']}
          key={id}
          onClick={this.itemFilter.bind(this, id)}
        >
          {title} <span>{isActive ? '活跃' : '死亡'}</span>
        </div>
      </React.Fragment>
    )
  }
}
