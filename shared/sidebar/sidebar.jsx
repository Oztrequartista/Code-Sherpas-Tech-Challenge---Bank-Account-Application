import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import EntityImage from "@/features/entity-image";

const Sidebar = () => {
  const [sidebarShown, setSidebarShown] = useState(false);
  const userName = "Edmund S Yeboah";

  const menu = [
    {
      title: "My Accounts",
      href: "/",
      iconClassName: "ri-home-line",
    },
    {
      title: "Statements",
      href: "/reports",
      iconClassName: "ri-file-chart-line",
    },
  ];

  const closeSidebar = () => setSidebarShown(false);

  const pathname = usePathname();
  const isActive = (href) =>
    href === "/"
      ? pathname === href
      : pathname.replace(/\//g, "").startsWith(href.replace(/\//g, ""));

  const MenuItem = ({ item }) => (
    <li className={`${item.children ? "hs-accordion" : ""}`} id={item.title}>
      {item.href ? (
        <Link
          className={`h-11 rounded-sm py-3 pl-4 flex items-center gap-[14px] text-sm text-slate-200 hover:bg-primary-500 cursor-pointer ${
            isActive(item.href) ? "bg-primary-500" : ""
          } dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300`}
          href={item.href}
        >
          <i
            className={`text-[1rem] ${item.iconClassName} ${
              isActive(item.href) ? "text-white" : "text-primary-400"
            }`}
          ></i>
          <span className="text-body_sm2_normal">{item.title}</span>
        </Link>
      ) : (
        <AccordionMenu item={item} />
      )}
    </li>
  );

  const AccordionMenu = ({ item }) => (
    <>
      <button
        type="button"
        className="hs-accordion-toggle hs-accordion-active:text-white hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3 py-2 px-2 text-sm text-slate-200 rounded-[5px] hover:bg-primary-500 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300"
      >
        <i className={`text-[1rem] ${item.iconClassName}`}></i>
        {item.title}
        <i className="hs-accordion-active:block ri-arrow-up-s-line font-[700] text-[1.2rem] ms-auto hidden"></i>
        <i className="hs-accordion-active:hidden ri-arrow-down-s-line font-[700] text-[1.2rem] ms-auto block"></i>
      </button>
      {item.children && (
        <div className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
          <ul className="pt-2 ps-2">
            {item.children.map((child) => (
              <MenuItem key={child.title} item={child} />
            ))}
          </ul>
        </div>
      )}
    </>
  );

  const UserInfo = () => (
    <div className="text-white border-y border-primary-500 py-[14px] flex items-center gap-3">
      <EntityImage
        src="/images/jpgs/propfile.jpg"
        entityName={userName}
        className="w-10 h-10 object-cover rounded-full"
      />
      <div className="flex flex-col">
        <p className="text-white text-left text-body_base_normal">{userName}</p>
        <p className="text-primary-300 text-text_xs_normal">Welcome</p>
      </div>
    </div>
  );

  return (
    <div className="bg-primary-600 hidden lg:block w-75 h-full overflow-y-scroll md:flex flex-col gap-6 pt-7 px-7 pb-6">
      <div
        onClick={closeSidebar}
        className={`${
          sidebarShown
            ? "bg-[rgba(17,24,39,0.7)] opacity-1 z-[59]"
            : "opacity-0 -z-[59]"
        } fixed top-0 left-0 w-screen h-screen transition-opacity duration-300`}
      ></div>

      <Link href="/" className="flex items-center gap-2 h-10 mb-6">
        <span>
          <i className="ri-bank-fill text-[1.5rem] text-[#f45b77]"></i>
        </span>
        <span className="text-[#f45b77] text-body_sm2_normal">
          Iron Bank of Bravos
        </span>
      </Link>

      <div className="flex flex-col justify-between h-full gap-6">
        <div className="cursor-pointer">
          <UserInfo />
          <div className="mt-8">
            <nav
              className="hs-accordion-group w-full flex flex-col flex-wrap"
              data-hs-accordion-always-open
            >
              <ul className="space-y-1">
                {menu.map((item) => (
                  <MenuItem key={item.title} item={item} />
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div>
          <button className="flex items-center justify-between w-full gap-x-3 py-3 px-4 rounded-[5px] bg-[#234bdb] dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300">
            <div className="h-full flex items-center gap-3">
              <img
                src={`/images/flags/GH.png`}
                alt="flag"
                className="w-5 h-full"
              />
              <p className="text-sm flex items-center text-body_sm2_normal text-white">
                {userName}
              </p>
            </div>
          </button>
          <div className="mt-3">
            <div className="flex flex-col gap-5 py-4 px-6 pb-6 rounded-[5px] bg-primary-500 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300">
              <button className="flex items-center justify-between w-full gap-x-3">
                <div className="h-full flex items-center gap-2">
                  <i className="ri-computer-line text-primary_faded text-[12px]"></i>
                  <p className="text-text_xs_normal text-primary-200">
                    Last Login: {new Date().toDateString()}
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
