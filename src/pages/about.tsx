import { useSpring } from "@react-spring/web";
import Head from "next/head";
import Image from "next/image";
import { GetStaticProps } from "next/types";

type PageProps = {
  phone: `${number}`;
  email: `${string}@${string}.${string}`;
};

export default function About({ phone, email }: PageProps) {
  // const springs = useSpring({from:{}})
  return (
    <>
      <header>
        <div>
          <h3 className="name animated-text">{email} </h3>
          <h5 className="title animated-text">{phone}</h5>
        </div>
      </header>
    </>
  );
}


export const getStaticProps: GetStaticProps<PageProps> =
  async function (context) {
    return {
      props: { phone: "8949489335", email: "kavya@gmail.com" },
    };
  };
