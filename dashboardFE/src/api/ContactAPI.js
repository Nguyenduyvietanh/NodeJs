import { axiosClient } from './axiosClient';

const ContactApi = {
    getAll() {
        const url = `/contacts`;
        return axiosClient.get(url);
    },
    remove(id) {
        const url = `/contacts/${id}`;
        return axiosClient.delete(url);
    }
}

export default ContactApi;
