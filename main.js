// ========== Custom Cursor ==========
const circleElement = document.querySelector('.circle');

// Create objects to track mouse position and custom cursor position
const mouse = { x: 0, y: 0 }; // Track current mouse position
const previousMouse = { x: 0, y: 0 } // Store the previous mouse position
const circle = { x: 0, y: 0 }; // Track the circle position

// Initialize variables to track scaling and rotation
let currentScale = 0; // Track current scale value
let currentAngle = 0; // Track current angle value

// Update mouse position on the 'mousemove' event
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

// Smoothing factor for cursor movement speed (0 = smoother, 1 = instant)
const speed = 0.17;

// Start animation
const tick = () => {
    // MOVE
    // Calculate circle movement based on mouse position and smoothing
    circle.x += (mouse.x - circle.x) * speed;
    circle.y += (mouse.y - circle.y) * speed;
    // Create a transformation string for cursor translation
    const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

    // SQUEEZE
    // 1. Calculate the change in mouse position (deltaMouse)
    const deltaMouseX = mouse.x - previousMouse.x;
    const deltaMouseY = mouse.y - previousMouse.y;
    // Update previous mouse position for the next frame
    previousMouse.x = mouse.x;
    previousMouse.y = mouse.y;
    // 2. Calculate mouse velocity using Pythagorean theorem and adjust speed
    const mouseVelocity = Math.min(Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4, 150);
    // 3. Convert mouse velocity to a value in the range [0, 0.5]
    const scaleValue = (mouseVelocity / 150) * 0.5;
    // 4. Smoothly update the current scale
    currentScale += (scaleValue - currentScale) * speed;
    // 5. Create a transformation string for scaling
    const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

    // ROTATE
    // 1. Calculate the angle using the atan2 function
    const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;
    // 2. Check for a threshold to reduce shakiness at low mouse velocity
    if (mouseVelocity > 20) {
        currentAngle = angle;
    }
    // 3. Create a transformation string for rotation
    const rotateTransform = `rotate(${currentAngle}deg)`;

    // Apply all transformations to the circle element in a specific order: translate -> rotate -> scale
    circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;

    // Request the next frame to continue the animation
    window.requestAnimationFrame(tick);
}
// Start the animation loop
tick();

// ========== Back to Top Code ==========
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 300) {
        document.getElementById("backToTopBtn").style.display = "block";
    } else {
        document.getElementById("backToTopBtn").style.display = "none";
    }
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}



// ========== Navigation Burger Links Code ==========
var burgerButton;
const burgerLinks = document.querySelector('.burger-links');
const burger = document.querySelector('.burger');
const body = document.querySelector('body');

burgerButton = function () {
    burgerLinks.classList.toggle('active');
    burger.classList.toggle('active');
    body.classList.toggle('active');
}

// ========== Theme Changer Code ==========
var donen = document.querySelector(":root");
function onOff() {
    if (document.getElementsByClassName("d-right")[0]) {
        document
            .getElementsByClassName("clickOnOrOff")[0]
            .classList.remove("d-right");
        donen.style.setProperty("--secondary-color", "#fff");
        donen.style.setProperty("--main-color", "#000");
    } else {
        document.getElementsByClassName("clickOnOrOff")[0].classList.add("d-right");
        donen.style.setProperty("--secondary-color", "#000");
        donen.style.setProperty("--main-color", "#fff");
    }
}


// ========== Marquee Code ==========
const root = document.documentElement;
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
const marqueeContent = document.querySelector("ul.marquee-content");

root.style.setProperty("--marquee-elements", marqueeContent.children.length);

for (let i = 0; i < marqueeElementsDisplayed; i++) {
    marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}

// ========== FAQs Code ==========
function toggleIcon(expandIconPlus, expandIconMinus, isOpen) {
    if (isOpen) {
        expandIconPlus.style.display = 'none';
        expandIconMinus.style.display = 'block';
    } else {
        expandIconPlus.style.display = 'block';
        expandIconMinus.style.display = 'none';
    }
}

