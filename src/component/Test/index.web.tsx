import * as React from 'react'
import * as Loadable from 'react-loadable'
import Header from './Header'
import Footercontainer from './FooterContainer'
import { ToggleContext } from './ToggleProvider'
import { listStore, filterListStore } from '../../store/store'

// React.Suspense
// https://blog.csdn.net/roamingcode/article/details/85946380  /* webpackPreload: true */
// import Content from './Content'
const LoadableContent = Loadable({
  loader: () => import(/* webpackChunkName: "content" */ './Content'),
  loading() {
    return <div>Loading...</div>
  }
})

export default class Test extends React.Component<any, any> {
  render() {
    let obj = { name: '我是createContext' }
    return (
      <div className="content">
        <Header listStore={listStore} />
        <LoadableContent
          listStore={listStore}
          filterListStore={filterListStore}
        />
        <ToggleContext.Provider value={obj}>
          <Footercontainer filterListStore={filterListStore} />
        </ToggleContext.Provider>
      </div>
    )
  }
}
