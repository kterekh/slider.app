class Slider {
  /**
   *
   * @param config {{
   *   wrapperNode: HTMLElement
   * }}
   */
  constructor (config) {
    const {
      wrapperNode,
      width,
      height,
      visibleSlides, // should be <= wrapperNode.children.length - 2
      transitionTime,
      delayTime
    } = config
    this.slides = Array.from(wrapperNode.children)
    this.slideWidth = width / visibleSlides
    this.wrapperNode = wrapperNode
    this.width = width
    this.height = height
    this.visibleSlides = visibleSlides
    this.transitionTime = transitionTime
    this.delayTime = delayTime
    this.initiateSlider()
    this.createPervNextButtons()
    this.activeSlideIndex = 1
    this.offAutoPlay()
    this.id = setInterval(this.scrollToNext, this.transitionTime)
    this.prevBtn = document.querySelector('.prevBtn')
    this.nextBtn = document.querySelector('.nextBtn')
  }

  initiateSlider () {
    const slidesTrack = document.createElement('div')
    slidesTrack.style.transform = `translateX(${this.slideWidth * (-1)}px)`
    this.wrapperNode.style.width = `${this.width}px`
    this.wrapperNode.style.height = `${this.height}px`
    slidesTrack.classList.add('slidesTrack')
    this.wrapperNode.append(slidesTrack)
    this.slides.forEach((slide, index) => {
      slide.style.width = `${this.slideWidth}px`
      slide.style.height = `${this.height}px`
      slide.style.order = `${index + 1}`
      slidesTrack.appendChild(slide)
    })
    this.slidesTrack = slidesTrack
  }

  createPervNextButtons () {
    const prevBtn = document.createElement('button')
    const nextBtn = document.createElement('button')
    prevBtn.innerText = 'prev'
    nextBtn.innerText = 'next'
    prevBtn.classList.add('prevBtn')
    nextBtn.classList.add('nextBtn')
    this.wrapperNode.append(prevBtn)
    this.wrapperNode.append(nextBtn)
    prevBtn.addEventListener('click', this.scrollToPrev)
    nextBtn.addEventListener('click', this.scrollToNext)
  }

  scrollToNext = () => {
    this.slidesTrack.style.transition = `transform 0.75s ease-in-out`
    this.slidesTrack.style.transform = `translateX(${this.slideWidth * (-2)}px)`
    const endNextAnimation = () => {
      this.slidesTrack.style.transition = ``
      this.slides.forEach((slide, index) => {
        if (index === this.activeSlideIndex - 1) {
          slide.style.order = `${this.slides.length}`
        } else {
          slide.style.order = `${slide.style.order - 1}`
        }
      })
      this.activeSlideIndex = this.slides.length === this.activeSlideIndex ? 1 : this.activeSlideIndex + 1
      this.slidesTrack.style.transform = `translateX(${this.slideWidth * (-1)}px)`
      this.slidesTrack.removeEventListener('transitionend', endNextAnimation)
    }
    this.slidesTrack.addEventListener('transitionend', endNextAnimation)
  }

  scrollToPrev = () => {
    this.slidesTrack.style.transition = `transform 0.75s ease-in-out`
    this.slidesTrack.style.transform = `translateX(0px)`
    const endPrevAnimation = () => {
      this.slidesTrack.style.transition = ``
      this.activeSlideIndex = 1 === this.activeSlideIndex ? this.slides.length : this.activeSlideIndex - 1
      this.slides.forEach((slide, index) => {
        if (index === this.activeSlideIndex - 1) {
          slide.style.order = `1`
        } else {
          slide.style.order = `${1 + +slide.style.order}`
        }
      })
      this.slidesTrack.style.transform = `translateX(${this.slideWidth * (-1)}px)`
      this.slidesTrack.removeEventListener('transitionend', endPrevAnimation)
    }
    this.slidesTrack.addEventListener('transitionend', endPrevAnimation)
  }

  offAutoPlay = () => {
    this.wrapperNode.addEventListener('mouseenter', () => {
      clearInterval(this.id)
    })

    this.wrapperNode.addEventListener('mouseleave', () => {
      setInterval(this.scrollToNext, this.transitionTime)
    })
  }
}
