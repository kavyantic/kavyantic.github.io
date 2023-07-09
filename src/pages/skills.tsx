import DefaultLayout from "@/components/layouts/DefaultLayout";
import { ReactElement, useEffect } from "react";
import { animated } from "@react-spring/web";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { uiActions } from "@/app/store/uiSlice";
import useResponsive, { getNavPosition } from "@/app/utils/useResponsive";
import { getDefaultNavPos } from "@/components/Navigator";

type PageProps = {
  data: [{ icon: string; title: string; description: string }];
};

export default function Skills(props: PageProps) {
  const router = useRouter();
  const device = useResponsive(1);
  const dispatch = useDispatch();
  useEffect(() => {
    const pos = 10 * device+50;
    dispatch(
      uiActions.setOpenNavPos(getNavPosition('rb'))
    );
    return () => {
      dispatch(uiActions.setOpenNavPos(getDefaultNavPos()));
    };
  }, [device]);
  return (
    <>
      <div className=" centerize h-screen" onClick={(_) => router.push("/work")}>
        <SkillShield />
      </div>
    </>
  );
}

Skills.getLayout = function (page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

function SkillShield() {
  return (
    <>
  
      <animated.div
        className={"rounded-full border-2 border-secondary centerize relative"}
        style={{
          width: "65vh",
          height: "65vh",
        }}
      >
      
        <animated.div className="rounded-full border-secondary border-2 w-2/3 h-2/3"></animated.div>
        <animated.div className="absolute wh-max rounded-full "></animated.div>
      </animated.div>
    </>
  );
}
