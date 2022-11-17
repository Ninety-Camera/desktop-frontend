import { localAxiosClient, localResolver } from "../client";

export default {
  async getIntrusions() {
    return localResolver(await localAxiosClient.get("get/intrusions"));
  },
};
