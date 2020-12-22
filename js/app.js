const DOMStructure = {
  nodeName: 'div',
  attrs: {
    class: 'slider',
    id: 's1',
    width: '100px'
  },
  children: ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(innerText => ({
    nodeName: 'div',
    attrs: {
      class: 'slide'
    },
    innerText
  }))
}
const sliderWrapper = renderDOM(DOMStructure)

new Slider({
  wrapperNode: sliderWrapper,
  width: 400,
  height: 200,
  visibleSlides: 2,
  transitionTime: 1500,
  delayTime: 1000
})

