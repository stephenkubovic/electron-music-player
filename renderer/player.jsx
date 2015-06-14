import React from 'react'

export default React.createClass({
  displayName: 'Player',
  propTypes: {
    source: React.PropTypes.string
  },
  render () {
    return <audio autoPlay controls src={this.props.source} />
  }
})
