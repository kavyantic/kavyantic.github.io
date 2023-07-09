import { useEffect, useState } from "react";

const getResponsive = () => {
  if (window.innerWidth > 1199) {
    return 4;
  } else if (window.innerWidth > 900) {
    return 3;
  } else if (window.innerWidth > 600) {
    return 2;
  } else {
    return 1;
  }
};

export default function useResponsive(breakpoints: number) {
  const [device, setDevice] = useState(
    typeof window == "object" ? getResponsive() : 1
  );
  useEffect(() => {
    window.addEventListener("resize", () => {
      setDevice(getResponsive());
    });
  }, [setDevice]);
  return device;
}

type Pos = "lt" | "lm" | "lb" | "bm" | "rt" | "rb" | "rm";
const nav =
  typeof window == "object" ? document.querySelector("#navigator") : null;
export const getNavPosition = (pos: Pos) => {
  const navRects = nav?.getBoundingClientRect() as DOMRect;
  var base = navRects.width / 2;
  var resp = getResponsive();
  switch (pos) {
    case "rb":
      return {
        x: window.innerWidth - base - 10 * resp,
        y: window.innerHeight - base - 10 * resp,
      };
  }
  return {x:0,y:0}
};
