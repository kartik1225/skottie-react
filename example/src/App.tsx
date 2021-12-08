import React from 'react'

import { SkottiePlayer } from 'skottie-react'
import 'skottie-react/dist/index.css'
import data from './data.json';

const App = () => {
  return <SkottiePlayer animationData={data} assetPath={'http://localhost:3000/images'} skottiePath='/' />
}

export default App
