import { axiosClient, resolver } from "../client";

export default {
  async addCamera(data, token) {
    return resolver(
      await axiosClient.post("camera/add", data, {
        headers: { Authorization: token },
      })
    );
  },
  async getCameras(systemId, token) {
    return resolver(
      await axiosClient.get(`camera/${systemId}`, {
        headers: { Authorization: token },
      })
    );
  },
};
