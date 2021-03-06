import { axiosClient } from './axiosClient';

const LoginAPI = {
    check(token) {
        const url = `/check`;
        return axiosClient.post(url, {token: token});
    },
    login(account) {
        const url = `/signin`;
        return axiosClient.post(url, account);
    },
    signup(account) {
        const url = `/signup`;
        return axiosClient.post(url, account);
    },
}
export default LoginAPI;