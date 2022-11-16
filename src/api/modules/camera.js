import { axiosClient, resolver } from "../client";

export default {
  async addCamera(data) {
    return resolver(await axiosClient.post("camera/add", data));
  },
  
};