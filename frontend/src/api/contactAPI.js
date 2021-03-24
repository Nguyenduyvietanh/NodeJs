import { axiosClient } from './axiosClient';

const ContactApi = {
    add(contact) {
        const url = `/contacts`;
        return axiosClient.post(url , contact);
    },
    getAll() {
        const url = `/contacts`;
        return axiosClient.get(url);
    }
}

export default ContactApi;
