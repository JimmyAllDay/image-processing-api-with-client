import axios from "axios";

//! Prod axiosInstance is below and must be used on future builds
//! export const axiosInstance = axios.create({
//!   baseURL: "https://jimmyallday-image-api.herokuapp.com/",
//! });

//!Used below for debugging deploy errors
export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
});
