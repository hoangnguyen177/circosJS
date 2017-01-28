import defaultsDeep from 'lodash/defaultsDeep'
import forEach from 'lodash/forEach'
import keys from 'lodash/keys'
import isArray from 'lodash/isArray'
import { select } from 'd3-selection'
import Layout from './layout'
import render from './render'
import Text from './tracks/Text'
import Highlight from './tracks/Highlight'
import Histogram from './tracks/Histogram'
import Chords from './tracks/Chords'
import Heatmap from './tracks/Heatmap'
import Line from './tracks/Line'
import Scatter from './tracks/Scatter'
import Stack from './tracks/Stack'
import './colorBrewer.css'

const defaultConf = {
  width: 700,
  height: 700,
  container: 'circos',
  defaultTrackWidth: 10,
};

class Core {
  constructor(conf) {
    this.tracks = {}
    this._layout = null
    this.conf = defaultsDeep(conf, defaultConf)
    this.svg = select(this.conf.container).append('svg')
  }

  removeTracks(trackIds) {

    if (typeof(trackIds) === 'undefined') {
      map(this.tracks, (track, id) => {
        this.svg.select('.' + id).remove()
      })
      this.tracks = {}
    }

    else if (typeof(trackIds) === 'string') {
      this.svg.select('.' + trackIds).remove()
      delete this.tracks[trackIds]
    }

    else if (isArray(trackIds)) {
      forEach(trackIds, function(trackId) {
        svg.select('.' + trackId).remove()
        delete this.tracks[trackId]
      })
    }

    else {
      console.warn('removeTracks received an unhandled attribute type')
    }

    return this
  }

  layout(conf, data) {
    this._layout = new Layout(conf, data)
    return this
  }

  chords(id, conf, data) {
    this.tracks[id] = new Chords(this, conf, data)
    return this
  }
  heatmap(id, conf, data) {
    this.tracks[id] = new Heatmap(this, conf, data)
    return this
  }
  highlight(id, conf, data) {
    this.tracks[id] = new Highlight(this, conf, data)
    return this
  }
  histogram(id, conf, data) {
    this.tracks[id] = new Histogram(this, conf, data)
    return this
  }
  line(id, conf, data) {
    this.tracks[id] = new Line(this, conf, data)
    return this
  }
  scatter(id, conf, data) {
    this.tracks[id] = new Scatter(this, conf, data)
    return this
  }
  stack(id, conf, data) {
    this.tracks[id] = new Stack(this, conf, data)
    return this
  }
  text(id, conf, data) {
    this.tracks[id] = new Text(this, conf, data)
    return this
  }
  render(ids, removeTracks) {
    render(ids, removeTracks, this)
  }

}

const Circos = (conf) => {
  const instance = new Core(conf)
  return instance
}

module.exports = Circos
