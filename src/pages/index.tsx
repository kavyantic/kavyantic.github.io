import DefaultLayout from "@/components/layouts/DefaultLayout";
import { useSpring, animated, useSprings, useTrail } from "@react-spring/web";
import Head from "next/head";
import Image from "next/image";
import { GetStaticProps } from "next/types";
import { ReactElement } from "react";

type PageProps = {
  phone: `${number}`;
  email: `${string}@${string}.${string}`;
};

export default function Home({ phone, email }: PageProps) {
  const springs = useTrail(2, {
    from: { opacity: 0, transform: "translate3d(100vw, 0, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    config: { mass: 1, tension: 150, friction: 10 },

  });
  return (
    <>
      <div className="landing">
        <div>
          <animated.div style={springs[0]}>
            <h1 className="text-4xl p-1 sm:text-5xl md:text-6xl ">
              KAVYA SHARMA            </h1>
          </animated.div>
          <animated.div style={springs[1]}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl p-2 dark:text-blue-300 ">
              Dorem Ascus Merut
            </h1>
          </animated.div>
        </div>
      </div>
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
