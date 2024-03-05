import axios from "axios";
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { BASE_URL } from "../constant.js";

export const login = async (username, password) => {
  try {
    const user = await axios.post(`${BASE_URL}/admin/login`, {
      username,
      password,
    });
    console.log(user);
    localStorage.setItem("crmtoken", user?.data?.token);
    window.location.href = "/dashboard";
  } catch (error) {
    throw error;
  }
};

export const signup = async (username, password) => {
  try {
    const user = await axios.post(`${BASE_URL}/admin/signup`, {
      username,
      password,
    });
    localStorage.setItem("crmtoken", user?.data?.token);
    window.location.href = "/dashboard";
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem("crmtoken");
    window.location.href = "/auth/login";
  } catch (error) {
    throw error;
  }
};
