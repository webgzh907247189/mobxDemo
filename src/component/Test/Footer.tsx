import * as React from 'react'
import * as styles from './index.css'
import { observer } from 'mobx-react';
import {FooterInterface} from './interface'

@observer
export default class Footer extends React.Component<FooterInterface> {
    allTodos = () => {
        let {allTodos} = this.props.filterListStore
        allTodos()
    }

    activedTodos = () => {
        let {activedTodos} = this.props.filterListStore
        activedTodos()
    }

    didedTodos = () => {
        let {didedTodos} = this.props.filterListStore
        didedTodos()
    }

    public render() {
        return <div className = {styles['footer']}>
            <span className = {styles['item']} onClick = { this.allTodos }>全部item</span>
            <span className = {styles['item']} onClick = { this.activedTodos }>活跃item</span>
            <span className = {styles['item']} onClick = { this.didedTodos }>死亡item</span>
        </div>
    }
}