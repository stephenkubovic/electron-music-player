import id3 from 'id3js'
import mp4 from 'mp4js'
import {extname} from 'path'

export function tags (filepath, callback) {
  var extension = extname(filepath).substring(1)

  if (['m4a', 'mp4'].includes(extension)) {
    handleMP4(filepath, callback)
  } else {
    handleID3(filepath, callback)
  }
}

function handleMP4 (filepath, callback) {
  mp4({file: filepath, type: 'local'}, (err, tags) => {
    callback(err, normalize(tags))
  })
}

function handleID3 (filepath, callback) {
  id3({file: filepath, type: 'local'}, (err, tags) => {
    callback(err, normalize(tags))
  })
}

function normalize (tags) {
  if (!tags) return {}

  return {
    albumName: tags.albumName || tags.album,
    artistName: tags.artistName || tags.artist,
    title: tags.title,
    year: tags.year
  }
}
