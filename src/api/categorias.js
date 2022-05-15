import api from "./";

const CategoriasAPI = {

  getAll: async () => {
    try {
      const response = await api.get("/categorias");
      return response;
    } catch(error) {
      console.error(error);
    }
  }

}

export default CategoriasAPI;