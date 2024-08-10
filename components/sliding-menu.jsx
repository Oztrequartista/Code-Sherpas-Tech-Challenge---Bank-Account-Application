import React from "react";
import Button from "@/components/button";
import { useRouter } from "next/router";

const menu = [
  {
    title: "My Accounts",
    url: "/",
    iconClassName: "ri-home-line",
  },
  {
    title: "Statements",
    url: "/reports",
    iconClassName: "ri-file-chart-line",
  },
];

const SlidingMenu = ({ isOpen, onClose }) => {
  const router = useRouter();
  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-0 w-full bg-primary-600 shadow-lg z-50 transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ height: "220px" }}  
      >
        <div className="p-4">
          <Button onClick={onClose} className="text-neutral-600 !px-0">
            <span>
              <i className="ri-close-line text-heading_lg_normal"></i>
            </span>
          </Button>
          <div className="">
            <ul>
              {menu.map((item) => (
                <li key={item.title} >
                  <Button
                    onClick={(e)=>{
                      e.preventDefault();
                      onClose();
                      router.push(item.url);
                    }}
                    className="h-11 rounded-sm py-3 flex items-center gap-2 text-slate-200 focus:bg-primary-500 cursor-pointer"
                  >
                    <i className={item.iconClassName}></i>
                    <span className="text-[14px]">{item.title}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SlidingMenu;
