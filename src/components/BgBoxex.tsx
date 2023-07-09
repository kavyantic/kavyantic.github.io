import {
  useTrail,
  animated,
  useSpring,
  config,
  Interpolation,
} from "@react-spring/web";
import { Router, useRouter } from "next/router";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { useReducer } from "react";

// interface Element {
//   value: string;
//   speed: number;
//   left: number;
//   trail: number;
// }
// //Create a funciton to add two number

// interface State {
//   data: (Element | null)[];
// }

// type Action =
//   | { type: "ADD"; payload: Element }
//   | { type: "REMOVE"; payload: number };

// var utfStart = 10016;
// function reducer(state: State, action: Action): State {
//   switch (action.type) {
//     case "ADD":
//       if (state.data.length < 15) {
//         return {
//           ...state,
//           data: [...state.data, action.payload],
//         };
//       }
//       return state;

//     case "REMOVE":
//       // return {
//       //   ...state,
//       //   data: state.data.filter((_, index) => index !== action.payload),
//       // };
//       state.data.splice(action.payload, 1);
//       return state;
//     default:
//       //@ts-ignore
//       throw new Error(`Unhandled action type: ${action.type}`);
//   }
// }
// const trans = (x: number, y: number) => `translate3d(${x}px,${y}px,0) `;

// export function BgBoxex(props: {
//   defaults: { left: number; top: number };
// }): JSX.Element {
//   const [elements, dispatchElements] = useReducer(reducer, {
//     data: [
//       // { value: "✥", speed: 10, left: 100 }
//     ],
//   });
//   const router = useRouter();

//   const [translateTrails, transTrailApi] = useTrail(3, (i) => {
//     return {
//       xy: [0, 0],
//       config: { friction: 50 },
//     };
//   });
//   const [blur, setBlur] = useState(false);
//   useEffect(() => {
//     const listener = () => {
//       setBlur(true);

//       transTrailApi.start((v) => ({
//         to: {
//           xy: Math.random() * 2 <= 1 ? [100, -100] : [0, 0],
//         },
//       }));
//     };
//     const endListener = () => {
//       setTimeout(() => setBlur(false), 800);
//     };

//     router.events.on("routeChangeComplete", endListener);
//     router.events.on("beforeHistoryChange", listener);

//     var int = setInterval(() => {
//       var rand = Math.floor(Math.random() * 40);

//       var speed = Math.floor(Math.random() * 30);
//       dispatchElements({
//         type: "ADD",
//         payload: {
//           speed,
//           trail: rand % 3,
//           value: String.fromCharCode(rand + utfStart),
//           left: Math.random() * window.innerWidth,
//         },
//       });
//     }, 3000);
//     return () => {
//       clearInterval(int);
//       router.events.off("beforeHistoryChange", listener);
//       router.events.off("routeChangeComplete", endListener);
//     };
//   }, [transTrailApi, setBlur, dispatchElements, router.events]);

//   return (
//     <>
//       <div
//         className={
//           "w-screen h-screen  fixed top-0 left-0 transition-all duration-500 " +
//           (blur ? " self-blur-200   " : " ")
//         }
//       >
//         {elements.data.map((e, i) => {
//           return (
//             e && (
//               <DrownElement
//                 translate={translateTrails[e.trail].xy.to(trans)}
//                 key={i}
//                 speed={e.speed}
//                 left={e.left}
//                 pause={blur}
//                 remove={() => {
//                   dispatchElements({ type: "REMOVE", payload: i });
//                   console.log("removed myself");
//                 }}
//               >
//                 {e.value}
//               </DrownElement>
//             )
//           );
//         })}
//       </div>
//     </>
//   );
// }

// const DrownElement = (
//   props: PropsWithChildren<{
//     speed: number;
//     remove: () => void;
//     left: number;
//     translate: Interpolation<number[], string>;
//     pause: boolean;
//   }>
// ) => {
//   const spring = useSpring({
//     from: { top: 0, left: props.left },
//     to: { top: typeof window != "undefined" ? window.innerHeight : 100 },
//     // config: { mass: 10  , friction: 1000, tensition: 10 },
//     pause: props.pause,
//     config: { tension: 1 + props.speed, friction: 10 },
//     // reverse:true
//   });
//   useEffect(() => {
//     var tm = setTimeout(props.remove, 5000);
//     return () => clearTimeout(tm);
//   }, [props.remove]);
//   return (
//     <>
//       <animated.div
//         className="absolute text-4xl"
//         style={{ ...spring, transform: props.translate }}
//       >
//         {props.children}
//       </animated.div>
//     </>
//   );
// };

//Create a funciton to add two number

export function BgBoxex(props: {
  defaults: { left: number; top: number };
}): JSX.Element {
  const [boxTrails, boxTrailsApi] = useTrail(6, (i, b) => {
    var power = i * 4;
    return {
      left: props.defaults.left,
      top: props.defaults.top,
      width: 40,
      height: 40,
      config: { mass: 10 + power, friction: 50 + power, tension: 400 },
    };
  });
  const range = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  useEffect(() => {
    range.current = {
      x: document.body.clientWidth,
      y: window.innerHeight,
    };
    // function onScroll(e: any) {
    //   range.current.y = range.current.y + window.scrollY;
    //   range.current.x = range.current.x + window.scrollX;
    // }

    // window.addEventListener("scroll", onScroll);
    // return () => window.removeEventListener("scroll", onScroll);
  }, [boxTrailsApi]);
  useEffect(() => {
    var tm: any;
    var int = setInterval(() => {
      var rand = Math.floor(Math.random() * 4000);
      if (rand < 1000) {
        boxTrailsApi.start({ width: 10, height: 10 });
      } else if (rand < 2000) {
        boxTrailsApi.start({ width: 70, height: 70 });
      } else if (rand < 3000) {
        boxTrailsApi.start({ width: 60, height: 60 });
      } else {
        boxTrailsApi.start({ width: 100, height: 100 });
      }

      clearTimeout(tm);
      var randX = Math.random() * 500 - Math.random() * 500;
      var randY = Math.random() * 500 - Math.random() * 500;

      tm = setTimeout(() => {
        boxTrailsApi.start((v, controller) => {
          const current = controller.get();

          var moveX = randX + current.left;
          var moveY = randY + current.top;
          moveX =
            moveX > range.current.x || moveX < window.scrollX
              ? current.left
              : moveX;

          moveY =
            moveY > range.current.y || moveY < window.screenY
              ? current.top
              : moveY;

          return { left: moveX, top: moveY };
        });
      }, rand);
    }, 2000);
    return () => {
      clearInterval(int);
    };
  }, [boxTrailsApi]);
  return (
    <>
      <div className="w-screen h-screen  fixed top-0 left-0 self-blur-100 ">
        {boxTrails.map((props, key) => (
          <animated.div
            key={key}
            className="border-2 border-accent rounded-md fixed self-blur "
            style={props}
          ></animated.div>
        ))}
      </div>
    </>
  );
}
