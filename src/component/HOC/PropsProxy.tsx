/**
 * 属性代理
 */
import * as React from 'react'
import ShowAttrs from './RenderPops'
import * as styles from './index.less'

function HigherOrderComponent(WrappedComponent) {
  return class extends React.Component {
    render() {
      const newProps = {
        name: '大板栗',
        age: 18
      }
      return <WrappedComponent {...newProps} {...this.props} />
    }
  }
}

@HigherOrderComponent
class ProxyOne extends React.Component<any> {
  render() {
    return (
      <div className={styles['header']}>
        操作 props (加新的属性) -> (同名属性会被merge)
        <ShowAttrs {...this.props}>
          {props => {
            return (
              <div className={styles['header-des']}>
                此处可以 自定义的render props
              </div>
            )
          }}
        </ShowAttrs>
      </div>
    )
  }
}

// export default HigherOrderComponent(ProxyOne)
export default ProxyOne // -> 装饰器写法
