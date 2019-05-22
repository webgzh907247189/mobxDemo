import * as React from 'react'
import ImgContainerRenderPops from './ImgContainer'

// export default class ImgCom extends React.Component<any, any> {
//   componentWillMount() {}
//   render() {
//     return (
//       <div className="">
//         <img
//           src="https://bztic-casaba.oss-cn-shanghai.aliyuncs.com/sit/88000785/dfc5fe60-ae46-441f-8fcc-bdb991892bea.png"
//           alt="图片"
//         />
//       </div>
//     )
//   }
// }

//  Render Props 组件
export default class ImgCom extends React.Component<any, any> {
  render() {
    return (
      <div className="">
        <ImgContainerRenderPops
          src="https://bztic-casaba.oss-cn-shanghai.aliyuncs.com/sit/88000785/dfc5fe60-ae46-441f-8fcc-bdb991892bea.png"
          alt="图片 使用 render Props"
        >
          {props => {
            return (
              <span>
                <img src={props.src} alt={props.alt} />
              </span>
            )
          }}
        </ImgContainerRenderPops>
      </div>
    )
  }
}
