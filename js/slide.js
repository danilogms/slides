export default class Slide {
  constructor(slide, container) {
    this.slide = document.querySelector(slide);
    this.container = document.querySelector(container);
    this.distance = {
      finalPosition: 0,
      startX: 0,
      movement: 0,
    };
  }


  transition(active) {
    this.slide.style.transition = active ? 'transform .3s' : '';
  }

  moveSlide(distX) {
    this.distance.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  updatePositionMouse(clientX) {
    this.distance.movement = (this.distance.startX - clientX) * 1.6;
    return this.distance.finalPosition - this.distance.movement;
  }

  onStart(event) {
    let movetype;
    if(event.type === 'mousedown'){
      event.preventDefault(); //Apenas para mousedown
      this.distance.startX = event.clientX;
      movetype = 'mousemove'
    }else {
      this.distance.startX = event.changedTouches[0].clientX;
      movetype = 'touchmove'
    }
    this.container.addEventListener(movetype, this.onMove)
    this.transition(false)
  }

  onMove(event) {
    const pointerPosition = (event.type === 'mousemove') ? event.clientX : event.changedTouches[0].clientX
    const finalPosition = this.updatePositionMouse(pointerPosition);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    const movetype = (event.type === 'mouseup') ? 'mousemove' : 'touchmove';
    this.container.removeEventListener(movetype, this.onMove);
    this.distance.finalPosition = this.distance.movePosition;
    this.transition(true);
    this.changeSlideOnEnd();
 
  }

  changeSlideOnEnd() {
    if(this.distance.movement > 120 && this.index.proximo !== undefined) {
      this.activeNextSlide()
    }else if (this.distance.movement < - 120 && this.index.anterior !== undefined){
      this.activePrevSlide()
    }else {
      this.changeSlide(this.index.atual)
    }
  }

  addSlideEvents() {
    this.container.addEventListener("mousedown", this.onStart);
    this.container.addEventListener("touchstart", this.onStart);
    this.container.addEventListener("mouseup", this.onEnd);
    this.container.addEventListener("touchend", this.onEnd);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }


  //Configuração dos Slides Atraves de uma Array

  slidePosition(slide) {
    const margin = (this.container.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin)
  }

  slidesConfigs() {
    //desestrutura o this.slide para para preencher a array
    //Array com referencia de todos os itens
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element)
      return {
        position,
        element
      }
    }) 
  }


  slidesIndexNav(index) {
    const ultimo = this.slideArray.length - 1; 
    this.index = {
      anterior: index  ? index - 1 : undefined,
      atual: index,
      proximo: index === ultimo ? undefined : index + 1,
    }
  }


  changeSlide(index) {
    //Metodo que modifica a imagem apresentada no slide
    const slideAtivo = this.slideArray[index]
    this.moveSlide(slideAtivo.position);
    this.slidesIndexNav(index);
    this.distance.finalPosition = slideAtivo.position;
    console.log(this.index)
  }

  activePrevSlide() {
    if(this.index.anterior !== undefined) {
      this.changeSlide(this.index.anterior)
    }
  }

  activeNextSlide() {
    if(this.index.proximo !== undefined) {
      this.changeSlide(this.index.proximo)
    }
  }

  init() {
    this.bindEvents();
    this.transition(true);
    this.addSlideEvents();
    this.slidesConfigs();
    return this;
  }
}
