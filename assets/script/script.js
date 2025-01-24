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

const track = document.querySelector('.carousel__track-inner');
const cards = Array.from(track.children);
const nextButton = document.querySelector('.carousel__right-arrow');
const prevButton = document.querySelector('.carousel__left-arrow');
const indicators = document.querySelectorAll('.carousel__indicator');
const cardWidth = cards[0].getBoundingClientRect().width;
console.log("cardWidth = " + cardWidth)

// get card's margins' length on both sides 
const style = getComputedStyle(cards[0]);
const marginLeft = parseInt(style.marginLeft);
const marginRight = parseInt(style.marginRight);

let currentIndex = 0;

// Function to move to a specific card
const moveToCard = (index) => {
    track.style.transform = `translateX(-${index * (cardWidth + marginRight + marginLeft)}px)`;
    updateIndicators(index);
};

// Function to update indicator buttons
const updateIndicators = (index) => {

    indicators.forEach((indicator, i) => {
        const shouldBeActive = (i === 0 && index < 3) || (i === 1 && index > 2);

        if (shouldBeActive) {
            indicator.classList.add("active");
        } else {
            indicator.classList.remove("active");
        }

    });
};

// const updateIndicators = (index) => {
//     indicators.forEach((indicator, i) => {
//         indicator.classList.toggle('active', i === index);
//     });
// };

// Move to the next card
nextButton.addEventListener('click', () => {
    if (currentIndex < cards.length - 3) {
        currentIndex++;
        moveToCard(currentIndex);
    }
});

// Move to the previous card
prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        moveToCard(currentIndex);
    }
});

// Indicator button functionality
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        if (index === 0) {
            moveToCard(0)
        } else {
            moveToCard(3);
        }
    });
});

// indicators.forEach((indicator, index) => {
//     indicator.addEventListener('click', () => {
//         currentIndex = index;
//         moveToCard(index);
//     });
// });
