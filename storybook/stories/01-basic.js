import React, { Component } from 'react'
import Transition from 'react-addons-css-transition-group'
import {Notification, notify} from '../../src'

class BasicToast extends Component {
  render() {
    return (
      <div>
        <button onClick={() => notify({ text: 'Spawn something' })}>
          Go, go!
        </button>

        <Notification>
          {({items, onClose}) => (
            <Transition
              component='div'
              className='toast-float'
              transitionName={{
                enter: '-enter',
                leave: '-leave'
              }}
              transitionEnterTimeout={400}
              transitionLeaveTimeout={400}>
              {items.map(item =>
                <div className='item' key={item.id}>
                  {item.text}
                  <button className='close' onClick={() => onClose(item.id)}>
                    ×
                  </button>
                </div>
              )}
            </Transition>
          )}
        </Notification>
      </div>
    );
  }
}

export default BasicToast
