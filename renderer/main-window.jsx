import React from 'react'
import DirectorySelector from './directory-selector.jsx'
import Player from './player.jsx'
import path from 'path'
import {shuffle} from 'lodash'
import {files as recursiveFiles} from 'node-dir'

let mainWindowStyle = {
  width: '100%',
  height: '100%',
  padding: 0,
  margin: 0,
  textAlign: 'center'
}

export default React.createClass({
  displayName: 'MainWindow',
  getInitialState () {
    return {source: '', playlist: [], playlistIndex: 0}
  },
  isPlayableMedia (filepath) {
    return ['m4a', 'mp3'].includes(path.extname(filepath).substring(1))
  },
  loadMediaFiles (directory, callback) {
    recursiveFiles(directory, (err, files) => {
      if (err || !files) return callback(err)

      let media = files.filter(this.isPlayableMedia).map((file) => {
        return path.resolve(directory, file)
      })

      callback(null, media)
    })
  },
  createPlaylist (filepaths) {
    this.setState({playlist: shuffle(filepaths), playlistIndex: 0})
  },
  selectNextTrack () {
    let index = this.state.playlistIndex + 1

    if (index === this.state.playlist.length) {
      index = 0
    }

    this.setState({ source: this.state.playlist[index], playlistIndex: index })
  },
  selectPreviousTrack () {
    let index = this.state.playlistIndex - 1

    if (index < 0) {
      index = this.state.playlist.length - 1
    }

    this.setState({ source: this.state.playlist[index], playlistIndex: index })
  },
  handleDirectoryChange (directory) {
    this.loadMediaFiles(directory, (err, files) => {
      if (!err && files) {
        this.createPlaylist(files)
        this.selectNextTrack()
      }
    })
  },
  handleNextTrack () {
    this.selectNextTrack()
  },
  handlePreviousTrack () {
    this.selectPreviousTrack()
  },
  handlePlayerEnd () {
    this.selectNextTrack()
  },
  render () {
    return (
      <div onKeyUp={this.handleKeyUp} style={mainWindowStyle}>
        <Player source={this.state.source} onEnd={this.handlePlayerEnd} next={this.handleNextTrack} prev={this.handlePreviousTrack} />
        <DirectorySelector onChange={this.handleDirectoryChange} />
      </div>
    )
  }
})
