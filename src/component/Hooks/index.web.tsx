import * as React from 'react'
import Switch from './Switch'

interface RenderProps {
  on: boolean
  toogle: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

class HooksState extends React.Component {
  render() {
    return (
      <Switch initialState={false}>
        {({ on, toogle }: RenderProps) => {
          return (
            <div>
              <Button onClick={toogle} />
              <Modal onSure={toogle} visible={on} />
            </div>
          )
        }}
      </Switch>
    )
  }
}

interface ButtonPops {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}
const Button = (props: ButtonPops) => {
  return <div onClick={props.onClick}>我是按钮 ->  我可以点击</div>
}

interface ModalPops {
  visible: boolean
  onSure: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}
const Modal = (props: ModalPops) => {
  return (
    <div onClick={props.onSure}>
      我是model ->  我可以点击
      <p>{props.visible ? 'true' : 'fasle'}</p>
    </div>
  )
}

/** hooks */
let hooksUseState = () => {
  /* eslint-disable */
  const [on, setOn] = React.useState(false)
  /* eslint-enable */

  console.log(on, 'on', setOn)
  return (
    <div>
      <Button onClick={() => setOn(true)} />
      <Modal onSure={() => setOn(false)} visible={on} />
    </div>
  )
}

export { hooksUseState, HooksState }
