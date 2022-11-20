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
  async getCCTVSystem(userId, token) {
    return resolver(
      await axiosClient.get(`user/system/${userId}`, {
        headers: { Authorization: token },
      })
    );
  },
  async checkUserToken(token) {
    return resolver(
      await axiosClient.get("user", {
        headers: { Authorization: token },
      })
    );
  },
  async sendResetPasswordEmail(data) {
    return resolver(await axiosClient.post("user/reset", data));
  },
  async resetUserPassword(data) {
    return resolver(await axiosClient.put("user/reset", data));
  },
};
