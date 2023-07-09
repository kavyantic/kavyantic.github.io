import { PropsWithChildren, useEffect } from "react";
import { animated, useSpring, useTransition } from "@react-spring/web";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
const PointerAnimation = (props: PropsWithChildren) => {
  const router = useRouter();
  const lastXY = useSelector<RootState, RootState["ui"]["lastPointer"]>(
    (s) => s.ui.lastPointer
  );
  const [transitions, startAnim] = useSpring<{
    sxy: number[];
  }>(() => ({
    from: { sxy: [0.2, 396, 369, 50, 50] },
    to: { sxy: [1, 396, 369, 0, 0] },
    config: { duration: 20000 },
  }));

  useEffect(() => {
    startAnim.start({
      // from: { scaleTranslate: [0.2, lastXY] },
      to: { sxy: [1, 0, 0] },
    });
  }, [lastXY]);

  return (
    <>
      <animated.div
        onClick={() => {
          startAnim.start({
            from: { sxy: [0.1, 1000, 1000, 50, 50] },
            to: { sxy: [1, 0, 0, 0, 0] },
          });
        }}
        id="sup"
        // style={{ transform: style.transform.to((s) => `scale(${s})`) }}
        style={{
          transform: transitions.sxy.to((s, x, y, inX, inY) => {
            return `scale(${s}) translate3d(${x}px, ${y}px, 0) translate3d(-${inX}%,-${inY}%,0)`;
          }),
        }}
      >
        {props.children}
      </animated.div>
    </>
  );
};

export default PointerAnimation;

const simple = {
  from: { transform: 0.5 },
  enter: { transform: 1 },
  leave: { transform: 2 },
};
