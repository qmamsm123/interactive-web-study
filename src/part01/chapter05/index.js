document.addEventListener("mousemove", (e) => {
  const cursorDefaultInner = document.querySelector(".cursor__default__inner");
  cursorDefaultInner.style.top = e.clientY + "px";
  cursorDefaultInner.style.left = e.clientX + "px";

  const cursorTraceInner = document.querySelector(".cursor__trace__inner");
  cursorTraceInner.style.top = e.clientY + "px";
  cursorTraceInner.style.left = e.clientX + "px";
})

const cursor = document.querySelector(".cursor");

document.addEventListener("mousedown", (e) => {
  cursor.classList.add("cursor--active");
})

document.addEventListener("mouseup", (e) => {
  cursor.classList.remove("cursor--active");
})

function createRipple(e) {
  const ripple = document.createElement("span");
  
  ripple.classList.add("ripple");
  
  cursor.appendChild(ripple);
  
  ripple.style.top = (e.clientY - ripple.clientHeight / 2) + "px";
  ripple.style.left = (e.clientX - ripple.clientWidth / 2)+ "px";

  ripple.addEventListener("animationend", () => {
    ripple.remove();
  })
}

document.addEventListener("click", createRipple);

const preloaderBtn = document.querySelector(".preloader__btn");
const preloaderBtnHold = document.querySelector(".preloader__btn_hold");

let intervalId = null;
let scale = 1;

const preloaderHideThreshold = 18;

function clearPreviosInterval() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function setPreloaderStyle(scale) {
  preloaderBtn.style.transform = `scale(${scale})`;
  preloaderBtnHold.style.opacity = `${1 - (scale - 1) / preloaderHideThreshold}`;
}

preloaderBtn.addEventListener("mousedown", (e) => {
  clearPreviosInterval();
  intervalId = setInterval(() => {
    scale += 0.175;
    setPreloaderStyle(scale);
    if (scale >= 1 +  preloaderHideThreshold) {
      const header = document.querySelector(".header");
      const preloader = document.querySelector(".preloader");
      const poster = document.querySelector(".poster");
      header.classList.remove("hidden-area");
      header.classList.add("shown-area");
      preloader.classList.remove("shown-area");
      preloader.classList.add("hidden-area");
      poster.classList.remove("hidden-area");
      poster.classList.add("shown-area");
      clearPreviosInterval();
    }
  }, 10);
})

preloaderBtn.addEventListener("mouseup", (e) => {
  clearPreviosInterval();
  intervalId = setInterval(() => {
    scale -= 0.175;
    setPreloaderStyle(scale);
    if (scale < 1) {
      scale = 1;
      clearInterval(intervalId);
      intervalId = null;
    }
  }, 10);
})