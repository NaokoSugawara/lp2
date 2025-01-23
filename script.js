// Accordion

const accordionTitles = document.querySelectorAll(".accordion__title");

accordionTitles.forEach((accordionTitle) => {

    accordionTitle.addEventListener("click", () => {
        const icon = accordionTitle.children[1];
        icon.classList.toggle("accordion__title__icon--active");

        let height = accordionTitle.nextElementSibling.scrollHeight;
        if (icon.classList.contains("accordion__title__icon--active")) {
            accordionTitle.nextElementSibling.style.maxHeight = `${height}px`;
        } else {
            accordionTitle.nextElementSibling.style.maxHeight = "0px";
        }
    })

})



// Carousel

const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.right-arrow');
const prevButton = document.querySelector('.left-arrow');
const indicators = document.querySelectorAll('.indicator');
const slideWidth = slides[0].getBoundingClientRect().width;

let currentIndex = 0;

// Arrange slides next to each other
slides.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`;
});

// Function to move to a specific slide
const moveToSlide = (index) => {
  track.style.transform = `translateX(-${index * slideWidth}px)`;
  updateIndicators(index);
};

// Update indicator buttons
const updateIndicators = (index) => {
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle('active', i === index);
  });
};

// Move to the next slide
nextButton.addEventListener('click', () => {
  if (currentIndex < slides.length - 3) {
    currentIndex++;
    moveToSlide(currentIndex);
  }
});

// Move to the previous slide
prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    moveToSlide(currentIndex);
  }
});

// Indicator button functionality
indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    currentIndex = index;
    moveToSlide(index);
  });
});
