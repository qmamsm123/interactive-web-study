const header = document.querySelector(".header");

header.addEventListener("mousemove", (e) => {
  const xRlativeToHeader = e.clientX / header.clientWidth;
  const yRlativeToHeader = e.clientY / header.clientHeight;

  document.querySelector(".header__title").style.transform = `translate(${xRlativeToHeader * -50}px, ${yRlativeToHeader * -50}px)`;
  document.querySelector("#circle-1").style.transform = `translate(${xRlativeToHeader * -25}px, ${yRlativeToHeader * -25}px)`;
  document.querySelector("#circle-2").style.transform = `translate(${xRlativeToHeader * 25}px, ${yRlativeToHeader * 25}px)`;
  document.querySelector("#cube__image_1").style.transform = `translate(${xRlativeToHeader * -15}px, ${yRlativeToHeader * -15}px)`;
  document.querySelector("#cube__image_2").style.transform = `translate(${xRlativeToHeader * -8}px, ${yRlativeToHeader * -8}px)`;
  document.querySelector("#cube__image_3").style.transform = `translate(${xRlativeToHeader * -20}px, ${yRlativeToHeader * -20}px)`;
  document.querySelector("#cube__image_4").style.transform = `translate(${xRlativeToHeader * 5}px, ${yRlativeToHeader * 5}px)`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("poster-image_state_visible");
    } else {
      entry.target.classList.remove("shown-area");
    }
  })
}, { threshold: 0.2 });

document.querySelectorAll(".poster-image_wrapper").forEach((posterImage) => {
  observer.observe(posterImage);
});

const posterParallax = document.querySelector(".poster__parallax");
posterParallax.addEventListener("mousemove", (e) => {
  const xRlativeToPosterParallax = e.clientX / posterParallax.clientWidth;
  const yRlativeToPosterParallax = e.clientY / posterParallax.clientHeight;

  document.querySelector("#poster-image_wrapper_2").style.transform = `translate(${xRlativeToPosterParallax * -40}px, ${yRlativeToPosterParallax * -40}px)`;
  document.querySelector("#poster-image_wrapper_3").style.transform = `translate(${xRlativeToPosterParallax * 40}px, ${yRlativeToPosterParallax * 40}px)`;
});