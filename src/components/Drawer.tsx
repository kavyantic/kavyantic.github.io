import { useTrail, animated } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

//Create a funciton to add two number

export default function Drawer(props: any): JSX.Element {
  const [on, setOn] = useState(false);
  return (
    <>
      <div className="p-3 flex flex-col items-center content-center">
        <div className="">h</div>
        <div
          className="rounded-full w-1/3 h-20v  border-white border-2 flex justify-center py-1 relative transition-all"
          onClick={() => setOn((_) => !_)}
        >
          <div
            className={
              "h-4 w-4 duration-500 bg-white rounded-full transition-all absolute" +
              (on ? " bottom-1  " : " bottom-3/4 ")
            }
          />
        </div>
      </div>
    </>
  );
}
