import React from 'react'
import keymaster from 'keymaster'
import MediaInfo from './media-info.jsx'

export default React.createClass({
  displayName: 'Player',
  propTypes: {
    source: React.PropTypes.string,
    onEnd: React.PropTypes.func,
    next: React.PropTypes.func,
    prev: React.PropTypes.func
  },
  componentDidUpdate () {
    let node = this.getDOMNode()
    node.addEventListener('ended', this.props.onEnd)
  },
  componentDidMount () {
    keymaster('right', this.props.next)
    keymaster('left', this.props.prev)
  },
  componentWillUnmount () {
    keymaster.unbind('right', this.props.next)
    keymaster.unbind('left', this.props.prev)
  },
  render () {
    if (this.props.source) {
      return (
        <div>
          <audio autoPlay controls src={this.props.source} />
          <MediaInfo media={this.props.source} />
        </div>
      )
    } else {
      return (<div></div>)
    }
  }
})
