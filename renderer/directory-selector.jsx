import React from 'react'
import ipc from 'ipc'
import keymaster from 'keymaster'

let buttonStyle = {
  backgroundColor: '#76C7D7',
  color: '#45828E',
  border: 'none',
  padding: '20px',
  fontSize: '20px',
  borderRadius: '5px',
  position: 'absolute',
  marginLeft: '-125px',
  width: '250px',
  top: '50%'
}

let buttonStyleMinimized = {
  backgroundColor: '#76C7D7',
  color: '#45828E',
  border: 'none',
  padding: '10px',
  fontSize: '14px',
  borderRadius: '5px',
  position: 'absolute',
  width: '150px',
  bottom: '10px',
  right: '10px'
}

export default React.createClass({
  displayName: 'DirectorySelector',
  propTypes: {
    onChange: React.PropTypes.func
  },

  getInitialState () {
    return {style: buttonStyle}
  },

  setDirectory (directory) {
    this.setState({style: buttonStyleMinimized})
    this.props.onChange(directory)
  },
  componentDidMount () {
    ipc.on('directory', (directory) => {
      this.setDirectory(directory)
      buttonStyle.left = '50'
    })
    keymaster('enter', this.openDialog)
  },
  openDialog () {
    ipc.send('dialog')
  },

  render () {
    return <button style={this.state.style} type='button' onClick={this.openDialog}>Select Source</button>
  }
})
