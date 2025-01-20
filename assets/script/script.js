const accordionTitles = document.querySelectorAll(".accordion__title");

accordionTitles.forEach((accordionTitle) => {

    accordionTitle.addEventListener("click", () => {
        accordionTitle.classList.toggle("accordion__title--active");
        // accordionTitle.parentElement.classList.toggle("according__item--active");

        const height = accordionTitle.nextElementSibling.scrollHeight;
        if (accordionTitle.classList.contains("accordion__title--active")) {
            accordionTitle.nextElementSibling.style.maxHeight = `${height}px`;
        } else {
            accordionTitle.nextElementSibling.style.maxHeight = "0px";
        }
    })

})