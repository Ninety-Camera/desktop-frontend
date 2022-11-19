import { localAxiosClient, localResolver } from "../client";

export default {
  async addCamera(data) {
    return localResolver(await localAxiosClient.post("add/camera", data));
  },
  async deleteCamera(camId) {
    return localResolver(
      await localAxiosClient.delete(`delete/camera/${camId}`)
    );
  },
  async sendSystemId(systemId) {
    return localResolver(
      await localAxiosClient.post("/system", { id: systemId })
    );
  },
};
