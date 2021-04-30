import { mount } from '@vue/test-utils'
import Mapbox from './index'

describe('Mapbox', () => {
  it('should display header text', () => {
    const msg = 'Mapbox'
    const wrapper = mount(Mapbox, { props: { msg } })

    expect(wrapper.find('h1').text()).toEqual(msg)
  })
})
