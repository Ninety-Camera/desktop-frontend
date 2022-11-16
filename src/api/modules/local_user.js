import { localAxiosClient, localResolver } from "../client";

export default {
  async sendUserDetails(data) {
    return localResolver(await localAxiosClient.post("add/user", data));
  },
};
