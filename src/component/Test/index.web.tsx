import * as React from 'react'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import { listStore, filterListStore } from '../../store/store'

export default class Test extends React.Component<any, any> {
  componentWillMount() {}

  componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <div className="content">
        <Header listStore={listStore} />
        <Content listStore={listStore} filterListStore={filterListStore} />
        <Footer filterListStore={filterListStore} />
      </div>
    )
  }
}
