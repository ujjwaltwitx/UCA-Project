import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link, useLocation } from "react-router-dom";
import FormIcon, {
  ApprovalIcon,
  DashboardIcon,
  GalleryIcon,
  MailIcon,
  NewFileIcon,
  NewLinkIcon,
  SiteIcon,
  StudentIcon,
} from "./Icons";
import { AnimatePresence } from "framer-motion";
import FormModal from "./FormModal";

export default function Temp({ children }) {
  const [open, setOpen] = useState(false);

  const handleModal = (what) => {
    setOpen(what);
  };

  const mainLinks = [
    {
      id: 1,
      name: "Dashboard",
      route: "./",
      icon: <DashboardIcon />,
    },
    // {
    //   id: 2,
    //   name: "Approvals",
    //   route: "./approvals",
    //   icon: <ApprovalIcon className="w-5 h-5" />,
    // },
    {
      id: 3,
      name: "Mail",
      route: "./mail",
      icon: <MailIcon />,
    },
    {
      id: 5,
      name: "Tutors",
      route: "./tutor",
      icon: <SiteIcon />,
    },
    {
      id: 4,
      name: "Students",
      route: "./students",
      icon: <StudentIcon />,
    },
    {
      id: 6,
      name: "Groups",
      route: "./groups",
      icon: <FormIcon />,
    },
  ];

  const location = useLocation();

  const segments = location.pathname.split("/").filter(Boolean);
  const currentPath = segments[1] || "dashboard";

  const getNav = (route) => {
    const pathParts = route.split("/");
    let lastPart = pathParts[pathParts.length - 1];
    lastPart = lastPart === "" ? "dashboard" : lastPart;

    return currentPath === lastPart ? "bg-blue-200" : "";
  };

  return (
    <div className="min-h-screen w-full bg-grayishBlue bg-opacity-[15%] overflow-y-auto">
      <div className="flex flex-row w-full h-full">
        {/* Left */}
        <div className="w-[16rem] lg:w-[17rem] h-full p-2 flex flex-col bg-white-1 z-20 gap-9  ">
          {/* Title */}
          <h3 className="font-black px-2 text-3xl">CRM</h3>

          <div>
            <button
              onClick={() => handleModal(true)}
              className="p-4 flex items-center gap-1 rounded-xl shadow-md hover:shadow-xl bg-white-og hover:bg-amber-200 transition-all"
            >
              <NewFileIcon className="w-6 h-6" />
              <span className="text-[17px]"> New </span>
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col">
            {mainLinks.map((item) => {
              return (
                <Link
                  key={item.id}
                  to={item.route}
                  target={item.target && item.target}
                  className={`flex items-center text-[15px] gap-2 py-[5px] px-4 rounded-full outline-none hover:bg-zinc-300
                    ${getNav(item.route)}
                  `}
                >
                  <div className="w-5">{item.icon && item.icon}</div>
                  <p>{item.name}</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right */}
        <div className="w-full max-h-[100vh] overflow-hidden">
          <Navbar location={currentPath} />
          <div className="h-[92vh] p-2 overflow-y-auto">
            <div className="w-full h-full rounded-2xl">{children}</div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && <FormModal handleModal={handleModal} />}
      </AnimatePresence>
    </div>
  );
}
