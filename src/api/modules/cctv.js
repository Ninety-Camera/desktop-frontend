import { axiosClient, resolver } from "../client";

export default {
  async setSystemStatus(data) {
    return resolver(await axiosClient.put("cctv/settings/change", data));
  },
  async validateSystemId(systemId) {
    return resolver(await axiosClient.get(`cctv/validate/${systemId}`));
  },
  async getSubscribedUsers(systemId) {
    return resolver(await axiosClient.get(`cctv/subscribed/${systemId}`));
  },
  async deleteSubscribedUser(userId) {
    return resolver(
      await axiosClient.delete("cctv/subscribed/user", { userId: userId })
    );
  },
};
