import React,{ Component } from 'react';
import { inject, observer } from 'mobx-react';
import './index.css'

@inject('store')
@observer
export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    addtext_keyup(event){
        let text = this.refs.headinput.value;
        let { addList } = this.props.store
        if(event.keyCode === 13){
            if(text){
                addList(text)
            }

            this.refs.headinput.value = '';
        }
    }

    btnClick(){
        let { addList } = this.props.store
        let text = this.refs.headinput.value;
        if(text){
            addList(text)
        }

        this.refs.headinput.value = '';
    }

    render() {
        let { addList } = this.props.store
        return <div>
            <input ref='headinput'  onKeyUp={ this.addtext_keyup.bind(this) }/>
            <button onClick = { this.btnClick.bind(this) } className = 'head-btn'>增加</button>
        </div>
    }
}