/**
 * This script handles core UI interactions for the website, including:
 * - Auto and manual slider functionality
 * - Toggle behavior for FAQ sections
 * - Dynamic content switching for guide cards
 * - Mobile navigation menu toggling
 * - Sticky navbar behavior on scroll
 * - Expand/collapse logic for mega menu sections
 * - Language selector dropdown toggle
 */

const sliderList = document.querySelector('.slider-list');
const faqItems = document.querySelectorAll('.faq-item');
const buttons = document.querySelectorAll('.main-btn');
const guideCards = document.querySelectorAll('.guide-card-entry');
const btnHamburger = document.querySelector('.btn-hamburger');
const mainMobile = document.querySelector('.main-navbar-mobile');
const navbarMobile = document.querySelector('.main-navbar-mobile');
const menuSections = document.querySelectorAll('.mega-menu-section');
const languageSelector = document.querySelector('.language-selector');

let currentIndex = 0;
const totalSlides = sliderList.children.length;

function goToSlide(index) {
  sliderList.style.transition = 'transform 0.5s ease-in-out';
  sliderList.style.transform = `translateX(${index * 100}vw)`;
}

function slide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  goToSlide(currentIndex);
}

let slideInterval = setInterval(slide, 8000);

document.querySelector('.arrow-right').addEventListener('click', () => {
  clearInterval(slideInterval);
  currentIndex = (currentIndex + 1) % totalSlides;
  goToSlide(currentIndex);
  slideInterval = setInterval(slide, 8000);
});

document.querySelector('.arrow-left').addEventListener('click', () => {
  clearInterval(slideInterval);
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  goToSlide(currentIndex);
  slideInterval = setInterval(slide, 8000);
});

faqItems.forEach(function(item) {
  item.addEventListener('click', function (event) {

    if (event.target !== item && event.target !== item.children[0]) return;

    const content = item.querySelector('.faq-text');
    const span = item.querySelector('span');
    const currentMaxHeight = item.style.maxHeight;

    if (content && span) {
      const totalHeight = content.scrollHeight + span.scrollHeight + 30;

      if (currentMaxHeight && parseInt(currentMaxHeight) > 45) {
        item.style.maxHeight = '45px';
      } else {
        item.style.maxHeight = totalHeight + 'px';
      }
    }
  });
});

buttons.forEach(function(btn) {
  btn.addEventListener('click', function(event) {
    const targetId = event.target.id;

    guideCards.forEach(function(box) {
      if(box.id === targetId) {
        box.style.display = 'flex';
      } else {
        box.style.display = 'none';
      }
    });

    buttons.forEach(function(b) {
      b.style.backgroundColor = '';
    });

    event.target.style.backgroundColor = '#f9a825';
  });
});

btnHamburger.addEventListener('click',function(){
  mainMobile.classList.toggle('mobile-menu--hidden');
});

window.addEventListener('scroll', function () {
  if (window.scrollY > 50) {
    navbarMobile.style.top = '0';
    navbarMobile.style.height = '100%';
  } else {
    navbarMobile.style.top = '14%';
    navbarMobile.style.height = '86%';
  }
});

menuSections.forEach(function(section) {
  section.addEventListener('click', function(event) {

    if (event.target !== section && event.target !== section.querySelector('span')) return;

    const content = section.querySelector('ul');
    const toggleElement = section.querySelector('span');

    if (!content || !toggleElement) return;

    const totalHeight = content.scrollHeight + toggleElement.scrollHeight + 30;

    if (!section.dataset.openHeight) {
      section.dataset.openHeight = totalHeight;
    }

    const currentMaxHeight = section.style.maxHeight;

    if (currentMaxHeight && parseInt(currentMaxHeight) > 60) {
      section.style.maxHeight = '60px';
    } else {
      section.style.maxHeight = section.dataset.openHeight + 'px';
    }
  });
});

languageSelector.addEventListener('click',function(){
  languageSelector.classList.toggle('active-border-bottom');
  languageSelector.children[2].classList.toggle('active-ul');
});

