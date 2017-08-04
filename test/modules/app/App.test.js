import React from 'react'
import App from '../../../src/modules/app/components/App.js'
import renderer from 'react-test-renderer'
import toJSON from 'enzyme-to-json'

test('App', () => {

  it('should render without crashing', () => {
    const app = renderer.create(
      <App />
    ).toJSON()

    expect(app).toMatchSnapshot()
  })
})
