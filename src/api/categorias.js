import api from "./";

const CategoriasAPI = {

  getAll: async () => {
    try {
      const response = await api.get("/categorias");
      return response.data;
    } catch(error) {
      console.error(error);
    }
  },

  add: async (nm_categoria) => {
    try {
      const response = await api.post("/categorias", { nm_categoria });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  edit: async (categoria) => {
    try {
      const response = await api.put(`/categorias/${categoria.id_categoria}`, {...categoria});
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  delete: async (id_categoria) => {
    try {
      const response = await api.delete(`/categorias/${id_categoria}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  export: async (id_categoria) => {
    try {
      const { data } = await api.post(`/categorias/${id_categoria}/export`);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

}

export default CategoriasAPI;