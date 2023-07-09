import { animated, useSpring } from "@react-spring/web";
import { mouseListenerId, pageAnimationDelay } from "@/constants";
import {
  ReactComponentElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { JsxElement } from "typescript";

var eyeMidX: number;
var eyeMidY: number;

const mouseListener =
  typeof window == "object" &&
  (document.querySelector("#" + mouseListenerId) as HTMLDivElement);

export default function Eye() {
  const eyeConRef = useRef<HTMLDivElement>(null);
  const [eyeSpring, startEyeSpring] = useSpring(() => ({
    ang: 0,
    config: { mass: 0.3, friction: 10, easing: 2 },
  }));

  const [eyeReactionSpring, startEyeReactionSpring] = useSpring<{
    size: number;
    lashesScale: number;
  }>(() => ({
    size: 60,
    lashesScale: 0,
    config: { mass: 1, friction: 0.1, tension: 0 },
  }));

  const eyeReactionHandler = useCallback<(t: boolean) => void>((d) => {
    if (d) {
      startEyeReactionSpring({
        to: { size: 80 },
        config: { mass: 1, friction: 0.1, tension: 0 },
      });
      // starting this animation in another call to load different animation configuration
      startEyeReactionSpring({
        to: { lashesScale: 1 },
        config: { mass: 0.7, friction: 20, tension: 400 },
      });
    } else {
      startEyeReactionSpring({
        to: { lashesScale: 0 },
        config: { mass: 0.1, friction: 20, tension: 400 },
      });
      startEyeReactionSpring({
        to: { size: 50 },
        config: { mass: 1, friction: 0.1, tension: 0 },
      });
    }
  }, []);

  const eyeMoveHandler = useCallback<(event: MouseEvent) => any>(
    (e) => {
      let dx = eyeMidX - e.pageX + window.scrollX;
      let dy = eyeMidY - e.pageY + window.scrollY;
      let ang = (Math.atan2(dy, dx) * 180) / Math.PI;

      startEyeSpring({ to: { ang: ang } });
      const distance = Math.hypot(dx, dy);

      eyeReactionHandler(distance < 200);
      //************  vanilla pupil rotating feature **************//
      // if (eyeConRef.current)
      //   eyeConRef.current.style.transform = rotateEle(ang - 90);
    },
    [startEyeSpring, eyeReactionHandler]
  );

  useEffect(() => {
    const listener = (e: UIEvent) => {
      [eyeMidX, eyeMidY] = middleOfEle(eyeConRef.current as HTMLDivElement);
    };
    if (eyeConRef.current) {
      [eyeMidX, eyeMidY] = middleOfEle(eyeConRef.current);

      window.addEventListener("resize", listener);
    }
    return () => window.removeEventListener("resize", listener);
  }, []);
  useEffect(() => {
    if (mouseListener) {
      mouseListener.addEventListener("mousemove", eyeMoveHandler);
    }
    return () => {
      if (mouseListener)
        mouseListener.removeEventListener("mousemove", eyeMoveHandler);
    };
  }, [eyeMoveHandler]);
  const [size, eyeLashScale] = useMemo(
    () => [
      eyeReactionSpring.size.to((s) => s + "%"),
      eyeReactionSpring.lashesScale.to((v) => `scaleY(${v})`),
    ],
    [eyeReactionSpring]
  );

  const EyeLash = (prop: { rotateClass: string }) => (
    <div className={` eye-lash  absolute ${prop.rotateClass}`}>
      <animated.div
        className={" rounded-sm"}
        style={{
          transform: eyeLashScale,
        }}
      />
    </div>
  );
  return (
    <>
      <div className="eye-box centerize flex-col relative">
        <div className="lashes flex absolute">
          <div className="lashes-container centerize flex-col relative items-center justify-center content-center ">
            <EyeLash rotateClass="-rotate-45" />
            <EyeLash rotateClass="" />
            <EyeLash rotateClass="rotate-45" />
          </div>
        </div>
        <div className=" eye centerize ">
          <div className="sclera centerize ">
            <div className="pupil-container">
              <animated.div
                className="pupil-rotate"
                ref={eyeConRef}
                style={{
                  transform: eyeSpring.ang.to(rotateEle),
                }}
              >
                <animated.div
                  style={{ width: size, height: size }}
                  className="pupil"
                ></animated.div>
              </animated.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const ShowcaseEye = function ({ angle,react }: { angle: number ,react:boolean}) {
  const eyeConRef = useRef<HTMLDivElement>(null);
  const [eyeMid, setEyeMid] = useState({ x: 0, y: 0 });
  const [eyeSpring, startEyeSpring] = useSpring(() => ({
    ang: 0,
    config: { mass: 1, friction: 20, easing: 2 },
  }));

  const [eyeReactionSpring, startEyeReactionSpring] = useSpring<{
    size: number;
    lashesScale: number;
  }>(() => ({
    size: 60,
    lashesScale: 0,
    config: { mass: 1, friction: 0.1, tension: 0 },
  }));
  useEffect(() => {
    startEyeSpring.start({
      to: { ang: angle },
    });
  }, [angle]);
  useEffect(()=>{
      eyeReactionHandler(react)
    
  },[react])

  const eyeReactionHandler = useCallback<(t: boolean) => void>((d) => {
    if (d) {
      startEyeReactionSpring.start({
        to: { size: 80 },
        config: { mass: 1, friction: 0.1, tension: 0 },
      });
      // starting this animation in another call to load different animation configuration
      startEyeReactionSpring.start({
        to: { lashesScale: 1 },
        config: { mass: 0.7, friction: 20, tension: 400 },
      });
    } else {
      startEyeReactionSpring.start({
        to: { lashesScale: 0 },
        config: { mass: 0.1, friction: 20, tension: 400 },
      });
      startEyeReactionSpring.start({
        to: { size: 50 },
        config: { mass: 1, friction: 0.1, tension: 0 },
      });
    }
  }, []);

  useEffect(() => {
    const listener = (e: UIEvent) => {
      var mid = middleOfEle(eyeConRef.current as HTMLDivElement);
      setEyeMid({ x: mid[0], y: mid[1] });
    };
    if (eyeConRef.current) {
      var mid = middleOfEle(eyeConRef.current as HTMLDivElement);
      setEyeMid({ x: mid[0], y: mid[1] });

      window.addEventListener("resize", listener);
    }
    return () => window.removeEventListener("resize", listener);
  }, []);

  const [size, eyeLashScale] = useMemo(
    () => [
      eyeReactionSpring.size.to((s) => s + "%"),
      eyeReactionSpring.lashesScale.to((v) => `scaleY(${v})`),
    ],
    [eyeReactionSpring]
  );

  const EyeLash = (prop: { rotateClass: string }) => (
    <div className={` eye-lash  absolute ${prop.rotateClass}`}>
      <animated.div
        className={" rounded-md"}
        style={{
          transform: eyeLashScale,
        }}
      />
    </div>
  );
  return (
    <>
      <div className="eye-box centerize flex-col relative">
        <div className="lashes flex absolute">
          <div className="lashes-container centerize flex-col relative items-center justify-center content-center ">
            <EyeLash rotateClass="-rotate-45 " />
            <EyeLash rotateClass="" />
            <EyeLash rotateClass="rotate-45" />
          </div>
        </div>
        <div className=" eye centerize ">
          <div className="sclera centerize w-full">
            <div className="pupil-container ">
              <animated.div
                className="pupil-rotate"
                ref={eyeConRef}
                style={{
                  transform: eyeSpring.ang.to(rotateEle),
                }}
              >
                <animated.div
                  style={{ width: size, height: size }}
                  className="pupil"
                ></animated.div>
              </animated.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const middleOfEle = (ele: HTMLElement | HTMLDivElement) => {
  const eyeRect = ele.getBoundingClientRect();
  return [eyeRect.x + eyeRect.width / 2, eyeRect.y + eyeRect.height / 2];
};

const rotateEle = (deg: number) => {
  return `rotate(${deg}deg)`;
};

/**
 import { animated, useSpring } from "@react-spring/web";
import { mouseListenerId, pageAnimationDelay } from "@/constants";
import { useCallback, useEffect, useMemo, useRef } from "react";

var eyeMidX: number;
var eyeMidY: number;

const mouseListener =
  typeof window == "object" &&
  (document.querySelector("#" + mouseListenerId) as HTMLDivElement);
export default function Eye() {
  const eyeConRef = useRef<HTMLDivElement>(null);

  const [eyeSpring, startEyeSpring] = useSpring(() => ({
    ang: 0,
    config: { mass: 0.3, friction: 10, easing: 2 },
  }));

  const [eyeReactionSpring, startEyeReactionSpring] = useSpring(() => ({
    size: 60,
    config: { mass: 1, friction: 0.1, tension: 0 },
  }));

  const [eyeLashSpring, startEyeLashSpring] = useSpring(() => ({
    height: 10,
    width: 4,
    config: { mass: 1, friction: 10, tension: 40 },
  }));

  const eyeMoveHandler = useCallback<(event: MouseEvent) => any>(
    (e) => {
      let dx = eyeMidX - e.pageX;
      let dy = eyeMidY - e.pageY;
      let ang = (Math.atan2(dy, dx) * 180) / Math.PI;

      // ** Legacy features **
      // This to change reaction of eye on the basis of cursor distance from it
      // Does the same thing as rotating it but with animation
      startEyeSpring({ to: { ang: ang - 90 } });
      const distance = Math.hypot(dx, dy);
      if (distance < 200) {
        startEyeReactionSpring({ to: { size: 80 } });
        startEyeLashSpring.start({to:{width:8}})
      } else {
        startEyeReactionSpring({ to: { size: 60 } });
        startEyeLashSpring.start({to:{width:4}})

      }

      // if (eyeConRef.current)
      //   eyeConRef.current.style.transform = rotateEle(ang - 90);
    },
    [startEyeSpring]
  );

  useEffect(() => {
    if (eyeConRef.current) {
      [eyeMidX, eyeMidY] = middleOfEle(eyeConRef.current);
      window.addEventListener("resize", (e) => {
        [eyeMidX, eyeMidY] = middleOfEle(eyeConRef.current as HTMLDivElement);
      });
    }
  }, []);
  useEffect(() => {
    if (mouseListener) {
      mouseListener.addEventListener("mousemove", eyeMoveHandler);
    }
    return () => {
      if (mouseListener)
        mouseListener.removeEventListener("mousemove", eyeMoveHandler);
    };
  }, [eyeMoveHandler]);
  const size = useMemo(
    () => eyeReactionSpring.size.to((s) => s + "%"),
    [eyeReactionSpring]
  );
  const EyeLash = (prop: { rotateClass: string }) => (
    <div className={`w-1 h-20 eye-lash  absolute ${prop.rotateClass}`}>
      <animated.div
        className={"w-1 h-3 bg-dark-secondry rounded-sm"}
        style={eyeLashSpring}
      />
    </div>
  );
  return (
    <>
      <div className="eye-box centerize flex-col relative">
        <div className="lashes flex absolute">
          <div className="lashes-container centerize flex-col relative items-center justify-center content-center ">
            <EyeLash rotateClass="-rotate-45" />
            <EyeLash rotateClass="" />
            <EyeLash rotateClass="rotate-45" />
          </div>
        </div>
        <div className=" eye centerize bg-black dark:bg-dark-secondry">
          <div className="sclera centerize bg-white dark:bg-dark-primary">
            <animated.div
              className="pupil-container "
              ref={eyeConRef}
              style={{
                transform: eyeSpring.ang.to(rotateEle),
              }}
            >
              <animated.div
                style={{ width: size, height: size }}
                className="pupil bg-black dark:bg-dark-secondry"
              ></animated.div>
            </animated.div>
          </div>
        </div>
      </div>
    </>
  );
}

const middleOfEle = (ele: HTMLElement | HTMLDivElement) => {
  const eyeRect = ele.getBoundingClientRect();
  return [eyeRect.x + eyeRect.width / 2, eyeRect.y + eyeRect.height / 2];
};

const rotateEle = (deg: number) => {
  return `rotate(${deg}deg)`;
};

 */
