"use strict"

/**
 * Create a category for gallery's images
 */
function dataCategories() {
    let imgItems = document.querySelectorAll('.gallery-item');
    let arrayKeys = [];
    let i;
     for (const key of imgItems.keys()) {
        arrayKeys.push(key);
    };

    for (i = 0; i < imgItems.length; i++) {
        imgItems[i].setAttribute('data-category', arrayKeys[i]);
    };
};

/**
 * 
 * Create the modal's body
 * 
 */
function createModal() {
    let gallery = document.querySelector('.gallery');
    let imgItems = document.querySelectorAll('.gallery-item');

    imgItems.forEach(imgItem => {
        imgItem.addEventListener('click', event => {
            let dataCategory = event.target.dataset.category;
            let dataGalleryTag = event.target.dataset.galleryTag;
            
            // Create the modal
            let img = document.createElement('img');
                img.classList.add('modal-img');
                img.srcset = event.target.srcset;
                img.alt = event.target.alt;
                img.dataset.category = dataCategory;
                img.dataset.galleryTag = dataGalleryTag;

            let modalBody = document.createElement('div');
                modalBody.classList.add('modal--body');

            let body = document.querySelector('body');

            let modalBackdrop = document.createElement('div');
                modalBackdrop.classList.add('modal-backdrop');

            // Add previous button,image and next button to the modal
                previousButton(modalBody)
                modalBody.appendChild(img);
                nextButton(modalBody);

            // Add modal and modal's backdrop to DOM  
                gallery.appendChild(modalBody);
                body.appendChild(modalBackdrop);

            // Close the modal's backdrop
            modalBackdrop.addEventListener('click', event => {
                modalBackdrop.remove();
                modalBody.remove();
            });

            // Close modal with image
            img.addEventListener('click', event => {
                modalBackdrop.remove();
                modalBody.remove();
            });
        });
    });
};
/**
 * 
 * Create the modal's image
 * 
 * @param Node, modalBody, the node related to the modal
 * @param Object, imgItem, an image from the gallery
 */
function createModalImg(modalBody, imgItem) {
    let modalBackdrop = document.querySelector('.modal-backdrop');

    if (imgItem != null) {
        let img = document.createElement('img');
            img.classList.add('modal-img');
            img.srcset = imgItem.srcset;
            img.alt = imgItem.alt;
            img.dataset.category = imgItem.dataset.category;
            img.dataset.galleryTag = imgItem.dataset.galleryTag;

        // Close modal with image
        img.addEventListener('click', event => {
            modalBackdrop.remove();
            modalBody.remove();
        });
            modalBody.removeChild(modalBody.childNodes[1]);
            modalBody.insertBefore(img, modalBody.childNodes[1]);
    };
};

/**
 * 
 * Create the previous button of the modal
 * 
 * @param Node, modalBody, the node related to the modal
 */
function previousButton(modalBody) {
    let previousButton = document.createElement('span');
        previousButton.classList.add('previous-button-to-img');
        previousButton.classList.add('button-to-img');
        previousButton.textContent = '<';

        previousButton.addEventListener('click', event => {
            if (array.length == 0) {
                previousImage(modalBody);
            };
            if (array.length > 0) {
                previousFilterImage(modalBody);
            };
        });

        modalBody.appendChild(previousButton);
};

/**
 * 
 * Create the next button of the modal
 * 
 * @param Node, modalBody, the node related to the modal
 */
function nextButton(modalBody) {
    let nextButton = document.createElement('span');
        nextButton.classList.add('next-button-to-img');
        nextButton.classList.add('button-to-img');
        nextButton.textContent = '>';
        nextButton.addEventListener('click', event => {
            if (array.length == 0) {
                nextImage(modalBody);
            };
            if (array.length > 0) {
                nextFilterImage(modalBody);
            };
        });

        modalBody.appendChild(nextButton);
};

/**
 * 
 * Setup how the previous button of the modal works
 * 
 * @param Node, modalBody, the node related to the modal
 */
function previousImage(modalBody) {
    let imgItems = document.querySelectorAll('.gallery-item');
    let modalImg = document.querySelector('.modal-img');

    imgItems.forEach(imgItem => {
        if (imgItem.dataset.category == Number(modalBody.childNodes[1].dataset.category)-1 &&
            modalImg.dataset.category == Number(modalBody.childNodes[1].dataset.category))
        {
            createModalImg(modalBody, imgItem);
        };
    });
};

/**
 * 
 * Setup how the next button of the modal works
 * 
 * @param Node, modalBody, the node related to the modal
 */
function nextImage(modalBody) {
    let imgItems = document.querySelectorAll('.gallery-item');
    let modalImg = document.querySelector('.modal-img');

    imgItems.forEach(imgItem => {
        if (imgItem.dataset.category == Number(modalBody.childNodes[1].dataset.category)+1 &&
            modalImg.dataset.category == Number(modalBody.childNodes[1].dataset.category))
        {
            createModalImg(modalBody, imgItem);
        };
    });
};

/**
 * Add a listener to gallery's filters
 * 
 * @param Object, Array
 */
function filtersListeners(array) {
    document.body.addEventListener('click', event => {
        if (event.target.matches('.nav-link')) {
            let navLink = document.querySelectorAll('.nav-link');
            navLink.forEach(link => {
                link.classList.remove('current');
            });
            array.length = 0;
            event.target.classList.add('current');
            let imgItems = document.querySelectorAll('.gallery-item');
            
            imgItems.forEach(imgItem => {
                if (imgItem.dataset.galleryTag == event.target.textContent) {
                    array.push(imgItem);
                };
            });
        };
    });
};

/**
 * 
 * Filters an array for the next image
 * 
 * @param Node, modalBody 
 */
function nextFilterImage(modalBody) {
    let nextFilterImage = array.find((element) => element.dataset.category > modalBody.childNodes[1].dataset.category &&
        element.dataset.galleryTag == modalBody.childNodes[1].dataset.galleryTag);
    createModalImg(modalBody, nextFilterImage);
};

/**
 * 
 * Filters an array for the previous image
 * 
 * @param node, modalBody 
 */
function previousFilterImage(modalBody) {
    // Create filtered array from array
    let previousFilterImage = null;
    let previousFilteredArray = array.filter((element) => Math.max(element.dataset.category) < modalBody.childNodes[1].dataset.category &&
    element.dataset.galleryTag == modalBody.childNodes[1].dataset.galleryTag);
    
    // filters array for previous image
    previousFilteredArray.forEach(item => {
        if (Math.max(item.dataset.category) < modalBody.childNodes[1].dataset.category) {
            previousFilterImage = item;
        };
    });

    createModalImg(modalBody, previousFilterImage);
};


// Add an data category attribute to gallery's images
dataCategories();

// Create a modal for gallery's images
createModal();

let array = [];
filtersListeners(array);
