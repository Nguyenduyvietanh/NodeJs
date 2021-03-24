import CategoryAPI from '../api/categoryAPI';
import { parseRequestUrl, $ } from '../utils';

const CategoryUpdate = {
    async render() {
        const { id } = parseRequestUrl();
        const { data: category } = await CategoryAPI.get(id);
        return /*html*/`
        <h1 style= "text-align: center; color: red;"> Sửa Danh Mục </h1>
            <form id="form-update">
                <div class="form-group">
                    <div class="row">
                        <div class="col-12 mb-3">
                            <label for="name">Tên danh mục sản phẩm <b class="text-danger">*</b></label>
                            <input type="text" placeholder="Nhập danh mục sản phẩm" id="category-name" class="form-control" value="${category.name}" />
                            <p id="validate-name"></p>
                        </div>
                        <div class="col-12">
                            <input type="submit" class="btn btn-primary w-100" value="Xác nhận" />
                        </div>
                    </div>
                </div>
            </form>
        `
    },

    async afterRender() {
        $('#form-update').addEventListener('submit', async e => {
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
            const { id } = parseRequestUrl();
            const { data: category } = await CategoryAPI.get(id);
            const newCategory = {
                ...category,
                name: $('#category-name').value,
            }
            CategoryAPI.update(id, newCategory);
            alert('Chỉnh sửa danh mục thành công');
            location.href = '/'
        })
    }
}

export default CategoryUpdate;