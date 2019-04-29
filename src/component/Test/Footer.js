import React,{ Component } from 'react'
import styles from './index.css'
import { inject, observer } from 'mobx-react';

@inject('listStore')
@inject('filterListStore')
@observer
export default class Footer extends Component {
    constructor(props) {
        super(props);
    }

    allTodos(){
        console.log(this.props,'this.props')
        let {allTodos} = this.props.filterListStore
        allTodos()
    }

    activedTodos(){
        let {activedTodos} = this.props.filterListStore
        activedTodos()
    }

    didedTodos(){
        let {didedTodos} = this.props.filterListStore
        didedTodos()
    }

    render() {
        return <div className = {styles['footer']}>
            <span className = {styles['item']} onClick = { this.allTodos.bind(this) }>全部item</span>
            <span className = {styles['item']} onClick = { this.activedTodos.bind(this) }>活跃item</span>
            <span className = {styles['item']} onClick = { this.didedTodos.bind(this) }>死亡item</span>
        </div>
    }
}