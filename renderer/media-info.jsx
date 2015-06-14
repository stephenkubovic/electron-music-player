import React from 'react'
import ipc from 'ipc'

export default React.createClass({
  displayName: 'MediaInfo',
  propTypes: {
    media: React.PropTypes.string
  },
  getInitialState () {
    return {info: null}
  },
  componentWillMount () {
    ipc.on('mediaInfo', (info) => {
      this.setState({info: info})
    })
  },
  componentDidMount () {
    this.updateMediaInfo(this.props.media)
  },
  componentWillReceiveProps (nextProps) {
    this.updateMediaInfo(nextProps.media)
  },
  updateMediaInfo (media) {
    ipc.send('mediaInfo', media)
  },
  render () {
    if (this.state.info) {
      return (
        <div>
          <p><strong>{this.state.info.title}</strong> - {this.state.info.artistName}</p>
          <p><em>{this.state.info.albumName} ({this.state.info.year})</em></p>
        </div>
      )
    } else {
      return null
    }
  }
})
