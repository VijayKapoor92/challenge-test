import axios from "axios";
import CategoriasAPI from "./categorias";

const api = axios.create({
  baseURL: "http://localhost:3001/api"
});

export {
  CategoriasAPI
}
export default api;