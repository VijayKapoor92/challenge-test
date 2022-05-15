import axios from "axios";
import CategoriasAPI from "./categorias";
import ProdutosAPI from "./produtos";

const api = axios.create({
  baseURL: "http://localhost:3001/api"
});

export {
  CategoriasAPI,
  ProdutosAPI
}

export default api;