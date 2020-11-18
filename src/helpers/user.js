export function getUser() {
  let user = JSON.parse(localStorage.getItem("katahack_user"));  
  if (user) {
    return user;
  } else {
    return null;
  }
}
