import fetch from "../config/fetch"
export const login = (data) => fetch("/login", "post", data);
export const logout = () => fetch("/logout", "post", {});