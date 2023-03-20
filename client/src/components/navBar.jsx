import "../main.css";
import { navBarData } from "./navBarData";
import { Outlet, Link } from "react-router-dom";
import { useSetAtom } from "jotai";
import { classAtom } from "../state";

export default function SideBar() {
  const setCurrentClass = useSetAtom(classAtom);
  return (
    <>
      <div className="sideNav h-[100vh] w-1/5 bg-gray-700">
        <ul className="sideNavList">
          {navBarData.map((val, key) => {
            return (
              <Link
                to={val.link}
                key={key}
                className="row"
                id={val.title}
                onClick={() => setCurrentClass(val.title)}
              >
                <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>
              </Link>
            );
          })}
        </ul>
      </div>
      <div id="Character-page">
        <Outlet />
      </div>
    </>
  );
}
