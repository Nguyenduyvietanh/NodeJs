import { $ } from "../utils";

const Login = {
    async render() {
        return `
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
        `
    },

    async afterRender() {
        $('#form-login').addEventListener('submit', async e => {
            e.preventDefault();
            if(this.validateItem('input-email', 'validate-email') && this.validateItem('input-password', 'validate-password')) {
                
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