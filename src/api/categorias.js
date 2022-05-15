import api from "./";

const CategoriasAPI = {

  getAll: async () => {
    console.log("Entrou");
    try {
      console.log("Dispatch");
      const response = await api.get("/categorias");
      console.log(response);
      return response;
    } catch(error) {
      console.error(error);
    }
  }

}

export default CategoriasAPI;