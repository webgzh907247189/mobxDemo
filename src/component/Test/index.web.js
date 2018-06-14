import React,{ Component } from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
// import { inject, observer } from 'mobx-react';

export default class Test extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        return <div>
            <Header/>
            <Content/>
            <Footer/>
        </div>
    }
}