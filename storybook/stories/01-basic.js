import React, { Component } from 'react'
import {Notification, notify} from '../../src'

class BasicToast extends Component {
  render() {
    return (
      <div>
        <button onClick={() => notify({ text: 'Spawn something' })}>
          Try me!
        </button>

        <Notification>
          {({items, onClose}) => (
            <div className='toast-float'>
              {items.map(item =>
                <div className='item' key={item.id}>
                  {item.text}
                  <button className='close' onClick={() => onClose(item.id)}>
                    ×
                  </button>
                </div>
              )}
            </div>
          )}
        </Notification>
      </div>
    );
  }
}

export default BasicToast
