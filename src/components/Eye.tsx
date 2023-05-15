import { animated, useSpring } from "@react-spring/web";
import { mouseListenerId } from "@/constants";
import { useCallback, useEffect, useRef } from "react";

var eyeMidX: number;
var eyeMidY: number;

const mouseListener =
  typeof window == "object" &&
  (document.querySelector("#" + mouseListenerId) as HTMLDivElement);
export default function Eye() {
  const eyeConRef = useRef<HTMLDivElement>(null);

  const [eyeSpring, startEyeSpring] = useSpring(() => ({
    ang: 0,
    config: { mass: 0.3, friction: 20 },
  }));

  const [eyeReactionSpring, startEyeReactionSpring] = useSpring(() => ({
    size: 60,
    config: { mass: 1, friction: 0.1, tension: 0 },
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
      } else {
        startEyeReactionSpring({ to: { size: 60 } });
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
  const size = eyeReactionSpring.size.to((s) => s + "%");
  console.log(size);
  return (
    <>
      <div className="eye-box centerize">
        <div className="lashes">{<div />}</div>
        <div className="bg-secondry eye centerize">
          <div className="sclera centerize">
            <animated.div
              className="pupil-container"
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
