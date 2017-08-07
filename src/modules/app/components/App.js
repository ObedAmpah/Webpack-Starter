import React, { Component } from 'react'
import PropTypes from 'prop-types'


class App extends Component {
  render() {
    return (
      <div className="App">{this.props.greeting}</div>
    )
  }
}

App.propTypes = {
  greeting: PropTypes.string.isRequired
}

export default App
