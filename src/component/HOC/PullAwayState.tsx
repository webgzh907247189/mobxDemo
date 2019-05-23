/**
 * 属性代理
 *
 * 抽离 state
 */
import * as React from 'react'
import { StateInterface } from './interface'
// import ShowAttrs from './RenderPops'
import * as styles from './index.less'

function withOnChange(WrappedComponent: React.FC): React.ComponentClass {
  return class extends React.Component<{}, StateInterface> {
    constructor(props) {
      super(props)
      this.state = {
        name: ''
      }
    }

    onChange = () => {
      this.setState({
        name: '大板栗'
      })
    }

    render() {
      const newProps = {
        name: {
          value: this.state.name,
          onChange: this.onChange
        }
      }
      return (
        <div style={{ backgroundColor: '#fafafa' }}>
          <WrappedComponent {...this.props} {...newProps} />
        </div>
      )
    }
  }
}

const NameInput = props => {
  console.log(props, 'props')
  return (
    <div className={styles['header']}>
      <input name="name" {...props.name} />
    </div>
  )
}
export default withOnChange(NameInput)
