import Eye from "../Eye";
import { animated, useSpring, useTrail } from "@react-spring/web";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import NavigatorMenu from "../Navigator";
import { mouseListenerId } from "@/constants";
import { uiActions } from "@/app/store/uiSlice";
import { BgBoxex } from "../BgBoxex";
import Drawer from "../Drawer";
var drawerTm: any;
var mids =
  typeof window == "object"
    ? { left: window.innerWidth / 2, top: window.innerHeight / 3 }
    : { left: 100, top: 100 };

export default function DefaultLayout({ children }: PropsWithChildren) {
  const mouseListenerRef = useRef(
    typeof window == "object" &&
      (document.querySelector("#" + mouseListenerId) as HTMLDivElement)
  );
  const eyeReactions = useSelector<
    RootState,
    RootState["ui"]["interact"]["eye"]
  >((s) => s.ui.interact.eye);
  const drawerUi = useSelector<RootState, RootState["ui"]["drawer"]>(
    (s) => s.ui.drawer
  );

  const [eyePropmt, setEyePrompt] = useState("");
  const [drawerVis, setDrawerVis] = useState(false);
  const dispatch = useDispatch();
  const spring = useSpring({
    size: eyeReactions.think ? 1 : 0,
    config: eyeReactions.think
      ? {
          tension: 1200,
          mass: 6,
          friction: 25,
        }
      : { tension: 400, mass: 0.1, friction: 40 },
  });

  const scaleTrails = useTrail(2, {
    from: { opacity: 0.5, transform: "scale(0)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: { mass: 2, tension: 300, friction: 15 },
    reverse: drawerUi.open,
  });

  const closeInactiveDrawer = () => {
    clearTimeout(drawerTm);
    drawerTm = setTimeout(() => {
      dispatch(uiActions.drawer({ open: false }));
    }, 6000);
  };
  useEffect(() => {
    closeInactiveDrawer();
  }, [drawerUi.open]);
  useEffect(() => {
    if (eyeReactions.think) {
      setEyePrompt(eyeReactions.think);
    } else {
      var tm = setTimeout(() => {
        setEyePrompt("");
      }, 1000);
    }
    return () => clearTimeout(tm);
  }, [eyePropmt, setEyePrompt, eyeReactions.think]);

  return (
    <div className="default_page text-primary flex relative overflow-hidden">
      <div />
      <div
        // onClick={() => dispatch(uiActions.drawer({ open: false }))}
        className={
          "transition-all duration-300 bg-primary/90 border-r-4 border-gray-800 overflow-hidden z-50 " +
          (drawerUi.open ? "lg:w-1/12 w-1/6 " : " w-0")
        }
        onMouseEnter={() => clearTimeout(drawerTm)}
        onMouseLeave={() => closeInactiveDrawer()}
      >
        <Drawer />
      </div>
      {/* <section className="default_header">
        <h3 className="title">  
          Kavy
        </h3>
      </section> */}
      <BgBoxex defaults={mids} />

      <div className={"header centerize z-40 w-full left-0 fixed"}>
        <animated.div
          id="eye-container"
          style={scaleTrails[0]}
          className={
            "rounded-full  w-full m-2  " +
            (eyeReactions.blur ? " bg-blur bg-secondary/10 " : "")
          }
        >
          <Eye />
          <animated.div
            className="absolute right-1 text-4xl"
            style={{ transform: spring.size.to((s) => `scale(${s})`) }}
          >
            {eyePropmt}
          </animated.div>
        </animated.div>
      </div>
      <main
        onClick={() => dispatch(uiActions.drawer({ open: false }))}
        className={
          "transition-all duration-300  bg-primary " +
          (drawerUi.open ? " self-blur-100 " : " w-screen")
        }
      >
        {children}
      </main>
      <NavigatorMenu listener={mouseListenerRef} />

      <div />
    </div>
  );
}

//
