import { useRouter } from "next/router";
import React, { PropsWithChildren, useEffect, useMemo } from "react";
import {
  TransitionGroup,
  Transition as ReactTransition,
  TransitionStatus,
} from "react-transition-group";
import { fadeIn, scaleOut, transRight, transLeft, TIMEOUT } from "./animations";

var trans = fadeIn;

// const getTransKey = (router, transKey) => {
//   console.log(transKey);
//   return navItems.find((n) => n.link == router.pathname)?.link || transKey;
// };

// var transKey = undefined;
const LayoutTransition = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  return (
    <TransitionGroup className="wh-max">
      <ReactTransition
        timeout={{
          enter: TIMEOUT,
          exit: TIMEOUT,
        }}
        
      >
        {(status) => (
          //@ts-ignore
          <div style={{ ...trans[status] }} className=" wh-max">
            {children}
          </div>
        )}
      </ReactTransition>
    </TransitionGroup>
  );
};

export default  LayoutTransition;
