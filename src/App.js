import React, { useEffect } from "react";

import { CategoriasAPI } from "./api";

function App() {

  useEffect(() => {
    CategoriasAPI.getAll()
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }, []);

  return (
    <div></div>
  );
}

export default App;
