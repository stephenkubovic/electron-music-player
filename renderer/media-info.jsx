import React from 'react'
import ipc from 'ipc'

let divStyle = {
  fontSize: '30px'
}

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
        <div style={divStyle}>
          <p><strong>{this.state.info.title}</strong> &mdash; {this.state.info.artistName}</p>
          <p><em>{this.state.info.albumName} ({this.state.info.year})</em></p>
        </div>
      )
    } else {
      return null
    }
  }
})
