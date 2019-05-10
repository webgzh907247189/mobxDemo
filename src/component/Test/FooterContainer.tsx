import * as React from 'react'
import { observer } from 'mobx-react'
import { FooterInterface } from './interface'
import Footer from './Footer'

@observer
export default class Footercontainer extends React.Component<FooterInterface> {
  public render() {
    return (
      <React.Fragment>
        <Footer filterListStore={this.props.filterListStore} />
      </React.Fragment>
    )
  }
}
