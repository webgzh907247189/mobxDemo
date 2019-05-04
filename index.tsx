import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader/root'
import attachFastClick from 'fastclick'
import App from './src/app'

import { Provider } from 'mobx-react'
import {listStore,filterListStore} from './src/store/store'
let store = Object.assign({},listStore,filterListStore)

attachFastClick.attach(document.body)

// import ReactPerfTool from 'react-perf-tool'
// import Perf from 'react-addons-perf'
// import 'react-perf-tool/lib/styles.css'
// <ReactPerfTool perf={Perf} />
// console.log(NODE_ENV)
// if(__DEV__){
//  	window.Perf = Perf
//  }


/**
 * 应用包裹在 <AppContainer>，当发生更新所有 <AppContainer> 的 children 会 reloaded。
 * @zhonghao.ge                          Copyright (c)           ANHUI
 * @DateTime    2017-12-17T16:02:27+0800
 */ 
const render = (App) => {
	ReactDOM.render(
		<Provider {...store}>		
	    <App/>
		</Provider>,
    document.getElementById('root')
    );
}

render(hot(App))