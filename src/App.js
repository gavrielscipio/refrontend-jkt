import React from 'react'

import Navigation from './component/navigation'
import Products from './component/product'

class App extends React.Component {
  render() {
    return (
      <div>
      <Navigation/>
      <Products/>
      </div>
    )
  }
}

export default App
