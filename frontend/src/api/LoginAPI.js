import { axiosClient } from './axiosClient';

const LoginAPI = {
    login(account) {
        const url = `/signin`;
        return axiosClient.post(url, account);
    },
}
export default LoginAPI;