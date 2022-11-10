import { axiosClient, resolver } from "../client";

export default {
  async setSystemStatus(data) {
    return resolver(await axiosClient.put("cctv/settings/change", data));
  },
  async validateSystemId(systemId) {
    return resolver(await axiosClient.get(`cctv/validate/${systemId}`));
  },
};
