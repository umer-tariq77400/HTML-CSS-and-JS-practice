let slideIndex = 1;
let autoSlideTimeout; // Variable to store the timeout for auto sliding

showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  clearTimeout(autoSlideTimeout); // Clear the timeout when manually navigating
  showSlides((slideIndex += n));
  setAutoSlide(); // Restart auto sliding
}

// Thumbnail image controls
function currentSlide(n) {
  clearTimeout(autoSlideTimeout); // Clear the timeout
  showSlides((slideIndex = n));
  setAutoSlide(); // Restart auto sliding
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// Automatic slideshow
function setAutoSlide() {
  autoSlideTimeout = setTimeout(() => {
    plusSlides(1); // Go to the next slide
  }, 3000); // Change image every 3 seconds
}

// Initialize auto sliding when the page loads
document.addEventListener("DOMContentLoaded", setAutoSlide);
