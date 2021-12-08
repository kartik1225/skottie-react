# skottie-react

> Skottie player for react

[![NPM](https://img.shields.io/npm/v/skottie-react.svg)](https://www.npmjs.com/package/skottie-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save skottie-react
```

## Usage

Place skottiekit.wasm file in your public directory

```tsx
import React from 'react'

import { SkottiePlayer } from 'skottie-react'
import 'skottie-react/dist/index.css'
import data from './data.json';

const App = () => {
  return <SkottiePlayer animationData={data} assetPath={'http://localhost:3000/images'} />
}

export default App

```

## License

MIT © [lqbrqt](https://github.com/lqbrqt)
