import React from 'react'
import keymaster from 'keymaster'
import MediaInfo from './media-info.jsx'
import AudioPlayer from './audio-player.jsx'

let playerStyle = {
  width: '100%',
  position: 'absolute',
  top: '30%'
}

let playPauseStyle = {
  fontSize: '60px',
  display: 'block',
  cursor: 'pointer',
  paddingBottom: '20px'
}

let timerStyle = {
  fontSize: '60px',
  display: 'block'
}

function formatTime (totalSeconds) {
  if (!totalSeconds) {
    return '0:00'
  }

  let minutes = parseInt(totalSeconds / 60, 10)
  let seconds = parseInt(totalSeconds % 60, 10)

  if (seconds < 10) {
    seconds = `0${seconds}`
  }

  return `${minutes}:${seconds}`
}

export default React.createClass({
  displayName: 'Player',

  propTypes: {
    source: React.PropTypes.string,
    onEnd: React.PropTypes.func,
    next: React.PropTypes.func,
    prev: React.PropTypes.func
  },

  getInitialState () {
    return {
      className: 'fa-pause',
      isPlaying: true,
      currentTime: 0,
      trackDuration: 0
    }
  },

  componentDidMount () {
    keymaster('right', this.props.next)
    keymaster('left', this.props.prev)
    keymaster('p', this.handlePauseOrPlay)
  },

  componentWillUnmount () {
    keymaster.unbind('right', this.props.next)
    keymaster.unbind('left', this.props.prev)
  },

  handleTimeUpdate (time) {
    this.setState({
      currentTime: formatTime(time.currentTime),
      trackDuration: formatTime(time.trackDuration)
    })
  },

  componentWillReceiveProps (nextProps) {
    if (this.props.source !== nextProps.source) {
      this.play()
    }
  },

  handlePauseOrPlay () {
    if (this.state.isPlaying) {
      this.pause()
    } else {
      this.play()
    }
  },

  pause () {
    this.setState({className: 'fa-play', isPlaying: false})
  },

  play () {
    this.setState({className: 'fa-pause', isPlaying: true})
  },

  render () {
    if (this.props.source) {
      return (
        <div style={playerStyle}>
          <AudioPlayer source={this.props.source} onTimeUpdate={this.handleTimeUpdate} isPlaying={this.state.isPlaying} onEnd={this.props.onEnd} />
          <i style={playPauseStyle} className={'fa ' + this.state.className} onClick={this.handlePauseOrPlay}/>
          <span style={timerStyle}>{this.state.currentTime} / {this.state.trackDuration}</span>
          <MediaInfo media={this.props.source} />
        </div>
      )
    } else {
      return null
    }
  }
})
