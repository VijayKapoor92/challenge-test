import axios from "axios";
import CategoriasAPI from "./categorias";
import ProdutosAPI from "./produtos";

const api = axios.create({
  baseURL: "http://localhost:8080/api"
});

export {
  CategoriasAPI,
  ProdutosAPI
}

export default api;