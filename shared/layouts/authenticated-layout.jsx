import React, { useState } from "react";
import SharedLayout from "@/shared/layouts/shared-layout";
import Sidebar from "../sidebar/sidebar";
import Button from "@/components/button";
import Portal from "@/components/portal";
import SlidingMenu from "@/components/sliding-menu";
import Link from "next/link";

const AuthenticatedLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <SharedLayout>
      <Portal portalId={"dialog-portal"}>
        <div className="block md:hidden">
          <SlidingMenu isOpen={isMenuOpen} onClose={closeMenu} />
        </div>
      </Portal>
      <section className="flex w-full h-[100vh] overflow-hidden">
        <aside className="h-full">
          <Sidebar />
        </aside>
        <main className="flex-1 overflow-y-auto py-8 px-8 lg:px-14">
          <div className="flex items-center justify-between md:hidden mb-4 -mt-4">
            <Button className="!bg-transparent px-0" onClick={toggleMenu}>
              <span>
                <i className="ri-menu-5-fill text-neutral-600 text-heading_lg_normal"></i>
              </span>
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <span>
                <i className="ri-bank-fill text-[1.5rem] text-[#f45b77]"></i>
              </span>
              <span className="text-[#f45b77] text-body_sm2_normal">
                Iron Bank of Bravos
              </span>
            </Link>
          </div>
          {children}
        </main>
      </section>
    </SharedLayout>
  );
};

export default AuthenticatedLayout;
