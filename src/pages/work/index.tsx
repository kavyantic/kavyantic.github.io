import { uiActions } from "@/app/store/uiSlice";
import useResponsive, { getNavPosition } from "@/app/utils/useResponsive";
import { BgBoxex } from "@/components/BgBoxex";
import Eye, { ShowcaseEye } from "@/components/Eye";
import { getDefaultNavPos } from "@/components/Navigator";
import PointerAnimation from "@/components/animated/PointerAnimation";
import { NextIconSvg } from "@/components/icons";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { useSpring, useTransition, animated } from "@react-spring/web";
import Head from "next/head";
import Image from "next/image";
import { GetStaticProps } from "next/types";
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";

type PageProps = {
  projects: [];
};

export default function Work(Props: PageProps) {
  // const springs = useSpring({from:{}})
  const device = useResponsive(1);
  const dispatch = useDispatch();
  const [angle, setAngle] = useState(0);
  const [eyeReact, setEyeReact] = useState(false);
  // const [inScreen,]
  useEffect(() => {
    dispatch(uiActions.setNavOpacity({ blur: true }));
    window.onscroll = (e) => {
      if (window.scrollY > 200) {
        dispatch(uiActions.eye({ blur: true }));
      } else {
        dispatch(uiActions.eye({ blur: false }));
      }
    };
    var int = setInterval(() => {
      setEyeReact(Math.floor(Math.random() * 3) == 2);

      setTimeout(() => {
        setAngle(
          Math.floor(Math.random() * 360) - Math.floor(Math.random() * 360)
        );
      }, Math.random() * 3000);
    }, 3000);
    return () => {
      dispatch(uiActions.setNavOpacity({ blur: false }));
      clearInterval(int);
    };
  }, [setEyeReact]);

  return (
    <>
      <Head>
        <title>Work</title>
      </Head>

      <div className="  py-2 w-full lg:px-32 md:px-10 ">
        <div className="w-full  h-screen  flex">
          <div className="m-auto acorn">
            <h1 className="text-8xl text-center ">{"Hi, I'm Kávya"}</h1>
            <h1 className="text-6xl text-center text-blue-400">
              My development JournⒺy{" "}
            </h1>
          </div>
        </div>
        <section className=" w-full sm:p-10 h-70v grid grid-cols-5 sm:gap-4 lg:gap-12 grid-row-2">
          <div className=" bg-secondary/75   rounded-3xl col-span-2  "></div>
          <div className=" bg-secondary/40   rounded-3xl col-span-3"></div>
        </section>
        <div className="  text-center flex flex-col  items-center my-10">
          <h1 className="acorn text-primary md:text-8xl text-6xl  tracking-wide">
            Reactive
          </h1>
          <p className="lg:w-3/5 sm:w-4/5 w-full p-7">
            {
              "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut asperiores in unde neque dolorum veritatis saepe doloremque."
            }
          </p>
        </div>
        <section className=" w-full sm:p-10   h-screen grid grid-cols-7 sm:gap-4 lg:gap-10 grid-row-5">
          <div className=" bg-secondary/25  rounded-3xl col-span-4  row-span-5 flex justify-center items-center flex-col gap-5">
            <div className="flex content-between justify-between">
              <Title className="text-4xl ">Devicure</Title>
            </div>
            <div className="w-2/3 h-2/3 rounded-sm border-blue-400 border-8">
              {/* <iframe
                src="https://devicecure.in"
                className="w-full h-full  "
              ></iframe> */}
            </div>
          </div>
          <div className="  bg-secondary  rounded-3xl col-span-3 row-span-2 centerize dracula:bg-accent/75 ">
            <div className="md:h-72 md:w-72 w-40 h-40">
              <ShowcaseEye angle={angle} react={eyeReact} />
            </div>
          </div>
          <div className="bg-accent/30 rounded-3xl col-span-3 row-span-3 flex justify-center items-center"></div>
        </section>

        <div className="  text-center flex flex-col  items-center my-10">
          <h1 className="acorn text-primary md:text-8xl text-6xl  tracking-wide ">
            Pyth
            <img src="/python-ico.png" className="md:w-20 w-10 h-full inline" />
            nic
          </h1>
          <p className="lg:w-3/5 sm:w-4/5 w-full  p-7">
            {
              "Lorem ipsum dolor sit amet consectetur adipisicing elit.Aut asperiores in unde neque dolorum veritatis saepe doloremque."
            }
          </p>
        </div>
        <section className=" w-full sm:p-10  h-screen grid grid-cols-7 sm:gap-4 lg:gap-10 grid-row-7 dracula:text-white ">
          <Pythonic />
        </section>
      </div>
    </>
  );
}

var pythonicTm: any;
const Pythonic = memo(function Ele() {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    var top = 100;
    if (ref.current) {
      top = ref.current.getBoundingClientRect().top;
    }
    const listener = () => {
      clearTimeout(pythonicTm);
      pythonicTm = setTimeout(() => {
        var diff = top - window.scrollY;
        if (diff <= 40 && diff >= -40) {
          console.warn("nothin");
          dispatch(uiActions.setOpenNavPos(getNavPosition("rb")));
        } else {
          dispatch(uiActions.setOpenNavPos(getDefaultNavPos()));
        }
      }, 200);
    };
    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  });
  return (
    <>
      <div
        className="bg-accent dracula:bg-teal-800  rounded-3xl md:col-span-5 col-span-7 row-span-5 md:row-span-7 flex sm:p-8 lg:p-14 flex-col "
        ref={ref}
      >
        <div className="flex content-between justify-between">
          <Title className="text-4xl ">Fun</Title>
          <Title className="text-xl text-white">Explore</Title>
        </div>
        <div className="w-full h-full my-5 rounded-md bg-slate-800 dracula:bg-teal-500 hover:scale-105 transition-transform duration-500 cursor-pointer"></div>
        <div className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-white"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </div>
      </div>
      <div className="bg-secondary bg-accent/50 rounded-3xl md:col-span-2 col-span-7 md:row-span-5 row-span-2 flex justify-center items-center"></div>
    </>
  );
});

const Title = React.forwardRef<
  HTMLHeadingElement,
  DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
>(function TitleElement(props, ref) {
  return (
    <h1 {...props} className={props.className + " font-bold acorn "} ref={ref}>
      {props.children}
    </h1>
  );
});

Work.getLayout = function (page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export const getStaticProps: GetStaticProps<PageProps> = async function (
  context
) {
  return {
    props: { phone: "8949489335", email: "kavya@gmail.com" } as any,
  };
};
