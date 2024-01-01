import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import useMeasure from "react-use-measure";
import { useTrail, animated, useSpring } from "@react-spring/web";
const isWeb = typeof window == "object";
var defaultNavY = isWeb ? window.innerHeight - 100 : 0;
var defaultNavX = isWeb ? window.innerWidth / 2 : 0;

const trans = (x: number, y: number) =>
  `translate3d(${x}px,${y}px,0) ` + `translate3d(-${x && 50}%,-${y && 50}%,0)`;

export default function Cursor({
  listener,
}: {
  listener: RefObject<HTMLDivElement>;
}) {
  const [movementSprings, moveApi] = useTrail(2, (i) => ({
    xy: [defaultNavX, defaultNavY],
    config: i
      ? { tension: 300, friction: 35 }
      : { tension: 1500, friction: 40 },
  }));

  const listenMouseEvent = useCallback<(event: MouseEvent) => void>(
    (e) => {
      moveApi.start({ to: { xy: [e.clientX, e.clientY] } });
    },
    [moveApi]
  );
  useEffect(() => {
    var ele: HTMLDivElement;
    if (listener?.current) {
      ele = listener.current;
      ele.addEventListener("mousemove", listenMouseEvent);
    }
    return () => {
      // cleaning up all listeners before adding another
      if (ele) {
        ele.removeEventListener("mousemove", listenMouseEvent);
      }
    };
  }, [listenMouseEvent, listener]);

  return (
    <>
      <animated.div
        className="pointer-events-none cursor-ring z-50"
        style={{
          height: 40,
          width: 40,
          border: "2px solid gray",
          borderRadius: "50%",
          position: "fixed",
          top: 0,
          left: 0,
          // I might have map these values to l,r,b,t manually by setting 'none' when falsy value other then 0
          transform: movementSprings[1].xy.to(trans),
        }}
      />
      {/* <animated.div
        className={
          "cursor flex items-center justify-center pointer-events-none z-50"
        }
        // className={"navigator"}
        style={{
          height: 20,
          width: 20,
          position: "fixed",
          borderRadius: 50,
          top: 0,
          left: 0,
          // I might have map these values to l,r,b,t manually by setting 'none' when falsy value other then 0
          transform: movementSprings[0].xy.to(trans),
        }}
      /> */}
      {/* {movementSprings
        .filter((_, i) => i > 1)
        .map((e,i) => (
          <animated.div
            className="pointer-events-none"
            style={{
              height: 40+i*2,
              width: 40+i*2,
              border: "2px solid gray",
              borderRadius: "50%",
              position: "fixed",
              top: 0,
              left: 0,

              // I might have map these values to l,r,b,t manually by setting 'none' when falsy value other then 0
              transform: e.xy.to(trans),
            }}
          />
        ))} */}
    </>
  );
}
