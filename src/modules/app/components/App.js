import React, { Component } from 'react'
import PropTypes from 'prop-types'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      greeting: 'Hello World'
    }
  }

  render() {
    return (
      <div className="App">{this.state.greeting}</div>
    )
  }
}

App.propTypes = {
  greeting: PropTypes.string.isRequired
}

export default App
