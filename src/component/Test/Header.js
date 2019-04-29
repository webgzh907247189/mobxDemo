import React,{ Component } from 'react';
import { inject, observer } from 'mobx-react';
import styles from './index.css'

@inject('listStore')
@observer
export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    addtext_keyup = (event) => {
        let text = this.refs.headinput.value;
        let { addList } = this.props.listStore
        if(event.keyCode === 13){
            if(text){
                addList(text)
            }

            this.refs.headinput.value = '';
        }
    }

    btnClick = () => {
        let { addList,addListLength } = this.props.listStore
        let text = this.refs.headinput.value;
        if(text){
            addList(text)
        }

        this.refs.headinput.value = '';
    }

    btnClickAsync = () => {
        let { addListAsync } = this.props.listStore
        let text = this.refs.headinput.value;
        if(text){
            addListAsync(text)
        }

        this.refs.headinput.value = '';
    }

    render() {
        return <div>
            <input ref='headinput'  onKeyUp={ this.addtext_keyup }/>
            <button onClick = { this.btnClick } className = {styles['head-btn']}>增加</button>
            <button onClick = { this.btnClickAsync } className = {styles['head-btn']}>异步追加</button>
        </div>
    }
}