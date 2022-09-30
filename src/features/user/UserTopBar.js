import React from "react";

import { Navbar, Button, Dropdown } from "react-daisyui";

import { useAuth } from "../../providers/AuthProvider";

export default ({ dataTheme, ...args }) => {
  const { logout } = useAuth();
  return (
    <Navbar className="px-1.5 font-sans" color="dark" dataTheme={dataTheme}>
      <Navbar.Start>
        <span className="text-lg font-bold">USER</span>
      </Navbar.Start>
      <Navbar.End>
        <Dropdown horizontal="left" dataTheme={dataTheme}>
          <Dropdown.Toggle color="ghost">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-52 z-50">
            <Dropdown.Item>Configuraciones</Dropdown.Item>
            <Dropdown.Item onClick={logout}>Cerrar Sesión</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.End>
    </Navbar>
  );
};
