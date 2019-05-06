import * as React from 'react'
import { observer } from 'mobx-react'
import * as styles from './index.css'
import { ListStoreInterface } from './interface'

@observer
export default class Header extends React.Component<ListStoreInterface> {
    componentWillReceiveProps (nextProps) {
    }
    
    public refs: {
        headinput: HTMLInputElement;
    }

    private addtextKeyup = (event) => {
    	let text = this.RefsValue()
    	let { addList } = this.props.listStore
    	if (event.keyCode === 13) {
    		if (text) {
    			addList(text)
    		}

    		this.setRefVal()
    	}
    }

    btnClick = () => {
    	let { addList } = this.props.listStore
    	let text = this.RefsValue()
    	if (text) {
    		addList(text)
    	}

    	this.setRefVal()
    }

    RefsValue = (): string => {
    	return this.refs.headinput.value
    }

    btnClickAsync = () => {
    	let { addListAsync } = this.props.listStore
    	let text = this.RefsValue()
    	if (text) {
    		addListAsync(text)
    	}

    	this.setRefVal()
    }

    setRefVal = (): void => {
    	this.refs.headinput.value = ''
    }

    render () {
    	return (<div>
            <input ref="headinput" onKeyUp={this.addtextKeyup} />
            <button onClick={this.btnClick} className={styles['head-btn']}>增加</button>
            <button onClick={this.btnClickAsync} className={styles['head-btn']}>异步追加</button>
    	</div>)
    }
}
