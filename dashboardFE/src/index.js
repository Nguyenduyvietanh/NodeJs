import Error404Page from './pages/Error404Page.js';
import ProductsPage from './pages/ProductsPage.js';
import { parseRequestUrl, $ } from './utils.js';
import ProductAddPage from './pages/ProductAddPage.js';
import ProductEditPage from './pages/ProductEditPage.js';
import ListCategory from './pages/ListCategory.js';
import CategoryAddPage from './pages/CategoryAddPage.js';
import CategoryUpdate from './pages/CategoryUpdate.js';
import Login from './pages/Login.js';
import ListContact from './pages/listContact.js';
import ListNewPage from './pages/NewListPage.js';
import NewAddPage from './pages/NewAddPage.js';
import NewUpdatePage from './pages/NewUpdatePage.js';

const routes = {
    '/': ListCategory,
    '/products': ProductsPage,
    '/addproduct': ProductAddPage,
    '/editproduct/:id': ProductEditPage,
    '/addcategory': CategoryAddPage,
    '/updatecategory/:id': CategoryUpdate,
    '/login': Login,
    '/contacts': ListContact,
    '/news': ListNewPage,
    '/addnews': NewAddPage,
    '/updatenews/:id': NewUpdatePage,
}

const router = async () => {
    const request = parseRequestUrl();
    const token = localStorage.getItem('token');
    
    // console.log(token);
    if (token) {
        const parseUrl = (request.resource ? `/${request.resource}` : '/') +
            (request.id ? '/:id' : '');
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
    
        if (parseUrl == '/login') {
            document.getElementById('body-content').style.display = 'none';
            $('#login').innerHTML = await screen.render();
            await screen.afterRender();
        } else {
            $('#main-content').innerHTML = await screen.render();
            await screen.afterRender();
        }
    } else {
        const parseUrl = '/login';
        const screen = routes[parseUrl] ? routes[parseUrl] : Error404Page;
    
        if (parseUrl == '/login') {
            document.getElementById('body-content').style.display = 'none';
            $('#login').innerHTML = await screen.render();
            await screen.afterRender();
        } 
    }
}
window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router)