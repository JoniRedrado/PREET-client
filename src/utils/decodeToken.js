export function decodeToken(token) {
  let decodeToken;

  try {
    decodeToken = JSON.parse(atob(token.split(".")[1]));
  } catch (error) {
    console.error("Error al parsear token", error);
  }

  return decodeToken;
}
