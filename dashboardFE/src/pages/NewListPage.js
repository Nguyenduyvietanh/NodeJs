import NewAPI from "../api/NewAPI";
import { $ } from '../utils';
const ListNew = {
    async render() {
        const { data: news } = await NewAPI.getAll();

        return  /*html*/`
        <h1 style= "text-align: center; color: red;"> Danh Sách Tin Tức </h1>
            <div id="list-news">
                <div class="row">
                    <div class="col-10">
                    </div>
                    <div class="col-2 d-flex justify-content-center align-items-center">
                        <a href="#/addnews" class="btn btn-primary">Thêm mới tin tức</a>
                    </div>
                </div>
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tiêu đề</th>
                            <th scope="col">Ảnh</th>
                            <th scope="col">Mô tả</th>
                            <th scope="col">Người viết</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${news.map(listnew => {
            return `
                                <tr>
                                    <td>${listnew.id}</td>
                                    <td><p>${listnew.title}</p></td>
                                    <td><img src="${listnew.image}" style="width:70px; height: 70px; "  alt=""></td>
                                    <td><p>${listnew.description}</p></td>
                                    <td><p>${listnew.name}</p></td>
                                    <td>
                                        <a href="/#/updatenews/${listnew.id}" class="btn btn-primary">Update</a>
                                        <button class="btn btn-danger btn-remove remove-news" data-id="${listnew.id}">Remove</button>
                                    </td>
                                </tr>
                            `
        }).join(' ')}
                    </tbody>
                </table>
            </div>
        `
    },
    async afterRender() {
        // const str = $('#detail');
        // const res = str.replace(str.substring(200), "...");
        // $('#detail').innerHTML = res;


        // console.log(str);
        const btns = $('#list-news .remove-news');
        // console.log(btns);
        btns.forEach(btn => {
            const id = btn.dataset.id;
            btn.addEventListener('click', function () {
                const question = confirm('Bạn có chắc chắn muốn xóa không?')
                if (question) {
                    NewAPI.remove(id);
                    location.reload();
                }
            })
        });
    }
}



export default ListNew;