import api from "./";

const CategoriasAPI = {

  getAll: async () => {
    try {
      const response = await api.get("/categorias");
      return response;
    } catch(error) {
      console.error(error);
    }
  },

  add: async (categoria) => {
    try {
      const response = await api.post("/categorias", {...categoria});
      return response;
    } catch (error) {
      console.error(error);
    }
  },

  edit: async (categoria) => {
    try {
      const response = await api.put(`/categorias/${categoria.id_categoria}`, {...categoria});
      return response;
    } catch (error) {
      console.error(error);
    }
  },

  delete: async (id_categoria) => {
    try {
      const response = await api.delete(`/categorias/${id_categoria}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

}

export default CategoriasAPI;