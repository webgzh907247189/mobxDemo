import * as React from 'react'

/**
 * https://juejin.im/post/5c9d7485e51d451ba13d9a93
 *
 * useEffect 钩子的作用正如其名 —— 为了处理比如 订阅、数据获取、DOM 操作 等等一些副作用。
 * 它的作用与 componentDidMount, componentDidUpdate 和 componentWillUnmount 这些生命周期函数类似。
 *
 *
 * useEffect 方法的函数返回了一个函数，该 返回的函数 会在组件即将卸载时调用，
 * 我们可以在这里做一些比如清除 timerID 或者取消之前发布的订阅等等一些清除操作
 *
 *
 * 当 useEffect 只传入一个参数时，每次 render 之后都会执行 useEffect 函数
 *
 *
 * 当 useEffect 传入第二个参数是数组时，只有当数组的值（依赖）发生变化时，传入回调函数才会执行
 *
 *
 * 如果给 useEffect 第二个参数传入一个空数组的话，useEffect 的回调函数只会在首次渲染之后执行一次
 */
const EffectTest = function(value) {
  const [text, setText] = React.useState('')

  function onChange(e) {
    setText(e.target.value)
  }

  console.log(value.val, 'ti')

  React.useEffect(() => {
    console.log('render了，我useEffect执行了')
    // render 一次，执行一次  ->  因为就一个参数
    const input = document.getElementById('input')
    input.addEventListener('change', onChange)

    return () => {
      input.removeEventListener('change', onChange)
    }
  }, [value.val])

  return (
    <React.Fragment>
      <input id="input" onInput={onChange} />
      <span>{text}</span>
    </React.Fragment>
  )
}

export { EffectTest }
