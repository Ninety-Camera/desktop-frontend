import { localAxiosClient, localResolver } from "../client";

export default {
  async addCamera(data) {
    return localResolver(await localAxiosClient.post("add/camera", data));
  },
};
