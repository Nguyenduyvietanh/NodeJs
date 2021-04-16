import home from './pages/Home.js';
import Error404Page from './pages/Error404Page.js';
import ProductDetailPage from './pages/ProductDetailPage.js';
import { parseRequestUrl, $ } from './utils.js';
import Header from './components/Header.js';
import CategoryPage from './pages/CategoryPage.js';
import Contact from './pages/Contact.js';
import News from './pages/news.js';
import NewDetail from './pages/NewDetail.js';
import Login from './pages/Login.js';

const routes = {
    '/': home,
    '/products/:id': ProductDetailPage,
    '/category/:id': CategoryPage,
    '/contact': Contact,
    '/news': News,
    '/newdetail/:id': NewDetail,
    '/login': Login
}

const router = async () => {
    const request = parseRequestUrl();

    const parseUrl = (request.resource ? `/${request.resource}` : '/') +
        (request.id ? '/:id' : '');
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Page;
    if (parseUrl == '/login'){
       
        $('#body-content').innerHTML = "";
        $('#login').innerHTML = await screen.render();
        await screen.afterRender();
    }
    $('#header').innerHTML = await Header.render();
    $('#main-content').innerHTML = await screen.render();
    await screen.afterRender();
}
window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router)