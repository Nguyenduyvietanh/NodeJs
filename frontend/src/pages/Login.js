import LoginAPI from "../api/LoginAPI";
import { $ } from "../utils";

const Login = {
    async render() {
        return `
            <div class="login-form">
                <form id="form-login">
                    <div class="form-group">
                        <label for="inputEmail">Email address</label>
                        <input type="email" class="form-control" id="input-email" aria-describedby="emailHelp" placeholder="Enter email">
                        <span id="validate-email" class="text-error">Email không được để trống</span>
                    </div>
                    <div class="form-group">
                        <label for="inputPassword">Password</label>
                        <input type="password" class="form-control" id="input-password" placeholder="Password">
                        <span id="validate-password" class="text-error">Password không được để trống</span>
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
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
                    console.log(result);
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