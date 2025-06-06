import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(removeUser());
    navigate('/login');
  };

  // To manually blur the dropdown trigger to close the menu
  const closeDropdown = () => {
    document.activeElement?.blur();
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <a
          onClick={() => {
            navigate('/');
          }}
          className="btn btn-ghost text-xl"
        >
          👨🏻‍💻 DevTinder
        </a>
      </div>
      <div className="flex gap-2">
        {user?.firstName && (
          <div className="flex items-center">
            <div>Welcome, {user.firstName}</div>
            <div className="dropdown dropdown-end mx-5">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="User avatar" src={user.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a
                    onClick={() => {
                      closeDropdown();
                      navigate('/profile');
                    }}
                    className="justify-between"
                  >
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      closeDropdown();
                      navigate('/connections');
                    }}
                  >
                    Connections
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      closeDropdown();
                      navigate('/recieved');
                    }}
                  >
                    Recieved
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      closeDropdown();
                      navigate('/premium');
                    }}
                  >
                    Premium
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      closeDropdown();
                      handleLogout();
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
