import React from 'react'
import {mount} from 'enzyme'
import {Notification, notify} from '../'

jest.useFakeTimers()

afterEach(() => {
  jest.clearAllTimers()
})

let node = null

afterEach(() => {
  node.unmount()
})

test('(smoke) it should provide items and onClose', () => {
  const Child = jest.fn(() => <div />)
  node = mount(<Notification>{Child}</Notification>)
  expect(Child.mock.calls[0][0].items).toBe(node.state('items'))
  expect(Child.mock.calls[0][0].onClose).toBe(node.instance().handleRemove)
})

test('it should add an item', () => {
  const Child = jest.fn(() => <div />)
  node = mount(<Notification>{Child}</Notification>)
  expect(Child.mock.calls[0][0].items.length).toEqual(0)
  notify({ text: 'Testterrr pogi' })
  expect(Child.mock.calls[1][0].items.length).toEqual(1)
})

test('it should transform args to obj', () => {
  const Child = jest.fn(() => <div />)
  node = mount(<Notification>{Child}</Notification>)
  notify({ text: 'Testterrr pogi' })
  expect(Child.mock.calls[1][0].items[0].text).toEqual('Testterrr pogi')
})

test('it should remove', () => {
  const Child = ({items, onClose}) => (
    items.map((item) => (
      <button key={item.id} onClick={() => onClose(item.id)}>
        Close
      </button>
    ))
  )
  node = mount(<Notification>{Child}</Notification>)
  notify({ text: 'Testterrr pogi' })
  expect(node.state('items').length).toEqual(1)
  // @see https://github.com/airbnb/enzyme/issues/1229
  node.update()
  node.find('button').simulate('click')
  expect(node.state('items').length).toEqual(0)
})

test('it should auto-remove within the default timeout', () => {
  const Child = jest.fn(() => <div />)
  node = mount(<Notification>{Child}</Notification>)
  notify({ text: 'Testterrr pogi' })
  expect(Child.mock.calls[1][0].items.length).toEqual(1)
  jest.runAllTimers()
  expect(Child.mock.calls[2][0].items.length).toEqual(0)
})

test('it should auto-remove within the given timeout ms', () => {
  const Child = jest.fn(() => <div />)
  node = mount(<Notification>{Child}</Notification>)
  notify({ text: 'Testterrr pogi', timeout: 6900 })
  jest.runAllTimers()
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 6900)
})
