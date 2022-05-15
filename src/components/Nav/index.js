import React from "react";
import { Link } from "react-router-dom";

const links = ([
  { name: "Categorias", to: "/" },
  { name: "Produtos", to: "/produtos" }
]);

const Nav = () => {
  return (
    <nav>
      <ul>
        {links.map(link => (
          <li key={link.name}>
            <Link to={link.to}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav;