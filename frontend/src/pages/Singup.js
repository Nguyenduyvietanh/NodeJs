
import LoginAPI from '../api/LoginAPI';
import { $ } from '../utils'
const Singup = {
    async render() {
        return `
            <div class="loginbox" style="background: url(../../image/pic1.jpg);" >
            <img src="../../image/avatar.png" class="avatar">
                <h1>Đăng kí </h1>
                <form id="form-singup">
                    <p>Name</p>
                    <input type="text" id="input-name" placeholder="Enter name">
                    <span id="validate-name" class="text-error">Email không được để trống</span>
                    <p>Email</p>
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
        $('#form-singup').addEventListener('submit', async e => {
            e.preventDefault();
            if(this.validateItem('input-email', 'validate-email') && this.validateItem('input-password', 'validate-password') && this.validateItem('input-name', 'validate-name') ) {
                const account = {
                    name: $('#input-name').value,
                    email: $('#input-email').value,
                    password:  $('#input-password').value,
                }
                const result = await LoginAPI.signup(account);
                if (result.status === 200) {
                    alert('Đăng kí tài khoản thành công !!!')                                 
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

export default Singup;