// components/Navbar.js

import { faBarsStaggered, faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

export default function Navbar(props: any) {
  const [isOpen, setIsOpen] = useState(false);
  const activeRouteClasses = "text-white hover:text-gray-200 font-bold underline"
  const nonActiveRouteClasses = "text-white hover:text-gray-200"
  console.log(props);
  return (
    <nav className="bg-orange-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link href="/">Online Lesson Planner</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="/" className={props.pathname === "/" ? activeRouteClasses : nonActiveRouteClasses}>
          Home
          </Link>
          <Link href="/schemes" className={props.pathname === "/schemes" ? activeRouteClasses : nonActiveRouteClasses}>
            Schemes
          </Link>
          <Link href="/lesson-plans" className={props.pathname === "/lesson-plans" ? activeRouteClasses : nonActiveRouteClasses}>
            Lesson Plans
          </Link>
          <Link href="/profile" className={props.pathname === "/profile" ? activeRouteClasses : nonActiveRouteClasses}>
            Profile
          </Link>
          <Link href="/help" className={props.pathname === "/help" ? activeRouteClasses : nonActiveRouteClasses}>
            Help
          </Link>
          <Link href="/settings" className={props.pathname === "/settings" ? activeRouteClasses : nonActiveRouteClasses}>
            Settings
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? (
              <FontAwesomeIcon
                icon={faClose}
                className=""
                style={{ color: "white", fontSize: 24 }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faBarsStaggered}
                className=""
                style={{ color: "white", fontSize: 24 }}
              />
            )}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-orange-500">
          <Link href="/schemes" className="block text-white px-4 py-2">
            Schemes
          </Link>
          <Link href="/lesson-plans" className="block text-white px-4 py-2">
            Lesson Plans
          </Link>
          <Link href="/profile" className="block text-white px-4 py-2">
            Profile
          </Link>
          <Link href="/help" className="block text-white px-4 py-2">
            Help
          </Link>
          <Link href="/settings" className="block text-white px-4 py-2">
            Settings
          </Link>
        </div>
      )}
    </nav>
  );
}
