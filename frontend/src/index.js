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
import topHeader from './components/top-header.js';
import Singup from './pages/Singup.js';

const routes = {
    '/': home,
    '/products/:id': ProductDetailPage,
    '/category/:id': CategoryPage,
    '/contact': Contact,
    '/news': News,
    '/newdetail/:id': NewDetail,
    '/login': Login,
    '/singup' : Singup
}

const router = async () => {
    try {
        const request = parseRequestUrl();

        const parseUrl = (request.resource ? `/${request.resource}` : '/') +
            (request.id ? '/:id' : '');
        const screen = routes[parseUrl];
        if (parseUrl == '/login') {

            $('#body-content').innerHTML = "";
            $('#login').innerHTML = await screen.render();
            await screen.afterRender();
        }
        if  (parseUrl == '/singup') {
            $('#body-content').innerHTML = "";
            $('#singup').innerHTML = await screen.render();
            await screen.afterRender();
        }
        $('#top-header').innerHTML = await topHeader.render();
        await topHeader.afterRender();
        $('#header').innerHTML = await Header.render();
        await Header.afterRender();
        $('#main-content').innerHTML = await screen.render();
        if (
            screen === ProductDetailPage ||
            screen === CategoryPage ||
            screen === Contact ||
            screen === News ||
            screen === NewDetail ||
            screen === Login
        ) {
            await screen.afterRender();
        }
    } catch (error) {
        const main = $("#main-content");
        console.log(error);
        main.innerHTML = await Error404Page.render();
    }

}
window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router)