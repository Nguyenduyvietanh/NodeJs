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
}
export default NewAPI;