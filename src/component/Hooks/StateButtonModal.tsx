import * as React from 'react'
import { ButtonPops, ModalPops } from './interface'

const Button = (props: ButtonPops) => {
  return <div onClick={props.onClick}>我是按钮 ->  我可以点击</div>
}

const Modal = (props: ModalPops) => {
  return (
    <div onClick={props.onSure}>
      我是model ->  我可以点击
      <p>{props.visible ? 'true' : 'fasle'}</p>
    </div>
  )
}

export { Button, Modal }
