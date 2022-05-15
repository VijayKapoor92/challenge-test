import api from "./";

const ProdutosAPI = {

  getAll: async () => {
    try {
      const response = await api.get("/produtos");
      return response;
    } catch(error) {
      console.error(error);
    }
  },

  add: async (produto) => {
    try {
      const response = await api.post("/produtos", {...produto});
      return response;
    } catch (error) {
      console.error(error);
    }
  },

  edit: async (produto) => {
    try {
      const response = await api.put(`/produtos/${produto.id_produto}`, {...produto});
      return response;
    } catch (error) {
      console.error(error);
    }
  },

  delete: async (id_produto) => {
    try {
      const response = await api.delete(`/produtos/${id_produto}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

}

export default ProdutosAPI;