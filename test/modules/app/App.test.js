import React from 'react'
import App from '../../../src/modules/app/components/App'
import toJSON from 'enzyme-to-json'
import { shallow } from 'enzyme'

test('App', () => {

  it('should render without crashing', () => {
    const app = shallow(
      <App />
    )

    expect(app).toMatchSnapshot()
  })

  it('should have a string propType', () => {
    const app = shallow(
      <App greeting={'Hello World'} />
    )

    expect(app.prop('greeting').toNotEqual('Hello World'))
  })
})
