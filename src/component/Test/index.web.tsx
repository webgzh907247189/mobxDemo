import * as React from 'react'
import * as Loadable from 'react-loadable'
import Header from './Header'
// import Content from './Content'
import Footercontainer from './FooterContainer'
import { ToogleProvider } from './ToggleProvider'
import { listStore, filterListStore } from '../../store/store'

// React.Suspense
// https://blog.csdn.net/roamingcode/article/details/85946380
const LoadableContent = Loadable({
  loader: () => import(/* webpackPreload: true */ /** content */ './Content'),
  loading() {
    return <div>Loading...</div>
  }
})
export default class Test extends React.Component<any, any> {
  render() {
    return (
      <div className="content">
        <Header listStore={listStore} />
        <LoadableContent
          listStore={listStore}
          filterListStore={filterListStore}
        />
        <ToogleProvider>
          <Footercontainer filterListStore={filterListStore} />
        </ToogleProvider>
      </div>
    )
  }
}
