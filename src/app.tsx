import * as React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Layout from 'component/Layout/Index.web'
import Test from 'component/Test/Index.web'
import Hooks from 'component/Hooks/Index.web'
import HOC from 'component/HOC/Index.web'

import * as Loadable from 'react-loadable'
import './test.js'

// import ImgCom from 'component/ImgCom/index.web'
const ImgCom = Loadable({
  loader: () =>
    import(
      /* webpackPreload: true, webpackChunkName: "content" */ './component/ImgCom/Index.web'
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
        <Route exact path="/hooks" component={Hooks} />
        <Route exact path="/hoc" component={HOC} />
        <Redirect to="/test" />
      </Switch>
    </Layout>
  </Router>
)

export default Routers
