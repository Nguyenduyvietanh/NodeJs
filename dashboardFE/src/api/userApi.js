import { axiosClient } from './axiosClient';

const userApi = {
    getAll() {
        const url = `/user`;
        return axiosClient.get(url);
    },

    get(id) {
        const url = `/user/${id}`;
        return axiosClient.get(url);
    },
}
export default userApi;