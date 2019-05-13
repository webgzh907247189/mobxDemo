import * as React from 'react'
import * as ReactDOM from 'react-dom'
import quicklink from "quicklink";

import {hot} from "react-hot-loader"
import * as FastClick from 'fastclick';
import App from './src/app'

import { Provider } from 'mobx-react'
import store from './src/store/index'

FastClick['attach'](document.body);

// import ReactPerfTool from 'react-perf-tool'
// import Perf from 'react-addons-perf'
// import 'react-perf-tool/lib/styles.css'
// <ReactPerfTool perf={Perf} />
// console.log(NODE_ENV)
// if(__DEV__){
//  	window.Perf = Perf
//  }
// https://github.com/inversify/inversify-basic-example  react DI
// https://github.com/jamiebuilds/react-loadable   切分chunk
// https://github.com/stratiformltd/react-loadable-visibility 异步加载

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
quicklink();
render(hot(module)(App))