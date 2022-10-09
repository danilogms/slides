export default function debounce(callback, delay) {
  let timer;

  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback(...args);
      timer = null;
    }, delay);
  };
}

function onScroll() {
  console.log("teste");
}

const debouncedScroll = debounce(onScroll, 200)

window.addEventListener("scroll", debouncedScroll);

console.log('teste 01')