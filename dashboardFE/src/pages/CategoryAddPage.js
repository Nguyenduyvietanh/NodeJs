import CategoryAPI from '../api/categoryAPI';
import { $ } from '../utils.js';

const CategoryAddPage = {
    async render() {
        return /*html*/`
        <h1 style= "text-align: center; color: red;"> Thêm Danh Mục </h1>
            <form id="form-add">
                <div class="form-group">
                    <div class="row">
                        <div class="col-12 mb-3">
                            <label for="name">Tên danh mục sản phẩm <b class="text-danger">*</b></label>
                            <input type="text" placeholder="Nhập danh mục sản phẩm" id="category-name" class="form-control" />
                            <p id="validate-name"></p>
                        </div>
                        <div class="col-12">
                            <input type="submit" class="btn btn-primary w-100" value="Thêm danh mục mới" />
                        </div>
                    </div>
                </div>
            </form>
        `
    },

    async afterRender() {
        $('#form-add').addEventListener('submit', async e => {
            e.preventDefault();
            if (!$('#category-name').value) {
                $('#validate-name').innerHTML = 'Tên danh mục không được để trống';
                $('#validate-name').style.color = 'red';
                $('#category-name').style.borderColor = 'red';
                return;
            }
            $('#validate-name').innerHTML = '';
            $('#validate-name').style.color = '';
            $('#category-name').style.borderColor = '';
            const { data: categories } = await CategoryAPI.getAll();
            const category = {
                id: categories.length + 1,
                name: $('#category-name').value,
            }
            CategoryAPI.add(category);
            alert('Thêm mới danh mục thành công');
            window.location.href = '/'
        })
    },
}

export default CategoryAddPage;