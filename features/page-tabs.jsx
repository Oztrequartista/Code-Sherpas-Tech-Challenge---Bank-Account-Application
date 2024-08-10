import Link from "next/link";
import { useEffect, useState } from "react";

const PageTabs = ({
  isBreadcrumb = true,
  slotRight = null,
  className = "",
  defaultActiveTab = null,
  centered = false,
  underline = "bg-yellow-400",
  tabs = [
    {
      name: "Transactions",
      href: "#",
      icon: "",
      action: () => {},
    },
    {
      name: "Search",
      href: "#",
      icon: <i class="ri-lock-line"></i>,
      action: () => {},
    },
  ],
  breadCrumbs = [
    {
      name: "Transactions",
      href: "#",
      icon: "",
      action: () => {},
    },
    {
      name: "Search",
      href: "#",
      icon: <i class="ri-lock-line"></i>,
      action: () => {},
    },
  ],
}) => {
  const [selectedTab, setSelectedTab] = useState(
    defaultActiveTab ?? tabs[0]?.key ?? tabs[0]?.name,
  );

  const [selectedBreadCrumb, setSelectedBreadCrumb] = useState(
    breadCrumbs[0]?.key ?? breadCrumbs[0]?.name,
  );

  useEffect(() => {
    setSelectedTab(defaultActiveTab);
  }, [defaultActiveTab]);

  if (isBreadcrumb) {
    return (
      <div className={`${className}`}>
        <div>
          <div class="border-b border-neutral-50 dark:border-gray-700 flex items-center flex-col md:flex-row">
            <ol
              class="flex items-center whitespace-nowrap"
              aria-label="Breadcrumb"
            >
              {breadCrumbs.map((breadcrumb, index, array) => {
                const { name, href, icon, action } = breadcrumb;
                const isNotLastItem = index < array.length - 1;
                return (
                  <li
                    key={name || index}
                    class="inline-flex items-center py-5 px-1"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedBreadCrumb(name);
                      if (action) {
                        action(breadcrumb);
                      }
                    }}
                  >
                    <Link
                      className={`flex items-center text-body_sm2_normal ${
                        name === selectedBreadCrumb ? "" : ""
                      }  ${!isNotLastItem ? "text-neutral-900" : "text-neutral-400"}`}
                      href={href}
                    >
                      {name}
                    </Link>
                    {isNotLastItem && (
                      <i class="ri-arrow-right-s-line text-neutral-100 text-body_lg2_normal"></i>
                    )}
                  </li>
                );
              })}
            </ol>
            <div className="ml-auto w-full md:w-auto">{slotRight}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div>
        <div class="md:border-b border-neutral-50 dark:border-gray-700">
          <nav class="flex space-x-2 flex-col md:flex-row md:items-center gap-4">
            <div className={`flex-1 flex flex-col md:flex-row md:items-center md:gap-6 ${centered ? " justify-center" : ""}`}>
              {tabs.map((tab, index) => {
                const { key, name, href, icon, action } = tab;

                const isActive = key
                  ? key === selectedTab
                  : name === selectedTab;
                const className = `relative py-5 px-1 inline-flex items-center gap-x-2 text-body_sm2_normal whitespace-nowrap ${
                  isActive ? "text-neutral-900" : "text-neutral-400"
                } focus:outline-none disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500`;

                return (
                  <div className="relative" key={name || index}>
                    {href ? (
                      <Link className={className} href={href}>
                        {icon && <span>{icon}</span>} {name}
                      </Link>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedTab(key ?? name);
                          action && action(tab);
                        }}
                        type="button"
                        className={className}
                      >
                        {icon && <span>{icon}</span>}
                        {name}
                      </button>
                    )}
                    {isActive && (
                      <span
                        className={` absolute bottom-[-1px] w-full lg:w-[30px] left-1/2 transform -translate-x-1/2  h-[2px] ${underline}`}
                      ></span>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="ml-auto">{slotRight}</div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PageTabs;
