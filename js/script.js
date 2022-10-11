import debounce from "/js/debounce.js"
import Slide from '/js/slide.js'


const slide = new Slide('.slide', '.container');
slide.init();

slide.changeSlide(4)