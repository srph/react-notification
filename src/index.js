import React from 'react'
import mitt from 'mitt'

const emitter = mitt()

export function notify(...args) {
  emitter.emit('item:add', ...args)
}

export class Notification extends React.Component {
  state = {
    items: [],
    id: 0
  }

  timers = {}

  componentDidMount() {
    emitter.on('item:add', this.handleAdd)
    emitter.on('item:remove', this.handleRemove)
  }

  componentWillUnmount() {
    emitter.off('item:add', this.handleAdd)
    emitter.off('item:remove', this.handleRemove)
  }

  render() {
    return this.props.children({
      items: this.state.items,
      onClose: this.handleRemove
    })
  }

  handleAdd = (opts) => {
    // notify('Hi') -> notify({ text: 'Hi' })
    if (typeof opts === 'string') {
      opts = { text: opts }
    }

    opts = {
      timeout: 10000,
      ...opts
    }

    const id = this.state.id + 1

    const item = {
      id,
      text: opts.text
    }

    this.setState({
      items: [...this.state.items, item],
      id: id
    })

    setTimeout(() => {
      this.handleRemove(id)
    }, opts.timeout)
  }

  handleRemove = (id) => {
    this.setState({
      items: this.state.items.filter(item => item.id !== id)
    })
  }
}
