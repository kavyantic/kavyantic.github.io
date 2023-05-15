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
    xy: [defaultNavX, defaultNavY],
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
      moveApi.start({ to: { xy: [e.clientX, e.clientY] } });
      !moving && setMoving(true);
    },
    [moveApi, moving, setMoving]
  );

  useEffect(() => {
    const handleResize = (e: UIEvent):void => {
      defaultNavY = window.innerHeight - 100;
      defaultNavX = window.innerWidth / 2;
      moveApi({to:{xy:[defaultNavX,defaultNavY]}})
    };
    window.addEventListener("resize", handleResize);
  }, [moveApi]);

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
          moveApi({ to: { xy: [defaultNavX, defaultNavY] } });
        }, 100);
      }
    }
  }, [toggle, moving]);

  useEffect(() => {
    if (listener?.current) {
      if (listen) {
        listener.current.addEventListener("mousemove", listenMouseEvent);
        listener.current.onmouseup = (ev) => {
          setMoving(false);
          setListen(false);
          // moveApi.start(getNearestNavStack(moveApi.current[0].get()));
          // moveApi.start({ to: { left: NaN } });
        };
      } else {
        listener.current.removeEventListener("mousemove", listenMouseEvent);
        listener.current.onmouseup = null;
      }
    }
    return () => {
      // cleaning up all listeners before adding another
      if (listen && listener?.current) {
        listener.current.removeEventListener("mousemove", listenMouseEvent);
      }
    };
  }, [listen]);

  useEffect(() => {
    if (navRef.current) {
      navRef.current.onclick = () => toggle((_) => !_);
    }
  }, [toggle]);

  return (
    <animated.div
      className={"bg-secondry flex items-center justify-center"}
      ref={navRef}
      onMouseDown={(e) => {
        console.log("mouse down event");

        const { width, height, ...rects } =
          e.currentTarget.getBoundingClientRect();
        setNavRects({ width, height });

        setListen(true);
        e.preventDefault();
        e.stopPropagation();
        return;
      }}
      onMouseUp={(e) => console.log("mouse up")}
      // className={"navigator"}
      style={{
        height: 80,
        borderRadius: 8,
        ...springs,
        position: "absolute",
        top: 0,
        left: 0,
        // I might have map these values to l,r,b,t manually by setting 'none' when falsy value other then 0
        transform: movementSpring.xy.to(trans),
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
                borderRadius:2,
                transform: e.scale.to((v) => `scale(${v})`),
              }}
            />
          );
        })}
      </div>
    </animated.div>
  );
}
