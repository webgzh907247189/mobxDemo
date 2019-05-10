import * as React from 'react'
import Header from './Header'
import Content from './Content'
import Footercontainer from './FooterContainer'
import { ToogleProvider } from './ToggleProvider'
import { listStore, filterListStore } from '../../store/store'

export default class Test extends React.Component<any, any> {
  componentWillMount() {}

  componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <div className="content">
        <Header listStore={listStore} />
        <Content listStore={listStore} filterListStore={filterListStore} />
        <ToogleProvider>
          <Footercontainer filterListStore={filterListStore} />
        </ToogleProvider>
      </div>
    )
  }
}
