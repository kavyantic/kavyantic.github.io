import { useRouter } from "next/router";
import React, { PropsWithChildren, useEffect, useMemo } from "react";
import {
  TransitionGroup,
  Transition as ReactTransition,
  TransitionStatus,
} from "react-transition-group";
import { fadeIn, scaleOut, transRight, transLeft, TIMEOUT } from "./animations";

var trans:any = transLeft;

// const getTransKey = (router, transKey) => {
//   console.log(transKey);
//   return navItems.find((n) => n.link == router.pathname)?.link || transKey;
// };

// var transKey = undefined;

const Transition = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  // transKey = getTransKey(router, transKey);
  // useEffect(() => {
  // var lastI = navItems.findIndex((e) => e.link == last);
  // var curI = navItems.findIndex((e) => e.link == router.pathname);
  //   if (lastI == -1 || curI == -1) {
  //     trans = scaleOut;
  //   } else {
  //     trans = lastI < curI ? transLeft : transRight;
  //   }
  //   last = router.pathname;
  // }, [router.pathname]);
  useEffect(() => {
    if(router.pathname.match('/skills')){
      trans=fadeIn
    } else {
      trans=fadeIn
    }
  }, [router.pathname]);

  return (
    <TransitionGroup className="wh-max">
      <ReactTransition
        key={router.pathname}
        timeout={{
          enter: TIMEOUT,
          exit: TIMEOUT,
        }}
      >
        {(status) => (
          
          //@ts-ignore
          <div style={{ ...trans[status] }} className={"centerize wh-max "+(status!='entering'?'trans':"")}>
            {children}
          </div>
        )}
      </ReactTransition>
    </TransitionGroup>
  );
};

export default Transition;
