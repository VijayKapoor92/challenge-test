import api from "./";

const ProdutosAPI = {

  getAll: async () => {
    try {
      const { data } = await api.get("/produtos");
      return data;
    } catch(error) {
      console.error(error);
    }
  },

  add: async (produto) => {
    try {
      const { data } = await api.post("/produtos", {...produto});
      return data;
    } catch (error) {
      console.error(error);
    }
  },

  edit: async (produto) => {
    try {
      const { data } = await api.put(`/produtos/${produto.id_produto}`, {...produto});
      return data;
    } catch (error) {
      console.error(error);
    }
  },

  delete: async (id_produto) => {
    try {
      const { data } = await api.delete(`/produtos/${id_produto}`);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

}

export default ProdutosAPI;