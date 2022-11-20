import { localAxiosClient, localResolver } from "../client";

export default {
  async getIntrusions() {
    return localResolver(await localAxiosClient.get("get/intrusions"));
  },
  async getIntrusionImages(intrusionId, image) {
    return localResolver(
      await localAxiosClient.get(`get/image/${intrusionId}/${image}`)
    );
  },
  async openIntrusionVideo(intrusionId) {
    return localResolver(
      await localAxiosClient.get(`get/intrusion_video/${intrusionId}`)
    );
  },
};
