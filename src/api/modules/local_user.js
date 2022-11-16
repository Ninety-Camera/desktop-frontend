import { localAxiosClient, localResolver } from "../client";

export default {
  async sendUserDetails(data) {
    return localResolver(await localAxiosClient.post("add/user", data));
  },
  async getLoogedInUserDetails() {
    return localResolver(await localAxiosClient.get("get/user"));
  },
  async deleteUserDetails() {
    return localResolver(await localAxiosClient.delete("delete/user"));
  },
};
