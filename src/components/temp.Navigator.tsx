// This navigator works with inset or absolute positioning from right and top 


import React, {
    RefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
  } from "react";
  import useMeasure from "react-use-measure";
  import { useTrail, animated, useSpring } from "@react-spring/web";

  import styles from "./styles.module.css";
  import { useRouter } from "next/router";
  
  const fast = { tension: 1200, friction: 40 };
  const slow = { mass: 10, tension: 200, friction: 50 };
  
  const trans = (x: number, y: number) =>
    `translate3d(${x}px,${y}px,0) ` + `translate3d(-${x && 50}%,-${y && 150}%,0)`;
  
  const transAbs = (abs: number | null, ...arg: (number | null)[]) => {
    if (Number.isInteger(abs)) {
      return `${abs}px`;
    }
    return "auto";
  };
  
  // export default function NavigatorMenu({
  //   listener,
  // }: {
  //   listener: RefObject<HTMLDivElement>;
  // }) {
  
  //   const router = useRouter()
  //   const navRef = useRef<HTMLDivElement>(null);
  //   const [open, toggle] = useState(false);
  //   const [moving, setMoving] = useState<boolean>(false);
  //   //  This state is used to preserve cursor mouseDown position on nav hold movement
  //   const [cursorPos, setCursorPos] = useState<{ top: number; left: number }>({
  //     top: 0,
  //     left: 0,
  //   });
  //   const springs = useSpring({
  //     width: open ? 400 : 80,
  //     // transform: moving ? "translate3d(-50%,-50%,0)" : "translate3d(-0%,-0%,0)",
  //     config: { mass: 1, tension: 150, friction: 10 },
  //   });
  
  //   const [movementSpring, moveApi] = useSpring<{
  //     xy: number[];
  //     abs: (number | null)[];
  //   }>(() => ({
  //     xy: [0, 0],
  //     abs: [null, null, null, null],
  //     config: { mass: 1, tension: 150, friction: 10 },
  //   }));
  
  //   const [listen, setListen] = useState<boolean>(false);
  //   const listenMouseEvent = useCallback<(event: MouseEvent) => any>(
  //     (e) => {
  //       console.log(e.clientX, e.clientY);
  //       moveApi.start({
  //         xy: [e.clientX, e.clientY],
  //       });
  //       !moving && setMoving(true);
  //     },
  //     [moveApi, moving, setMoving, cursorPos]
  //   );
  
  //   useEffect(() => {
  //     if (listener?.current) {
  //       if (listen) {
  //         listener.current.onmousemove = listenMouseEvent;
  //         listener.current.onmouseup = (ev) => {
  //           setMoving(false);
  //           setListen(false);
  //           // moveApi.start(getNearestNavStack(moveApi.current[0].get()));
  //           if (!listener?.current) return;
  //           const rects = navRef.current?.getBoundingClientRect();
  //           const lsRects = listener.current.getBoundingClientRect();
  //           if (!rects || !lsRects) return;
  //           const xy = movementSpring.xy.toJSON();
  //           // moveApi.start({
  //           //   from: { xy },
  //           //   to: { xy: [lsRects.width-rects.width-10,lsRects.height-rects.height-80]},
  //           //   // onResolve(result, ctrl, item) {
  
  //           //   //   moveApi.start({
  //           //   //     to: { xy: [0,0], abs: [10, 10, null, null] },
  //           //   //     config:{
  //           //   //       mass:0,
  //           //   //       tension:0,
  //           //   //       friction:0
  //           //   //     }
  //           //   //   });
  //           //   // },
  //           // });
  
  //           // moveApi.start({xy:[-10,-10]})
  //           // moveApi.start({ re });
  //           // moveApi.start({
  //           //   from: {
  //           //     left: movementSpring.left,
  //           //     right: movementSpring.left.toJSON() + rects.width,
  //           //   },
  //           //   to: { right: 10, left: measurements. },
  //           // });
  //         };
  //       } else {
  //         listener.current.onmousemove = null;
  //         listener.current.onmouseup = null;
  //       }
  //     }
  //   }, [listen]);
  
  //   useEffect(() => {
  //     if (navRef.current) {
  //       if (moving) {
  //         console.log("event removed");
  //         navRef.current.onclick = null;
  //       } else {
  //         console.log("event added again");
  //         setTimeout(() => {
  //           if (navRef.current) navRef.current.onclick = () => toggle((_) => !_);
  //         }, 100);
  //       }
  //     }
  //   }, [toggle, moving]);
  
  //   return (
  //     <animated.div
  //       ref={navRef}
  //       className={'bg-secondry shadow-2xl'}
  //       onMouseDown={(e) => {
  //         if (navRef.current && listener.current) {
  //           var navRects = navRef.current.getBoundingClientRect();
  //           setListen(true);
  //           // toggle(false)
  //           setCursorPos({
  //             left: e.clientX - navRects.x,
  //             top: e.clientY - navRects.y,
  //           });
  //         }
  //         e.preventDefault();
  //         e.stopPropagation();
  //         return;
  //       }}
  //       onMouseUp={(e) => console.log("mouse up")}
  //       // className={"navigator"}
  //       style={{
  //         backdropFilter: "blur(10px)",
  
  //         position: "fixed",
  //         bottom:20,
  //         height: 80,
  //         borderRadius: 8,
  //         ...springs,
  //         // I might have map these values to l,r,b,t manually by setting 'none' when falsy value other then 0
  //         // transform: movementSpring.xy.to(trans),
  //         // right: movementSpring.abs.to(transAbs),
  //       }}
  //     />
  //   );
  // }
  
  const transInset = (t: number, r: number, b: number, l: number) => {
    return `${t}px ${r}px ${b}px ${l}px`;
  };
  
  export default function NavigatorMenu({
    listener,
  }: {
    listener: RefObject<HTMLDivElement>;
  }) {
    const navRef = useRef<HTMLDivElement>(null);
    const [open, toggle] = useState(false);
    const [moving, setMoving] = useState<boolean>(false);
    const [navRects, setNavRects] = useState<{ width: number; height: number }>({
      width: 0,
      height: 0,
    });
    const springs = useSpring({
      width: open ? 400 : 80,
      // transform: moving ? "translate3d(-50%,-50%,0)" : "translate3d(-0%,-0%,0)",
      config: { mass: 1, tension: 150, friction: 10 },
    });
  
    const [movementSpring, moveApi] = useSpring(() => ({
      inset: [0, 10, 10, 0],
      config: { mass: 1, tension: 150, friction: 10 },
    }));
  
    const [trailsBox, startTrailBox] = useTrail(9, () => ({
      from: {
        scale: 0,
      },
      to: {
        scale: 1,
      },
      config: { mass: 0.5, tension: 200, friction: 10 },
    }));
  
    const [listen, setListen] = useState<boolean>(false);
    const listenMouseEvent = useCallback<(event: MouseEvent) => any>(
      (e) => {
        moveApi.start({ to: { inset: [e.clientY, 0, 0, e.clientX] } });
        !moving && setMoving(true);
      },
      [moveApi, moving, setMoving]
    );
  
    useEffect(() => {
      if (navRef.current) {
        if (moving) {
          navRef.current.onclick = null;
        } else {
          setTimeout(() => {
            if (navRef.current)
              navRef.current.onclick = () => {
                toggle((_) => !_);
                startTrailBox({ reverse: true });
              };
          }, 100);
        }
      }
    }, [toggle, moving]);
  
    useEffect(() => {
      if (listener?.current) {
        if (listen) {
          listener.current.onmousemove = listenMouseEvent;
          listener.current.onmouseup = (ev) => {
            setMoving(false);
            setListen(false);
            // moveApi.start(getNearestNavStack(moveApi.current[0].get()));
            // moveApi.start({ to: { left: NaN } });
          };
        } else {
          listener.current.onmousemove = null;
          listener.current.onmouseup = null;
        }
      }
    }, [listen]);
  
    useEffect(() => {
      if (navRef.current) {
        navRef.current.onclick = () => toggle((_) => !_);
      }
    }, [toggle]);
  
    return (
      <animated.div
        className={"bg-secondry"}
        ref={navRef}
        onMouseDown={(e) => {
  
          const { width, height, ...rects } =
            e.currentTarget.getBoundingClientRect();
          setNavRects({ width, height });
  
          setListen(true);
          e.preventDefault();
          e.stopPropagation();
          return;
        }}
        // onMouseUp={(e) => console.log("mouse up")}
        // className={"navigator"}
        style={{
          position: "fixed",
  
          height: 80,
          borderRadius: 8,
          ...springs,
          // I might have map these values to l,r,b,t manually by setting 'none' when falsy value other then 0
          inset: movementSpring.inset.to(transInset),
        }}
      >
        <div
          className="items-center justify-between content-between p3"
          style={{
            height: 80,
            width: 80,
            display: "grid",
            padding: 10,
            gridTemplateColumns: "auto auto auto",
          }}
        >
          {trailsBox.map((e,id) => {
            return (
              <animated.div
              key={id}
                className="bg-primary"
                style={{
                  height: "2vw",
                  maxHeight: 15,
                  maxWidth: 15,
                  width: "2vw",
                  transform: e.scale.to((v) => `scale(${v})`),
                }}
              />
            );
          })}
        </div>
      </animated.div>
    );
  }
  