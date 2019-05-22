interface RenderProps {
  on: boolean
  toogle: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

interface ButtonPops {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

interface ModalPops {
  visible: boolean
  onSure: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

interface StateInterface {
  val: string
}

export { RenderProps, ButtonPops, ModalPops, StateInterface }
