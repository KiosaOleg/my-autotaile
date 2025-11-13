"use client";

import HeaderTop from "./HeaderTop";
import HeaderBottom from "./HeaderBottom";

export default function Header() {
  return (
    <>
      <header className="w-full bg-background">
        <HeaderTop />
      </header>
      <HeaderBottom />
    </>
  );
}
