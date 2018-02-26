# React Notification [![npm version](https://img.shields.io/npm/v/@srph/react-notification.svg?style=flat-square)](https://npmjs.com/packages/@srph/react-notification) [![Build Status](https://img.shields.io/travis/srph/react-notification.svg?style=flat-square)](https://travis-ci.org/srph/react-notification?branch=master)

Primitives to build your toast and growls.

## How It Works
This library uses the render props pattern. You can read more about it [here](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce).

## Installation
```bash
npm install @srph/react-notification --save
```

### Script tags
If you're not using a bundler like Browserify or Webpack, simply add the script tag after your React script tag.

```html
<!-- Script tags for React and other libraries -->
<script src="https://unpkg.com/@srph/react-notification/dist/react-notification.min.js"></script>
```

This library is exposed as `ReactNotification` (e.g., `<ReactNotification.Notification />` and `ReactNotification.notify()`).

## Usage
```js
import React from 'react'
import {Notification, notify} from '@srph/react-notification'

class App extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => notify({ text: 'Spawn something' })}>
          Go, go!
        </button>

        <Notification>
          {({items, onClose}) => (
            items.map(item => (
              <div className='item' key={item}>
                {item.text}
                <button onClick={() => onClose(item.id)}>Close</button>
              </div>
            ))
          )}
        </Notification>
      </div>
    )
  }
}

export default App;
```

## API Documentation
Here's a list of props you may use to customize the component for your use-case:

### `<Notification />` Render Props
| Parameter  | Type | Description |
| ----- | ---- | ----------- |
| items | `array` (`<Item>`) | Array containing the notifications. |
| onClose | `function(id: Number)` | Removes the specific notification. Expects the id of an item. |

#### `Item`
```js
{
  id: Number,
  text: String,
  timeout: Number
}
```

### `notify(opts: object)`
Used to spawn a new notification.

| Parameter  | Type | Description |
| ----- | ---- | ----------- |
| `opts.text` | `string` (required) | The text of the notification. |
| `opts.timeout` | `number` | Number of milliseconds before the toast is removed. Defaults to `10000` |

> Tip: You can do `notify('Hello')` which is the same as `notify({ text: 'Hello' })`.

## Setup
You can check the [demo](https://react-notification.kierb.com/), or build it yourself locally:

```bash
npm install
npm run start
```

Afterwards, open up `localhost:9001` in your browser.

### Bundling package
```
npm run bundle
```

### Publish storybook
```
npm run storybook:publish
```
