// https://wowjs.uk/
// https://animate.style/

import WOW from "wow.js"
import "animate.css"

export default defineNuxtPlugin(() => {
  return {
    provide: {
      wow: () =>
        new WOW({
          animateClass: "animate__animated",
        }),
    },
  }
})
