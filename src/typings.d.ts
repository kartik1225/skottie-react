/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

interface SvgrComponent
  extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
  const svgUrl: string
  const svgComponent: SvgrComponent
  export default svgUrl
  export { svgComponent as ReactComponent }
}

interface SRProps {
  animationData: LottieFile
}

/**
 * Layer types:
 * 0 - Precomp
 * 1 - Solid
 * 2 - Image
 * 3 - Null
 * 4 - Shape
 * 5 - Text
 */
interface Layer {
  /** layer type */
  ty?: number
  /** transform object */
  ks?: any
  /** auto-orient boolean */
  ao?: number
  /** blend mode type */
  bm?: number
  /** 3d layer boolean */
  ddd?: number
  /** layer index */
  ind?: number
  /** html class */
  cl?: string
  /** html id */
  ln?: string
  /** in point */
  ip?: number
  /** out point */
  op?: number
  /** start time */
  st?: number
  /** name */
  nm?: string
  /** has mask boolean */
  hasMask?: number
  /** mask properties */
  masksProperties?: Array<any>
  /** effects */
  ef?: Array<any>
  /** stretch */
  sr?: number
  /** parent layer index */
  parent?: number
  /** shapes */
  shapes?: Array<any>
  /** color of solid */
  sc?: string
  /** height of solid */
  sh?: number
  /** width of solid */
  sw?: number
  /** reference ID */
  refID?: string
  /** time remapping */
  tm?: any
  /** text */
  t?: any
}

interface LottieFile {
  /** in point */
  ip?: number
  /** out point */
  op?: number
  /** frame rate */
  fr?: number
  /** width */
  w?: number
  /** height */
  h?: number
  /** 3d layer boolean */
  ddd?: number
  /** bodymovin version */
  v?: string
  /** name */
  nm?: string
  /** layers array */
  layers?: Array<Layer>
  /** assets array */
  assets?: Array<any>
  /** fonts object */
  fonts?: any
  /** characters array */
  chars?: Array<any>
}