function createAccordion(el) {
    let animation = null;
    let isClosing = false;
    let isExpanding = false;
    const summary = el.querySelector('summary');
    const content = el.querySelector('.faq-content');
    const expandIconPlus = summary.querySelector('.icon-tabler-circle-plus');
    const expandIconMinus = summary.querySelector('.icon-tabler-circle-minus');

    function onClick(e) {
        e.preventDefault();
        el.style.overflow = 'hidden';
        if (isClosing || !el.open) {
            open();
        } else if (isExpanding || el.open) {
            shrink();
        }
    }

    function shrink() {
        isClosing = true;
        const startHeight = `${el.offsetHeight}px`;
        const endHeight = `${summary.offsetHeight}px`;
        if (animation) {
            animation.cancel();
        }
        animation = el.animate({
            height: [startHeight, endHeight]
        }, {
            duration: 400,
            easing: 'ease-out'
        });
        animation.onfinish = () => {
            toggleIcon(expandIconPlus, expandIconMinus, false);
            onAnimationFinish(false);
        };
        animation.oncancel = () => {
            toggleIcon(expandIconPlus, expandIconMinus, false);
            isClosing = false;
        };
    }

    function open() {
        el.style.height = `${el.offsetHeight}px`;
        el.open = true;
        window.requestAnimationFrame(expand);
    }

    function expand() {
        isExpanding = true;
        const startHeight = `${el.offsetHeight}px`;
        const endHeight = `${summary.offsetHeight + content.offsetHeight}px`;
        if (animation) {
            animation.cancel();
        }
        animation = el.animate({
            height: [startHeight, endHeight]
        }, {
            duration: 350,
            easing: 'ease-out'
        });
        animation.onfinish = () => {
            toggleIcon(expandIconPlus, expandIconMinus, true);
            onAnimationFinish(true);
        };
        animation.oncancel = () => {
            toggleIcon(expandIconPlus, expandIconMinus, true);
            isExpanding = false;
        };
    }

    function onAnimationFinish(open) {
        el.open = open;
        animation = null;
        isClosing = false;
        isExpanding = false;
        el.style.height = el.style.overflow = '';
    }

    summary.addEventListener('click', onClick);
}
document.querySelectorAll('details').forEach(createAccordion);

// Testimonials Sections Starts Here
const testimonialsContainer = document.querySelector(".testimonials-container");
const testimonial = document.querySelector(".testimonial");
const userImage = document.querySelector(".user-image");
const username = document.querySelector(".username");
const role = document.querySelector(".role");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const progressDots = document.getElementById("progress-dots");

const testimonials = [
  {
    name: "Zafar Khan",
    position: "Professor",
    photo: "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
    text:
      "I'm fully satisfied are you with the overall performance of the chatbot. Yes,  the chatbot adequately addressed questions or concerns related to mining and I was able to easily navigate and interact with the chatbot on the website"
  },
  {
    name: "Ansari Zoha",
    position: "End-User",
    photo: "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
    text:
      "Personalizing chatbot interactions is a powerful way to improve the user experience by providing users with personalized responses, conversation flow and options that are relevant and interesting to them."
  },
  {
    name: "Dr. Haya Shadab Usmani",
    position: "End-User",
    photo: "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
    text:
      "I'm fully satisfied are you with the overall performance of the chatbot and I was able to easily navigate and interact with the chatbot on the website"
  },
  {
    name: "Aakash Yadav",
    position: "End-User",
    photo:
      "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
    text:
      "Yes,  the chatbot adequately addressed questions or concerns related to mining and I was able to easily navigate and interact with the chatbot on the website"
  }
];

let idx = 0;

testimonials.forEach((testimonial) => {
  const dot = document.createElement("div");
  dot.classList.add("progress-dot");
  progressDots.appendChild(dot);
});

function displayTestimonial() {
  const { name, position, photo, text } = testimonials[idx];

  testimonial.innerHTML = text;
  userImage.src = photo;
  username.innerHTML = name;
  role.innerHTML = position;

  updateProgressDots();
}

function updateProgressDots() {
  const dots = progressDots.children;
  [...dots].forEach((dot) => {
    dot.classList.remove("active");
  });
  dots[idx].classList.add("active");
}

btnNext.addEventListener("click", () => {
  idx === testimonials.length - 1 ? (idx = 0) : idx++;
  console.log(idx);

  displayTestimonial();
});

btnPrev.addEventListener("click", () => {
  idx === 0 ? (idx = testimonials.length - 1) : idx--;
  console.log(idx);

  displayTestimonial();
});

displayTestimonial();
