import * as React from 'react'
import * as styles from './index.less'

class Layout extends React.Component{
	constructor(props){
		super(props)
	}

	// this.props.children  它表示组件的所有子节点  数据类型(undefined || object || Array) 
	render(){
		return <div className= {styles['layout']}>
			<div>mobx demo</div>
			<div>{this.props.children}</div>
		</div>
	}
}

export default Layout