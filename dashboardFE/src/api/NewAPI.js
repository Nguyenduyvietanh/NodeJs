import { axiosClient } from './axiosClient';

const NewAPI = {
    getAll() {
        const url = `/news`;
        return axiosClient.get(url);
    },
    get(id) {
        const url = `/news/${id}`;
        return axiosClient.get(url);
    },
    add(neww) {
        const url = `/news`;
        return axiosClient.post(url, neww);
    },

    update(id, neww) {
        const url = `/news/${id}`;
        return axiosClient.put(url, neww);
    },

    remove(id) {
        const url = `/news/${id}`;
        return axiosClient.delete(url);
    }
}
export default NewAPI;