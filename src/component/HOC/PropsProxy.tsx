/**
 * 属性代理
 *
 * 操作 props
 */
import * as React from 'react'
import ShowAttrs from './RenderPops'
import * as styles from './index.less'

function HigherOrderComponent(WrappedComponent) {
  return class extends React.Component<{}, {}> {
    render() {
      const newProps = {
        name: '大板栗',
        age: 18
      }
      return <WrappedComponent {...newProps} {...this.props} />
    }
  }
}

// @HigherOrderComponent
class ProxyOne extends React.Component<any> {
  static getName() {
    console.log('我是class里面的静态方法', '静态方法丢失')
  }

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

let HigherOrderResult = HigherOrderComponent(ProxyOne)
console.log((HigherOrderResult as any).getName) // 静态方法丢失

export default HigherOrderResult

// export default ProxyOne // -> 装饰器写法
