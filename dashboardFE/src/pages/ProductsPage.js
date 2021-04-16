import ProductApi from '../api/ProductApi';
import CategoryAPI from '../api/categoryAPI';
import { $ } from '../utils';

const ProductsPage = {
    async render() {
        const { data: products } = await ProductApi.getAll();
        const { data: { categories } } = await CategoryAPI.getAll();
        return /*html*/`
        <h1 style= "text-align: center; color: red;"> Danh Sách Sản Phẩm </h1>
        <div id="list-products">
            <div class="row">
                <div class="col-10">
                </div>
                <div class="col-2 d-flex justify-content-center align-items-center">
                    <a href="/#/addproduct" class="btn btn-primary">Thêm mới sản phẩm</a>
                </div>
            </div>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Mô tả</th>
                        <th scope="col">Giá sản phẩm</th>
                        <th scope="col">Ảnh sản phẩm</th>
                        <th scope="col">Danh mục</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${products.map(product => {
            return `
                            <tr>
                                <td>${product._id}</td>
                                <td><p>${product.name}</p></td>
                                <td><p>${product.description}</p></td>
                                <td>${product.price}</td>
                                <td><img src="${product.photo}" style="width:70px; height: 70px; "  alt=""></td>  
                                <td>${categories.map(category => {
                if (category._id == product.category) return category.name;
            }).join(' ')
                }
                                </td>
                                <td>${product.quantity}</td>
                                <td>
                                    <a href="/#/editproduct/${product._id}" class="btn btn-primary">Update</a>
                                    <button class="btn btn-danger btn-remove remove-product" data-id="${product._id}">Remove</button>
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
        const btns = $('#list-products .remove-product');
        btns.forEach(btn => {
            const id = btn.dataset.id;
            btn.addEventListener('click', function () {
                const question = confirm('Bạn có chắc chắn muốn xóa không?')
                if (question) {
                    ProductApi.remove(id);
                    location.reload();
                }
            })
        })
    }
}

export default ProductsPage;