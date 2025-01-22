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