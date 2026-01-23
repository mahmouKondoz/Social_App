import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import img1 from "../../assets/pngtree-default-avatar-profile-icon-gray-placeholder-vector-png-image_16213764.png";
import { ContextLogin } from "../../Context/ContextLogin";
import { ContextUserInfo } from "../../Context/ContextUserInfo";

export default function NavBar() {
  let { getToken, setGettoken } = useContext(ContextLogin);
  let { data } = useContext(ContextUserInfo);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 z-20 w-full bg-black border-b border-slate-700 shadow-2xl shadow-slate-500">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
         
          <Link
            to="/"
            className="text-sky-300 font-semibold text-3xl sm:text-4xl hover:scale-110 duration-300"
          >
            Social App <i className="fa-brands fa-bluesky"></i>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Logged In */}
            {getToken ? (
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center focus:outline-none"
                >
                  <img
                    className="w-9 h-9 rounded-full border border-sky-300"
                    src={data?.photo}
                    alt="user"
                  />
                </button>

                {/* Dropdown */}
                {open && (
                  <div className="absolute right-0 mt-3 w-44 bg-neutral-900 border border-slate-700 rounded-xl shadow-lg">
                    <div className="px-4 py-3 border-b border-slate-700">
                      <p className="text-sm font-semibold text-white">
                        {data?.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {data?.email}
                      </p>
                    </div>

                    <ul className="p-2 text-sm text-gray-300">
                      <li>
                        <Link
                          to="/profile"
                          className="block px-3 py-2 rounded-lg hover:bg-slate-700"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/login"
                          onClick={() => {
                            localStorage.removeItem("userToken");
                            setGettoken("");
                          }}
                          className="block px-3 py-2 rounded-lg hover:bg-slate-700"
                        >
                          Sign out
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              /* Not Logged In */
              <ul className="hidden sm:flex gap-6 text-sky-300 font-medium">
                <li>
                  <Link to="/login" className="hover:text-white duration-300">
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="hover:text-white duration-300"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            )}

            {!getToken && (
              <button
                className="sm:hidden text-sky-300 text-2xl"
                onClick={() => setMenu(!menu)}
              >
                ☰
              </button>
            )}
          </div>
        </div>

        
        {!getToken && menu && (
          <div className="sm:hidden bg-black border-t border-slate-700 px-4 py-3">
            <ul className="flex flex-col gap-3 text-sky-300">
              <li>
                <Link to="/login" onClick={() => setMenu(false)}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={() => setMenu(false)}>
                  Register
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
