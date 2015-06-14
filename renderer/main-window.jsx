import React from 'react'
import AddressBar from './address-bar.jsx'
import Player from './player.jsx'
import fs from 'fs'
import path from 'path'
import {random} from 'lodash'

export default React.createClass({
  displayName: 'MainWindow',
  getInitialState () {
    return {source: ''}
  },
  getMediaFiles (directory, callback) {
    fs.readdir(directory, (err, files) => {
      if (err || !files) return callback([])

      callback(files.filter((file) => {
        return ['m4a', 'mp3'].includes(path.extname(file).substring(1))
      }).map((file) => {
        return path.resolve(directory, file)
      }))
    })
  },
  handleAddressBarChange (value) {
    this.getMediaFiles(value, (files) => {
      this.setState({source: files[random(0, files.length - 1)]})
    })
  },
  render () {
    return (
      <div>
        <p>Main Window</p>
        <AddressBar onChange={this.handleAddressBarChange} />
        <Player source={this.state.source} />
      </div>
    )
  }
})
