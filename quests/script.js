const emblaNode = document.querySelector('.embla');
const counter = emblaNode.querySelector('.embla__counter');
const options = { loop: false };
const embla = EmblaCarousel(emblaNode, options);
let currentIndex = 0;
const totalCount = embla.slideNodes().length;

const next = emblaNode.querySelector('.embla__button--next');
const prev = emblaNode.querySelector('.embla__button--prev');

function updateCounter() {
  const currentIndex = embla.selectedScrollSnap();
  counter.textContent = `${currentIndex + 1}/${totalCount}`;
}

prev.addEventListener('click', function() {
  if (currentIndex > 0) {
    currentIndex--;
    embla.scrollPrev();
    updateCounter();
  }
});

next.addEventListener('click', function() {
  if (currentIndex < totalCount - 1) {
    currentIndex++;
    embla.scrollNext();
    updateCounter();
  }
});

embla.on('select', updateCounter);
updateCounter();
