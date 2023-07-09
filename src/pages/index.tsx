import { uiActions } from "@/app/store/uiSlice";
import AnimatedPages from "@/components/animated/AnimatedPages";
import PointerAnimation from "@/components/animated/PointerAnimation";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { useSpring, animated, useSprings, useTrail } from "@react-spring/web";
import Head from "next/head";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import { GetStaticProps } from "next/types";
import { ReactElement, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

type PageProps = {
  phone: `${number}`;
  email: `${string}@${string}.${string}`;
};

export default function Home({ phone, email }: PageProps): JSX.Element {
  const router = useRouter();
  const [reverseAnim, setReverseAnim] = useState(false);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const dispatch = useDispatch();
  const springs = useTrail(2, {
    from: { opacity: 0, transform: "translate3d(-100vw, 0, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },

    reverse: router.pathname != "/",
    config: { mass: 1, tension: 150, friction: 10 },
  });

  const scaleTrails = useTrail(2, {
    from: { opacity: 0.5, transform: "scale(0)" },
    to: { opacity: 1, transform: "scale(1)" },

    // reverse: router.pathname != "/",
    reverse: reverseAnim,
    config: { mass: 1, tension: 150, friction: 13 },
  });

  useEffect(() => {
    var base = ` I have been programming since the age of 16. While I am proficient in a wide range of webdevelopment technologies, Python is undoubtedly my favorite language.`;
    var base2 = `People often make incorrect assumptions about my gender based on my name. However, they quickly realize that I am male once we engage in conversation`;
    var i = 0;
    var speed = 30;
    var int = setInterval(() => {
      if (bioRef.current) {
        bioRef.current.innerHTML += base.charAt(i);
        i++;
      }
      if (i >= base.length) clearInterval(int);
    }, speed);
    setTimeout(() => {
      i = 0;
      //@ts-ignore

      if (bioRef.current) bioRef.current.innerHTML = "";
      var int2 = setInterval(() => {
        if (bioRef.current) {
          bioRef.current.innerHTML += base2.charAt(i);
          i++;
        }
        if (i >= base2.length) clearInterval(int2);
      }, speed);
    }, speed * base.length + 4000);

    // Router.events.on('beforeHistoryChange',()=>setReverseAnim(true))
    return () => {
      console.warn("called just when page is changing from index");
    };
  }, []);

  return (
    <>
      {/* <PointerAnimation> */}
      <div className="landing  w-8/12">
        <animated.div className="flex justify-between py-6 z-20">
          <p>Hi there!</p>
        </animated.div>

        <div className="flex justify-between ">
          <div className="max-w-full flex justify-center items-center">
            <div>
              <animated.div style={springs[0]}>
                <h1 className="text-4xl p-1 sm:text-5xl md:text-6xl  text-primary acorn">
                  {"  Hi. I&lsquo;m Kávya ✦  "}
                </h1>
              </animated.div>
              <animated.div className={"acorn"} style={springs[1]}>
                <h1 className="text-1xl sm:text-2xl md:text-3xl p-2   text-blue-300 ">
                  <span>A </span> Designer{" & "}
                  <span
                    className="text-blue-400 inline-block cursor-pointer "
                    onClick={(e) => {
                      setReverseAnim(true);
                      dispatch(
                        uiActions.setLastPointer({ x: e.clientX, y: e.clientY })
                      );
                      router.push("/skills");
                    }}
                  >
                    {"<Developer>"}
                  </span>
                </h1>
              </animated.div>
              <animated.div
                className="lg:w-96 md:w-40 sm:w-full "
                style={{ maxWidth: "100vw" }}
              >
                <p className="text-sm text-primary p-2" ref={bioRef}></p>
              </animated.div>
            </div>
          </div>
          <div className="max-w-full">
            <animated.div
              className="profile-picture bg-secondary "
              style={scaleTrails[0]}
            ></animated.div>
          </div>
        </div>
        {/* <div className="">
          <div className=" rotate-45 dark:bg-dark-secondry " style={{height:"120vh",width:'30vh',borderRadius:'30vh',transform:"translate3d(10vh,-10vh,0) rotate(45deg)"}}></div>
        </div> */}
        <animated.div className=" py-3 flex content-between justify-between">
          <div>
            <p className="text-sm text-blue-300 sm:text-md">
              &copy; 2023 Kavya Sharma • Dev
            </p>
          </div>
          <div>
            <p className="text-sm text-blue-300 sm:text-md">About Me</p>
          </div>
        </animated.div>
      </div>
      {/* </PointerAnimation> */}
    </>
  );
}

Home.getLayout = function (page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export const getStaticProps: GetStaticProps<PageProps> = async function (
  context
) {
  return {
    props: { phone: "8949489335", email: "kavya@gmail.com" },
  };
};
