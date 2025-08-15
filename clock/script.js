// Smooth analog clock
// Select hand elements
const hourHand = document.querySelector('.hour');
const minuteHand = document.querySelector('.minute');
const secondHand = document.querySelector('.second');

function updateClock() {
  const now = new Date();
  const ms = now.getMilliseconds();
  const seconds = now.getSeconds() + ms / 1000;
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;

  const secondDeg = seconds * 6; // 360/60
  const minuteDeg = minutes * 6; // 360/60
  const hourDeg = hours * 30;    // 360/12

  // apply rotation (keeping the translate used in CSS)
  hourHand.style.transform = `translateX(-50%) translateY(-100%) rotate(${hourDeg}deg)`;
  minuteHand.style.transform = `translateX(-50%) translateY(-100%) rotate(${minuteDeg}deg)`;
  secondHand.style.transform = `translateX(-50%) translateY(-100%) rotate(${secondDeg}deg)`;
}

// Use requestAnimationFrame for smooth updates when allowed
let running = true;
function tick() {
  if (!running) return;
  updateClock();
  requestAnimationFrame(tick);
}

// Pause animation if user prefers reduced motion
const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
if (mq.matches) {
  running = false;
  updateClock();
} else {
  tick();
}

// Observe changes to the preference
mq.addEventListener && mq.addEventListener('change', () => {
  if (mq.matches) {
    running = false;
    updateClock();
  } else {
    if (!running) {
      running = true;
      tick();
    }
  }
});
