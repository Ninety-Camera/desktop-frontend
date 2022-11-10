import { axiosClient, resolver } from "../client";

export default {
  async validateSession() {
    return resolver(await axiosClient.get("user"));
  },
  async signinUser(data) {
    return resolver(await axiosClient.post("user/login", data));
  },
  async registerUser(data) {
    return resolver(await axiosClient.post("user/register", data));
  },
  async registerMobileDevice(data) {
    return resolver(await axiosClient.post("user/mobile/register", data));
  },
};
