import * as React from 'react';
import { observer } from 'mobx-react';
import * as styles from './index.css'
import {ListStoreInterface} from './interface'

// @inject('listStore')
@observer
export default class Header extends React.Component {


    constructor(props){
        super(props)
    }

    componentWillReceiveProps(nextProps) {
    }

    addtext_keyup = (event) => {
        let text = this.RefsValue()
        let { addList } = this.props.listStore
        if(event.keyCode === 13){
            if(text){
                addList(text)
            }

            this.setRefVal()
        }
    }

    btnClick = () => {
        let { addList } = this.props.listStore
        let text = this.RefsValue()
        if(text){
            addList(text)
        }

        this.setRefVal()
    }

    RefsValue = () => {
        return this.refs.headinput.value;
    }

    btnClickAsync = () => {
        let { addListAsync } = this.props.listStore
        let text = this.RefsValue()
        if(text){
            addListAsync(text)
        }

        this.setRefVal()
    }

    setRefVal = () => {
        this.refs.headinput.value = '';
    }

    render() {
        return <div>
            <input ref='headinput' onKeyUp={ this.addtext_keyup }/>
            <button onClick = { this.btnClick } className = {styles['head-btn']}>增加</button>
            <button onClick = { this.btnClickAsync } className = {styles['head-btn']}>异步追加</button>
        </div>
    }
}