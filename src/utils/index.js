export const 
  
  setBlob = data => {
    return new Blob([ JSON.stringify(data) ], { type: 'application/json' });
  },

  downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;

    const clickHandler = () => {
      setTimeout(() => {
        URL.revokeObjectURL(url);
        a.removeEventListener("click", clickHandler);
      }, 1);
    };

    a.addEventListener("click", clickHandler);
    a.click();
  },

  retiraAcentos = str => {
    const ca = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
    const sa = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
    
    let novastr = "";
    let troca;
    
    for (let i = 0; i < str.length; i++) {
      troca = false;
      for (let j = 0; j < ca.length; j++) {
        if (str.substr(i, 1) === ca.substr(j, 1)) {
          novastr += sa.substr(j, 1);
          troca = true;
          break;
        }
      }
      
      if (!troca)
        novastr += str.substr(i, 1);
    }

    return novastr;
  }

;