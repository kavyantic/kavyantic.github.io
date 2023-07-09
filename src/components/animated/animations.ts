export const TIMEOUT = 300


export const fadeIn = {
  entering: {
    position: `absolute`,
    opacity: 0,
    transform: `scale(.8)`,

    // transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    // transitionDelay:'.2s'
    // transform: `translateX(50px)`,
  },
  entered:{
    // transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 1,
    transform: `scale(1)`,


    // transform: `translateX(0px)`,
  },
  exiting: {
    // transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 0,
    transform: `scale(1.2)`,


    // transform: `translateX(-50px)`,
  },
}

export const scaleOut = {
  entering: {
    position: `absolute`,
    opacity: 0,
    transform: `scale(.8)`,
  },
  entered:{
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 1,
    transform: `scale(1)`,
  },
  exiting: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 0,
    transform: `scale(2)`,
  },
}


export const transRight = {
  entering: {
    position: `fixed`,
    opacity: 0,
    top:0,
    left:0,
    // transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in`,

    transform: `translateX(-100vw)`,
  },
  entered:{
    // transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 1,
    transform: `translateX(0)`,
  },
  exiting: {
    // transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 0,
    transform: `translateX(100vw)`,
  },
}


export const transLeft = {
  entering: {
    position: `fixed`,
    top:0,
    left:0,
    opacity: 0,
    transform: `translateX(100vw)`,
  },
  entered:{
    // transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-out`,
    opacity: 1,
    transform: `translateX(0)`,
  },
  exiting: {
    // transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-out`,
    opacity: 0,
    transform: `translateX(-100vw)`,
  },
}