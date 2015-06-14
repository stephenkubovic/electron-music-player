import React from 'react'

export default React.createClass({
  displayName: 'AudioPlayer',

  propTypes: {
    source: React.PropTypes.string.isRequired,
    isPlaying: React.PropTypes.bool.isRequired,
    defaultTime: React.PropTypes.number,
    onProgress: React.PropTypes.func,
    onTimeUpdate: React.PropTypes.func,
    onEnd: React.PropTypes.func
  },

  componentDidMount () {
    let node = this.getDOMNode()

    node.addEventListener('progress', this.handleProgress)
    node.addEventListener('timeupdate', this.handleTimeUpdate)
    node.addEventListener('ended', this.handleMediaEnd)

    this.updateIsPlaying()
  },

  componentDidUpdate (prevProps) {
    if (prevProps.source !== this.props.source) {
      this.updateSource()
    }

    if (prevProps.isPlaying !== this.props.isPlaying) {
      this.updateIsPlaying()
    }

    if (prevProps.defaultTime !== this.props.defaultTime) {
      this.updateCurrentTime()
    }
  },

  componentWillUnmount () {
    let node = this.getDOMNode()

    node.removeEventListener('progress', this.handleProgress)
    node.removeEventListener('timeupdate', this.handleTimeUpdate)
    node.removeEventListener('ended', this.handleMediaEnd)
  },

  render () {
    return (
      <audio preload='none'>
        <source src={this.props.source}
                type='audio/mpeg' />
      </audio>
    )
  },

  handleTimeUpdate () {
    let node = this.getDOMNode()
    let currentTime = node.currentTime
    let trackDuration = node.duration

    this.props.onTimeUpdate({
      currentTime: currentTime,
      trackDuration: trackDuration
    })
  },

  handleMediaEnd () {
    this.getDOMNode().currentTime = 0
    this.props.onEnd()
  },

  handleProgress () {
    if (!this.props.onProgress) return

    let node = this.getDOMNode()
    let trackDuration = node.duration
    let buffered = node.buffered

    this.props.onProgress({
      trackDuration: trackDuration,
      buffered: buffered
    })
  },

  updateCurrentTime () {
    let node = this.getDOMNode()
    if (node.readyState) {
      node.currentTime = this.props.defaultTime
    }
  },

  updateIsPlaying () {
    let node = this.getDOMNode()
    let isPlaying = this.props.isPlaying

    if (isPlaying) {
      node.play()
    } else {
      node.pause()
    }
  },

  updateSource () {
    let node = this.getDOMNode()
    let isPlaying = this.props.isPlaying

    node.pause()
    this.props.onTimeUpdate({
      currentTime: 0,
      trackDuration: node.duration
    })

    node.load()
    if (isPlaying) {
      node.play()
    }
  }
})
