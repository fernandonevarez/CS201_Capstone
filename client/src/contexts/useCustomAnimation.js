const fadeUp = document.querySelector(".fade-up");

//  use intersection observer to make an element fade up

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0,
};

const fadeUpObserver = new IntersectionObserver((entries) => {
  // entries.forEach((entry) => {
  //   if (entry.isIntersecting) {
  //     entry.target.classList.add('fade-up-active');
  //   }
  // });

  console.log(entries);
}, options);
