import userApi from '../api/userApi'
import LoginAPI from '../api/LoginAPI';
import { $ } from '../utils'


const Header = {
  async render() {
    let token = localStorage.getItem('token')
    let user = {};
    if (token) {
      const { data: check } = await LoginAPI.check(token);
      const { data } = await userApi.get(check.userId);
      user = data;
    }
    return /*html*/`
            <form class="navbar-form">
              <div class="input-group no-border">
                <input style="margin-top: 3px; height: 39px;" type="text" value="" class="form-control" placeholder="Search...">
                <button type="submit" class="btn btn-white btn-round btn-just-icon">
                  <i class="material-icons">search</i>
                  <div class="ripple-container"></div>
                </button>
              </div>
            </form>
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="">
                  <i class="material-icons">dashboard</i>
                  <p class="d-lg-none d-md-block">
                    Stats
                  </p>
                </a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
                  aria-expanded="false">
                  <i class="material-icons">notifications</i>
                  <span class="notification">5</span>
                  <p class="d-lg-none d-md-block">
                    Some Actions
                  </p>
                </a>
              </li>
              <li class="nav-item dropdown">
                <a href="#" class="nav-link" href="" id="logout">
                   Đăng xuất(${ user.name })
                </a>
              </li>
            </ul>
        `
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
  

export default Header;