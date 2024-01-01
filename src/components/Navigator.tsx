import React, {
  MouseEventHandler,
  MutableRefObject,
  RefObject,
  TouchEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import useMeasure from "react-use-measure";
import { useTrail, animated, useSpring } from "@react-spring/web";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "@/app/store/uiSlice";
import { RootState, store } from "@/app/store";

export const getDefaultNavPos = () => {
  const isWeb = typeof window == "object";
  var y = isWeb ? window.innerHeight - 60 : 0;
  var x = isWeb ? window.innerWidth / 2 : 0;
  return { x, y };
};
var { x, y } = getDefaultNavPos();
store.dispatch(uiActions.setOpenNavPos({ x, y }));
const initialClick = true;
const initClickEyeThinkMsg = "?";
const trans = (x: number, y: number) =>
  `translate3d(${x}px,${y}px,0) ` + `translate3d(-${x && 50}%,-${y && 50}%,0)`;
var inactiveTm: any;
const navMovConf = { mass: 1, tension: 150, friction: 10 };
export default function NavigatorMenu({
  listener,
}: {
  listener:
    | RefObject<HTMLDivElement>
    | MutableRefObject<HTMLDivElement | false>;
}) {
  const dispatch = useDispatch();
  const defaultNavPos = useSelector<RootState, { x: number; y: number }>(
    (s) => s.ui.navigator.defaultPosition.open
  );
  const navRef = useRef<HTMLDivElement>(null);
  const [open, toggle] = useState(false);
  const [moving, setMoving] = useState<boolean>(false);
  const [navMenuVis, setNavMenuVis] = useState<boolean>(false);
  const [inactive, setInactive] = useState(false);
  const isBlur = useSelector<RootState, boolean>((s) => s.ui.navigator.blur);
  const springs = useSpring({
    width: open ? 360 : 70,
    // transform: moving ? "translate3d(-50%,-50%,0)" : "translate3d(-0%,-0%,0)",
    config: { mass: 1, tension: 200, friction: 20 },
  });
  const [movementSpring, moveApi] = useSpring(() => ({
    xy: [defaultNavPos.x, defaultNavPos.y],
    config: navMovConf,
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
  const listenMouseEvent = useCallback<(event: MouseEvent) => void>(
    (e) => {
      moveApi.start({ to: { xy: [e.clientX, e.clientY] } });
      !moving && setMoving(true);
    },
    [moveApi, moving, setMoving]
  );

  const navMouseDownEventListener = useCallback<
    MouseEventHandler<HTMLDivElement>
  >(
    (e) => {
      const { width, height, ...rects } =
        //@ts-ignore
        e.currentTarget.getBoundingClientRect();
      setListen(true);
      e?.preventDefault();
      e.stopPropagation();
      return;
    },
    [setListen]
  );

  useEffect(() => {
    var tm: ReturnType<typeof setTimeout>;
    const handleResize = (e: UIEvent): void => {
      const pos = getDefaultNavPos();
      x = pos.x;
      y = pos.y;

      moveApi({ to: { xy: [x, y] } });
      clearTimeout(tm);
      tm = setTimeout(() => {
        dispatch(uiActions.setOpenNavPos({ x, y }));
      }, 200);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [moveApi, dispatch]);

  useEffect(() => {
    if (navRef.current) {
      if (moving) {
        navRef.current.onclick = null;
      } else {
        setTimeout(() => {
          const moveConf = open
            ? { xy: [x, y] }
            : { xy: [defaultNavPos.x, defaultNavPos.y] };
          if (navRef.current)
            navRef.current.onclick = () => {
              toggle((_) => !_);
              startTrailBox({
                reverse: true,
              });
            };

          moveApi({
            to: moveConf,

            /**  Now whenever the animation will be completed it will toggle
             * the navbar visibillity in the last animation spring cycle.
             *  So that the navigation option does not appear immediately*/
            config: { mass: 1, friction: 20 },
            onResolve() {
              moveApi({ config: navMovConf });
            },
          });
          setNavMenuVis(open);
        }, 100);
      }
    }
  }, [toggle, moving, open, defaultNavPos]);

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
        listener.current.onmouseleave = (ev) => {
          setMoving(false);
          setListen(false);
        };
      } else {
        listener.current.removeEventListener("mousemove", listenMouseEvent);
        listener.current.onmouseup = null;
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
      navRef.current.onclick = () => {
        toggle((_) => !_);
        setNavMenuVis(false);
      };
    }
    // ba
  }, [toggle]);

  var cls = isBlur || moving ? " bg-secondary/30 " : " bg-secondary ";
  cls += moving ? " scale-110 " : "";
  var attention = inactive ? " galatine " : "";

  return (
    <animated.div
      id="navigator"
      ref={navRef}
      // onTouchStart={navMouseDownEventListener}
      onMouseDown={navMouseDownEventListener}
      className={"navigator "}
      style={{
        height: 70,
        ...springs,
        position: "fixed",
        top: 0,
        left: 0,
        transform: movementSpring.xy.to(trans),
      }}
    >
      <animated.div
        className={
          " flex items-center justify-center shadow-md bg-blur w-full h-full transition-all duration-300 rounded-md  " +
          cls +
          attention
        }
      >
        <animated.div
          style={{
            width: "100%",
            height: "100%",
            padding: "5px 20px",
            transition: ".5s ease",
            display: navMenuVis ? "flex" : "none",
            alignContent: "space-between",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 className="text-primary">Hi</h1>
          <div
            onClick={(e) => {
              dispatch(uiActions.drawer({ open: true }));
              e.preventDefault();
              e.stopPropagation();
            }}
            style={{ width: "30px" }}
            className={"transition-all hover:rotate-90 "}
          >
            <Cog6ToothIcon className="text-primary " />
          </div>
        </animated.div>
        <div
          className="gap-1.5 p3  grid-cols-3 grid-rows-3"
          style={{
            height: 70,
            width: 70,
            display: navMenuVis ? "none" : "grid",
            padding: 10,
            gridTemplateColumns: "auto auto auto",
          }}
        >
          {trailsBox.map((e, id) => {
            return (
              <animated.div
                key={id}
                className="bg-primary  col-span-1 row-span-1"
                style={{
                  // height: "2vh",
                  // maxHeight: 15,
                  // maxWidth: 15,
                  // width: "2vh",
                  borderRadius: 1,
                  transform: e.scale.to((v) => `scale(${v})`),
                }}
              />
            );
          })}
        </div>
      </animated.div>
    </animated.div>
  );
}
