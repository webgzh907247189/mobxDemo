import * as React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
// import Layout from './component/Layout/index.web'
import Layout from 'component/Layout/index.web'
import Test from 'component/Test/index.web'
// import ImgCom from 'component/ImgCom/index.web'

import * as Loadable from 'react-loadable'

const ImgCom = Loadable({
  loader: () =>
    import(
      /* webpackPreload: true, webpackChunkName: "content" */ './component/ImgCom/index.web'
    ),
  loading() {
    return <div>Loading...</div>
  }
})

const Routers = () => (
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/test" component={Test} />
        <Route exact path="/img" component={ImgCom} />
        <Redirect to="/test" />
      </Switch>
    </Layout>
  </Router>
)

export default Routers
