import * as React from 'react'
import { observer } from 'mobx-react';
import * as styles from './index.css'
import {TodoList,TodoListInterface} from './interface'

@observer
export default class Content extends React.Component<TodoList> {

    componentWillReceiveProps(nextProps) {
    }

    itemFilter(itemId){
        let {itemFilterMobx} = this.props.listStore
        itemFilterMobx(itemId)
    }

    public render() {
        let {toDoList = []} = this.props.filterListStore

        return (
            <div className = {styles['content']}>
            {
                toDoList.map((item: TodoListInterface,index) => {
                    return <div  className = {item.isActive ? styles['green'] : styles['red']}  key={item.id}  onClick = { this.itemFilter.bind(this,item.id) } >{item.title} <span>{item.isActive ? '活跃' : '死亡'}</span></div>
                })
            }
            </div>
        )
    }
}