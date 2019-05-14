import * as React from 'react'
import { observer } from 'mobx-react'
import { TodoList, TodoListInterface } from './interface'
import TodoItem from './item'
import * as styles from './index.css'
import { trace } from 'mobx'

@observer
export default class Content extends React.Component<TodoList> {
  public render() {
    // let a = {name:{sex: '11'}}

    // let val = a.name.sex ?? 'default']
    // console.log(this.props, 'this.props.',a?.name?.sex,val)

    trace() // true
    let { toDoList = [] } = this.props.filterListStore

    return (
      <div className={styles['content']}>
        {toDoList.map((item: TodoListInterface, index) => {
          console.log(item, 'item')
          return (
            <TodoItem
              item={item}
              key={index}
              actionFilter={this.props.listStore}
            />
          )
        })}
      </div>
    )
  }
}
