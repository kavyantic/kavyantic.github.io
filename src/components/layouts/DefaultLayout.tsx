import { useSpring } from "@react-spring/web";
import Logo from "../Logo";
import Eye from "../Eye";

export default function DefaultLayout({ children }: any) {
  return (
    <div className="default_page dark:default_page dark:bg-primary dark:text-primary text-purple-300 ">
      <div className="header">
        <div id="eye-container">
          <Eye />
        </div>
      </div>
      {/* <section className="default_header">
        <h3 className="title">  
          Kavy
        </h3>
      </section> */}
      {children}
    </div>
  );
}
