import React from 'react'
import DirectorySelector from './directory-selector.jsx'
import Player from './player.jsx'
import fs from 'fs'
import path from 'path'
import {shuffle} from 'lodash'

export default React.createClass({
  displayName: 'MainWindow',
  getInitialState () {
    return {source: '', playlist: [], playlistIndex: 0}
  },
  isPlayableMedia (filepath) {
    return ['m4a', 'mp3'].includes(path.extname(filepath).substring(1))
  },
  loadMediaFiles (directory, callback) {
    fs.readdir(directory, (err, files) => {
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
      <div onKeyUp={this.handleKeyUp}>
        <p>Main Window</p>
        <DirectorySelector onChange={this.handleDirectoryChange} />
        <Player source={this.state.source} onEnd={this.handlePlayerEnd} next={this.handleNextTrack} prev={this.handlePreviousTrack} />
      </div>
    )
  }
})