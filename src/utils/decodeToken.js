// export function decodeToken(token) {
//   let decodeToken;

//   try {
//     if(token){
//       decodeToken = JSON.parse(atob(token.split(".")[1]));
//     }else
//     console.log(token);
//   } catch (error) {
//     console.error("Error al parsear token", error);
//   }

//   return decodeToken;
// }

export function decodeToken(token) {
  try {
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken;
    } else {
      console.error('El token está vacío o indefinido');
      return null;
    }
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
}