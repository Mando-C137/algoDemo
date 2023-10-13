import Link from "next/link";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <nav className="sticky top-0 left-0 p-4 w-full bg-slate-100 z-50">
      <div className="w-full flex justify-evenly items-center">
        <p className="text-lg font-bold text-slate-800">Sort Visualization</p>
        <Link href="https://github.com/Mando-C137">Follow me</Link>
      </div>
    </nav>
  );
};

export default Header;
