import React,{ Component } from 'react'
import { inject, observer } from 'mobx-react';
import styles from './index.css'
@inject('listStore')
@inject('filterListStore')
@observer
export default class Content extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    itemFilter(itemId){
        let {itemFilterMobx} = this.props.listStore
        itemFilterMobx(itemId)
    }

    render() {
        let {toDoList = []} = this.props.filterListStore
        console.log(toDoList,'toDoList')
        return <div className = {styles['content']}>
        {
            toDoList.map((item,index) => {
                return <div  className = {item.isActive ? styles['green'] : styles['red']}  key={item.id}  onClick = { this.itemFilter.bind(this,item.id) } >{item.title} <span>{item.isActive ? '活跃' : '死亡'}</span></div>
            })
        }
        </div>
    }
}