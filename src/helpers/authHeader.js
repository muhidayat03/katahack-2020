export function authHeader() {
  let user = JSON.parse(localStorage.getItem("katahack_user"));
  if (user) {
    console.log(user);
    return {
      headers: { Authorization: `Bearer ${user.token}` },
    };
  } else {
    return {};
  }
}
