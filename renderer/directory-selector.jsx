import React from 'react'
import ipc from 'ipc'

export default React.createClass({
  displayName: 'DirectorySelector',
  propTypes: {
    onChange: React.PropTypes.func
  },
  setDirectory (directory) {
    this.props.onChange(directory)
  },
  componentDidMount () {
    ipc.on('directory', (directory) => {
      this.setDirectory(directory)
    })
  },
  openDialog () {
    ipc.send('dialog')
  },
  render () {
    return <button type='button' onClick={this.openDialog}>Select</button>
  }
})
