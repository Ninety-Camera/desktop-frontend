/* eslint-disable no-param-reassign */
import axios from "axios";
import { HOSTED_URL, LOCAL_URL } from "../constants";

export const localAxiosClient = axios.create({
  baseURL: LOCAL_URL,
});

// eslint-disable-next-line import/prefer-default-export
export const axiosClient = axios.create({
  baseURL: HOSTED_URL,
});

axiosClient.interceptors.request.use(async (config) => {
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJkYzY5YzczLWY1YTItNDE2Ny04MTIwLWFiZTFlNGMzNDJkYiIsImVtYWlsIjoia2F2ZWVzaGFkaW5hbWlkdUBnbWFpbC5jb20iLCJpYXQiOjE2Njg2MTYzMjksImV4cCI6MTY2ODcxNjMyOX0.2HibadFnwcQbe-n6syHLp8jUGiwQ76Oo1u4g_13WhQA";
  if (token !== "") {
    config.headers.Authorization = token;
  }

  return config;
});

// eslint-disable-next-line import/prefer-default-export
export async function localResolver(axiosResponse) {
  try {
    const response = await axiosResponse;

    if (response?.status === 200 || response?.status === 201) {
      return response;
    }
    return new Error("Error");
  } catch (e) {
    return new Error("Error");
  }
}

// eslint-disable-next-line import/prefer-default-export
export async function resolver(axiosResponse) {
  try {
    const response = await axiosResponse;

    if (response?.status === 200 || response?.status === 201) {
      return response;
    }
    return new Error("Error");
  } catch (e) {
    return new Error("Error");
  }
}
