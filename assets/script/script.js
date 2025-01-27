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

let nextButton;
let prevButton;
let indicators;
let isForPc = false;
if (window.matchMedia("(min-width: 768px)").matches) {
    nextButton = document.querySelector('.carousel__right-arrow--pc');
    prevButton = document.querySelector('.carousel__left-arrow--pc');
    indicators = document.querySelectorAll('.carousel__indicator');
    isForPc = true;
} else {
    nextButton = document.querySelector('.carousel__right-arrow--sp');
    prevButton = document.querySelector('.carousel__left-arrow--sp');
    indicators = document.querySelectorAll('.carousel__indicator--sp');
}

const cardWidth = cards[0].getBoundingClientRect().width;

// get card's margins' length on both sides 
const style = getComputedStyle(cards[0]);
const marginLeft = parseInt(style.marginLeft);
const marginRight = parseInt(style.marginRight);

let currentIndex = 0;



// functions ------------------------------------------------------------------

// Function to move to a specific card
const moveToCard = (index) => {
    track.style.transform = `translateX(-${index * (cardWidth + marginRight + marginLeft)}px)`;
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

// addEventListener to move to the next card
nextButton.addEventListener('click', () => {
    if (!isForPc && (currentIndex < cards.length - 1) ) {  // SP
        console.log ("currentIndex = " + currentIndex)
        currentIndex++;
        moveToCard(currentIndex);
    } else if (currentIndex < cards.length - 3) { // PC
        currentIndex++;
        moveToCard(currentIndex);
    }
});

// addEventListener to move to the previous card
prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        moveToCard(currentIndex);
    }
});


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



