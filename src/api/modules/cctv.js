import { axiosClient, resolver } from "../client";

export default {
  async setSystemStatus(data) {
    return resolver(await axiosClient.put("cctv/settings/change", data));
  },
  async validateSystemId(systemId) {
    return resolver(await axiosClient.get(`cctv/validate/${systemId}`));
  },
  async getSubscribedUsers(systemId, token) {
    return resolver(
      await axiosClient.get(`cctv/subscribed/${systemId}`, {
        headers: { Authorization: token },
      })
    );
  },
  async deleteSubscribedUser(userId) {
    return resolver(
      await axiosClient.delete("cctv/subscribed/user", { userId: userId })
    );
  },
  async createSystem(data, token) {
    return resolver(
      await axiosClient.post("cctv/add", data, {
        headers: {
          Authorization: token,
        },
      })
    );
  },
};
