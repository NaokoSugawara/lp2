//
// Accordion
//

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




//
// Carousel
//

// variables -------------------------------------------------------

const track = document.querySelector('.carousel__track--inner');
const cards = Array.from(track.children);
// console.log("cards = " + cards)

let nextButton;
let prevButton;
let indicators;
let isForPc = false;



// initiation -----------------------------------------------------------------

// Function to get the current slide width
const getSlideWidth = () => cards[0].getBoundingClientRect().width;

// get card's margins' length on both sides 
const getMargins = () => {
    return getComputedStyle(cards[0]);
    // let marginLeft = parseInt(style.marginLeft);
    // let marginRight = parseInt(style.marginRight);
}

// set currentIndex to 0
let currentIndex = 0;

// Arrange cards next to each other
const updateSlidePositions = () => {
    let style = getMargins();
    let marginLeft = parseInt(style.marginLeft);
    let marginRight = parseInt(style.marginRight);
    cards.forEach((card, index) => {
        card.style.left = `${index * getSlideWidth() + marginRight + marginLeft}px`;
    });
};

// Function to update carousel elements based on screen size
const updateCarouselElements = () => {
    if (window.matchMedia("(min-width: 768px)").matches) {
        nextButton = document.querySelector('.carousel__right-arrow--pc');
        prevButton = document.querySelector('.carousel__left-arrow--pc');
        indicators = document.querySelectorAll('.carousel__indicator');
        isForPc = true;
    } else {
        nextButton = document.querySelector('.carousel__right-arrow--sp');
        prevButton = document.querySelector('.carousel__left-arrow--sp');
        indicators = document.querySelectorAll('.carousel__indicator--sp');
        isForPc = false;
    }

    // Re-attach event listeners for arrows
    nextButton.addEventListener('click', onNextButtonClick);
    prevButton.addEventListener('click', onPrevButtonClick);

    // Re-attach event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (isForPc) {
                if (index === 0) {
                    moveToCard(0);
                } else {
                    moveToCard(3);
                }
            } else {
                currentIndex = index;
                moveToCard(index);
            }
        });
    });
};

// Arrow click handlers
const onNextButtonClick = () => {
    updateSlidePositions();

    if (!isForPc && currentIndex < cards.length - 1) { // SP
        currentIndex++;
        moveToCard(currentIndex);
    } else if (currentIndex < cards.length - 3) { // PC
        currentIndex++;
        moveToCard(currentIndex);
    }
};

const onPrevButtonClick = () => {
    updateSlidePositions();

    if (currentIndex > 0) {
        currentIndex--;
        moveToCard(currentIndex);
    }
};

// Initial setup
updateCarouselElements();
updateSlidePositions();


// functions ------------------------------------------------------------------

// Function to move to a specific card
const moveToCard = (index) => {
    let style = getMargins();
    let marginLeft = parseInt(style.marginLeft);
    let marginRight = parseInt(style.marginRight);
    track.style.transform = `translateX(-${index * (getSlideWidth() + marginRight + marginLeft)}px)`;
    updateIndicators(index);
};

// Function to update indicator buttons
const updateIndicators = (index) => { 

    if (isForPc) {
        indicators.forEach((indicator, i) => {
            const shouldBeActive = (i === 0 && index < 3) || (i === 1 && index > 2);
    
            if (shouldBeActive) {
                indicator.classList.add("active");
            } else {
                indicator.classList.remove("active");
            }
    
        });
    } else {
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }


};


// EventListeners -------------------------------------------------------------

// Add event listener for window resize
window.addEventListener('resize', () => {
    // console.log('Window resized!');
    // console.log("bbb")
    // console.log("cards[0].getBoundingClientRect().width = " + cards[0].getBoundingClientRect().width);

    updateSlidePositions(); // initiate the position to the original
    updateCarouselElements();
    moveToCard(currentIndex); // Adjust to the correct slide
});

// // addEventListener to move to the next card
// nextButton.addEventListener('click', () => {
//     // console.log("eventlistener click!!!");
//     // console.log("currentIndex = " + currentIndex);
//     // console.log("cards.length - 3 = " + (cards.length - 3));
    
//     updateSlidePositions();

//     if (!isForPc && (currentIndex < cards.length - 1) ) {  // SP
//         console.log ("currentIndex = " + currentIndex)
//         currentIndex++;
//         moveToCard(currentIndex);
//     } else if (currentIndex < cards.length - 3) { // PC

//     // console.log("PC ");
        
//         currentIndex++;
//         moveToCard(currentIndex);
//     }
// });

// // addEventListener to move to the previous card
// prevButton.addEventListener('click', () => {

//     updateSlidePositions();

//     if (currentIndex > 0) {
//         currentIndex--;
//         moveToCard(currentIndex);
//     }
// });


// addEventListener for indicators' functionality 
indicators.forEach((indicator, index) => { 
    if (isForPc) {
        indicator.addEventListener('click', () => {
            if (index === 0) {
                moveToCard(0)
            } else {
                moveToCard(3);
            }
        });
    } else {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            moveToCard(index);
        });
    }

});



