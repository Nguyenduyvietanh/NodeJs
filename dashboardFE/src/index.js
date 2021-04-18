import Error404Page from './pages/Error404Page.js';
import ProductsPage from './pages/ProductsPage.js';
import { parseRequestUrl, $ } from './utils.js';
import ProductAddPage from './pages/ProductAddPage.js';
import ProductEditPage from './pages/ProductEditPage.js';
import ListCategory from './pages/ListCategory.js';
import CategoryAddPage from './pages/CategoryAddPage.js';
import CategoryUpdate from './pages/CategoryUpdate.js';
import ListContact from './pages/listContact.js';
import ListNewPage from './pages/NewListPage.js';
import NewAddPage from './pages/NewAddPage.js';
import NewUpdatePage from './pages/NewUpdatePage.js';
import LoginAPI from './api/LoginAPI';
import Login from './pages/Login';
import Header from './components/Header';

const routes = {
    '/': ListCategory,
    '/products': ProductsPage,
    '/addproduct': ProductAddPage,
    '/editproduct/:id': ProductEditPage,
    '/addcategory': CategoryAddPage,
    '/updatecategory/:id': CategoryUpdate,
    '/contacts': ListContact,
    '/news': ListNewPage,
    '/addnews': NewAddPage,
    '/updatenews/:id': NewUpdatePage,
    '/login': Login
}

const router = async () => {
    const token = localStorage.getItem('token');

    const { data: check } = await LoginAPI.check(token);

    const request = parseRequestUrl();
    const parseUrl = check !== 403 && check.role === 1 ? (request.resource ? `/${request.resource}` : '/') + (request.id ? '/:id' : '') : '/login';
        
    if (check === 403 || check.role !== 1) {
        alert('Vui lòng đăng nhập để truy cập vào trang quản lý !!!')
    }
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Page;
    if (parseUrl == '/' || parseUrl == '/updatecategory') {
        document.getElementById("title").innerHTML = 'Quản lý danh mục';
    } else if (parseUrl == '/products') {
        document.getElementById("title").innerHTML = 'Quản lý sản phẩm';
    } else if (parseUrl == '/contacts') {
        document.getElementById("title").innerHTML = 'Quản lý liên hệ';
    } else if (parseUrl == '/news') {
        document.getElementById("title").innerHTML = 'Quản lý tin tức';
    }
    $('#main-content').innerHTML = await screen.render();
    $('#header').innerHTML = await Header.render();
    await screen.afterRender();
}
window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router)