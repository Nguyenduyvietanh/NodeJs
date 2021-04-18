import userApi from './../api/userApi';
import LoginAPI from '../api/LoginAPI';
import { $ } from '../utils'

const topHeader = {
    async render() {
        let token = localStorage.getItem("token");

        let topHeader = '';

        if (token) {
            const { data: check } = await LoginAPI.check(token);
            const { data: user } = await userApi.get(check.userId);
            topHeader = `
            <a href="#">Đổi Mật Khẩu</a> |
            ${user.role === 1 ? `<a href="http://localhost:8000">Trang Quản Lý</a> |` : ''}
            <a href="#" id="logout">Đăng xuất (${user.name}) </a> 
        `
        } else {
            topHeader = `
            <a href="#/login">Đăng nhập</a> |
            <a href="/#/singup">Đăng kí</a>
         `
        }

        return topHeader;
    },

    async afterRender() {
        let btnLogoutHead = $("#logout")
        if (btnLogoutHead.length !== 0) {
            await $("#logout").addEventListener("click", () => {
                console.log("chay");
                localStorage.clear();
                location.reload();
            });
        }
    },
}

export default topHeader;