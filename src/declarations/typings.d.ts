declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.less' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.styl' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.svg' {
  import React from 'react'
  import { SvgProps } from 'react-native-svg'

  const content: React.FC<SvgProps>
  export default content
}
