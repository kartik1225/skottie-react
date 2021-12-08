import React from 'react'

import { SkottiePlayer } from 'skottie-react'
import 'skottie-react/dist/index.css'
import data from './data.json';

const App = () => {
  return <SkottiePlayer animationData={data} assetPath={'/images'} skottiePath='/' height={300} width={300} />
}

export default App
