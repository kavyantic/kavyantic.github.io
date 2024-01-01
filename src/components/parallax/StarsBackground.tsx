"use client";
import { useSpring, useTrail, animated } from "@react-spring/web";
import React, {
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import Router from "next/router";

const isWeb = typeof window == "object";

var centers = isWeb ? [window.innerWidth / 2, window.innerHeight / 2] : [0, 0];
var minX = 0;
var maxX = isWeb ? window.innerWidth : 0;
var minY = 0;
var maxY = isWeb ? window.innerHeight : 0;
function refreshDims() {
  centers = isWeb ? [window.innerWidth / 2, window.innerHeight / 2] : [0, 0];
  minX = 0;
  maxX = isWeb ? window.innerWidth : 0;
  minY = 0;
  maxY = isWeb ? window.innerHeight : 0;
}
function randStarLoc(len = 10) {
  var con = [];
  for (let i = 0; i < len; i++) {
    const ele = [
      Math.floor(Math.random() * maxX),
      Math.floor(Math.random() * maxY) + minY,
    ];
    con.push(ele);
  }
  return con;
}

const trans = (x: number, y: number) => `translate3d(${x}px,${y}px,0) `;
const staticLayerLoc = randStarLoc();
export default function Stars(props: PropsWithChildren) {
  const [layer1Loc, setLayer1Loc] = useState(randStarLoc(40));
  const [layer2Loc, setLayer2Loc] = useState(randStarLoc(30));
  const [layer3Loc, setLayer3Loc] = useState(randStarLoc(15));

  const [parallax1, paraLayerApi1] = useSpring(() => ({
    xy: [0, 0],
    config: { tension: 300, friction: 40 },
  }));
  const [parallax2, paraLayerApi2] = useSpring(() => ({
    xy: [0, 0],
    config: { tension: 300, friction: 40 },
  }));
  const [parallax3, paraLayerApi3] = useSpring(() => ({
    xy: [0, 0],
    config: { tension: 300, friction: 40 },
  }));
  const [childParallax, paraChildApi] = useSpring(() => ({
    xy: [0, 0],
    config: { tension: 200, friction: 20 },
  }));

  useEffect(() => {
    const routerChangeEndHandler = () => {
      setLayer1Loc(randStarLoc(50));
      setLayer2Loc(randStarLoc(30));
      setLayer3Loc(randStarLoc(20));
    };
    Router.events.on("routeChangeComplete", routerChangeEndHandler);

    return () =>
      Router.events.off("routeChangeComplete", routerChangeEndHandler);
  }, [setLayer1Loc, setLayer2Loc, setLayer3Loc]);

  useEffect(() => {
    var tm: ReturnType<typeof setTimeout>;
    const handleResize = (e: UIEvent): void => {
      clearTimeout(tm);
      tm = setTimeout(() => {
        refreshDims();
        setLayer1Loc(randStarLoc(50));
        setLayer2Loc(randStarLoc(30));
        setLayer3Loc(randStarLoc(20));
      }, 300);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let _listener: MouseEventHandler = (e) => {
      let moveX = centers[0] - e.clientX;
      let moveY = centers[1] - e.clientY;
      paraLayerApi1.start({ xy: [moveX / 20, moveY / 20] });
      paraLayerApi2.start({ xy: [moveX / 10, moveY / 10] });
      paraLayerApi3.start({ xy: [moveX / 5, moveY / 5] });

      paraChildApi.start({ xy: [moveX / 15, moveY / 15] });
    };
    window.addEventListener("mousemove", _listener as any);
    return () => window.removeEventListener("mousemove", _listener as any);
  }, [paraLayerApi1]);

  return (
    <>
      <div className="fixed  pointer-events-none w-screen h-screen ">
        <animated.div style={{ transform: parallax1.xy.to(trans) }}>
          {layer1Loc.map((loc) => {
            return (
              <>
                <animated.p
                  className="text-[5px] blur-[1px] star  text-yellow-100 smooth-3"
                  style={{
                    x: loc[0],
                    y: loc[1],
                  }}
                >
                  ✦
                </animated.p>
              </>
            );
          })}
        </animated.div>
        <animated.div style={{ transform: parallax2.xy.to(trans) }}>
          {layer2Loc.map((loc) => {
            return (
              <>
                <animated.p
                  className="text-[10px] blur-[1px]    text-yellow-300 star smooth-2"
                  style={{
                    x: loc[0],
                    y: loc[1],
                  }}
                >
                  ✦
                </animated.p>
              </>
            );
          })}
        </animated.div>
        <animated.div style={{ transform: parallax3.xy.to(trans) }}>
          {layer3Loc.map((loc) => {
            return (
              <>
                <animated.p
                  className="text-[15px] blur-[.4px]   text-orange-200 star smooth-1"
                  style={{
                    x: loc[0],
                    y: loc[1],
                  }}
                >
                  ✦
                </animated.p>
              </>
            );
          })}
        </animated.div>
        {staticLayerLoc.map((loc) => {
          return (
            <>
              <animated.p
                className="absolute text-[5px] blur-[1px]   text-yellow-10 w-fit shadow-2xl  shadow-white animate-pulse"
                style={{
                  x: loc[0],
                  y: loc[1],
                }}
              >
                ✦
              </animated.p>
            </>
          );
        })}
      </div>
      <animated.div style={{ transform: childParallax.xy.to(trans) }}>
        {props.children}
      </animated.div>
    </>
  );
}
