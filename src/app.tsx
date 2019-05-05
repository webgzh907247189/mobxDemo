import * as React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Layout from './component/Layout/index.web'
import Test from './component/Test/index.web'

const Routers = () => (
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/test" component={Test} />

        <Redirect to="/test" />
      </Switch>
    </Layout>
  </Router>
)

export default Routers
