export default class Slide {
  constructor(slide, container) {
    this.slide = document.querySelector(slide)
    this.container = document.querySelector(container)
    this.distance = {
      finalPosition: 0,
      startX: 0,
      movement: 0
    }
    
  }

  moveSlide(distX) {
    this.distance.movePosition = distX
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  updatePositionMouse(clientX) {
    this.distance.movement = (this.distance.startX - clientX) * 1.6;
    return this.distance.finalPosition - this.distance.movement
  }

  onStart(event) {
    event.preventDefault();
    this.distance.startX = event.clientX;
    this.container.addEventListener('mousemove', this.onMove)
  }

  onMove(event) {
    const finalPosition = this.updatePositionMouse(event.clientX);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    this.container.removeEventListener('mousemove', this.onMove)
    this.distance.finalPosition = this.distance.movePosition
  }

  addSlideEvents() {
    this.container.addEventListener('mousedown', this.onStart)
    this.container.addEventListener('mouseup', this.onEnd)
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this)
    this.onMove = this.onMove.bind(this)
    this.onEnd = this.onEnd.bind(this)
  }

  init() {
    this.bindEvents()
    this.addSlideEvents();
    return this
  }
}