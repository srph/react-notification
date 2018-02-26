import React from 'react'
import {storiesOf} from '@storybook/react'
import Basic from './stories/01-basic'
import Animation from './stories/02-animation'

storiesOf('Uploadi', module)
  .add('basic', () => <Basic />)
  .add('with animations', () => <Animation />)
