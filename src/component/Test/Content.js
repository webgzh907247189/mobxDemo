import React,{ Component } from 'react'
import { inject, observer } from 'mobx-react';

@inject('store')
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
        let {itemFilterMobx} = this.props.store
        itemFilterMobx(itemId)
    }

    render() {
        let {toDoList = []} = this.props.store
        return <div className = 'content'>
        {
            toDoList.map((item,index) => {
                return <div  className = {item.isActive ? 'green' : 'red'}  key={item.id}  onClick = { this.itemFilter.bind(this,item.id) } >{item.title} <span>{item.isActive ? '活跃' : '死亡'}</span></div>
            })
        }
        </div>
    }
}