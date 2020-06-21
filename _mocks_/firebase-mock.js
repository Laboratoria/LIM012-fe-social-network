const storage = () => {
  return {
    ref : (refPath) => {
      return {
        put : (file) => {
          return new Promise((resolve) => {
            resolve('El file '+file+' fue agregado a '+refPath);
          })
        },
        child: (path) => {
          return {
            getDownloadURL : () => {
              return new Promise((resolve) => {
                resolve('Se obtuvo archivo de la carpeta '+path);
              })
            }
          }
        }
      }
    }
  }
}

const firebase = {
  storage,
};
export default jest.fn(() => {
  return firebase;
});
