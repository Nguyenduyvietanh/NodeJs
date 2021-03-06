import LoginAPI from "../api/LoginAPI";
import { $ } from "../utils";


const Login = {
    async render() {
        return `
            <div class="loginbox" style="background: url(../../image/pic1.jpg);" >
            <img src="../../image/avatar.png" class="avatar">
                <h1>Đăng Nhập</h1>
                <form id="form-login">
                    <p>Username</p>
                    <input type="email" id="input-email" placeholder="Enter email">
                    <span id="validate-email" class="text-error">Email không được để trống</span>
                    <p>Password</p>
                    <input type="password"  id="input-password" placeholder="Password">
                    <span id="validate-password" class="text-error">Password không được để trống</span>
                    <input type="submit" name="" value="Login">
                    <a href="http://localhost:8080">Trang Chủ</a><br>
                </form>
                
            </div>
        `
    },

    async afterRender() {
        $('#form-login').addEventListener('submit', async e => {
            e.preventDefault();
            if(this.validateItem('input-email', 'validate-email') && this.validateItem('input-password', 'validate-password')) {
                console.log('oke hihi');
                const account = {
                    email: $('#input-email').value,
                    password:  $('#input-password').value,
                }
                const result = await LoginAPI.login(account);
                if (result.status === 200) {               
                    console.log('Login thành công');
                    localStorage.setItem('token', result.data.token);
                    window.location.href = '/'
                }
            }
        })
    },

    validateItem(id, idText) {
        if(!document.getElementById(id).value) {
            document.getElementById(idText).style.display = 'block';
            document.getElementById(id).style.borderColor = 'red';
            return false;
        }
        document.getElementById(idText).style.display = 'none';
        document.getElementById(id).style.borderColor = '';
        return true;
    }
}

export default Login;