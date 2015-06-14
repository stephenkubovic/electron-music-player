import React from 'react'
import ipc from 'ipc'
import keymaster from 'keymaster'

let buttonStyle = {
  backgroundColor: '#76C7D7',
  color: '#45828E',
  border: 'none',
  padding: '20px 50px',
  fontSize: '20px',
  borderRadius: '5px',
  position: 'absolute',
  marginLeft: '-125px',
  width: '250px',
  top: '50%'
}

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
    keymaster('enter', this.openDialog)
  },
  openDialog () {
    ipc.send('dialog')
  },
  render () {
    return <button style={buttonStyle} type='button' onClick={this.openDialog}>Select Source</button>
  }
})
