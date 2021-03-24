import { axiosClient } from './axiosClient';

const CategoryAPI = {
    getAll() {
        const url = `/categories`;
        return axiosClient.get(url);
    },
    get(id) {
        const url = `/categories/${id}`;
        return axiosClient.get(url);
    },
    add(category) {
        const url = `/categories`;
        return axiosClient.post(url, category);
    },

    update(id, category) {
        const url = `/categories/${id}`;
        return axiosClient.put(url, category);
    },

    remove(id) {
        const url = `/categories/${id}`;
        return axiosClient.delete(url);
    }
}
export default CategoryAPI;