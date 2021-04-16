import ProductApi from '../api/ProductApi';
import CategoryAPI from '../api/categoryAPI';
import { parseRequestUrl, $ } from '../utils';
import firebase from 'firebase';
import { firebaseConfig } from '../firebbase/index.js';

const ProductEditPage = {
    async render() {
        const { id } = parseRequestUrl();
        const { data: product } = await ProductApi.get(id);
        const { data: { categories } } = await CategoryAPI.getAll();
        console.log(categories);
        return /*html*/`
        <h1 style= "text-align: center; color: red;"> Sửa Sản Phẩm </h1>
            <form id="form-update">
                <div class="form-group">
                    <div class="row">
                        <div class="col-12 mb-3">
                            <label for="name">Tên sản phẩm <b class="text-danger">*</b></label>
                            <input type="text" placeholder="Nhập tên sản phẩm" id="product-name" class="form-control" value="${product.name}" />
                            <span id="validate-name" class="text-error">Tên sản phẩm không được để trống</span>
                        </div>
                        <div class="col-12 mb-3">
                            <label for="description">Mô tả <b class="text-danger">*</b></label>
                            <input type="text" placeholder="Nhập mô tả sản phẩm" id="product-description" class="form-control" value="${product.description}" />
                            <span id="validate-description" class="text-error">Tên sản phẩm không được để trống</span>
                        </div>
                        <div class="col-12 mb-3">
                            <label for="price">Ảnh </label>
                            <div class="col-4"> <img src="${product.image}" style="width:300px; height: 420px;"  alt=""> </div>
                        </div>
                        <div class="col-12 mb-3">
                            <label for="price">Giá sản phẩm <b class="text-danger">*</b></label>
                            <input type="text" placeholder="Nhập giá sản phẩm" id="product-price" class="form-control" value="${product.price}" />
                            <span id="validate-price" class="text-error">Giá sản phẩm không được để trống</span>
                        </div>
                        <div class="col-12 mb-3">
                            <label for="category">Chọn loại sản phẩm <b class="text-danger">*</b></label>
                            <select class="form-control" id="category">
                            ${categories.map(item => {
            return `
                                    <option value="${item._id}" ${product.category == item._id ? "selected" : ''}>${item.name}</option>
                                `
        })}
                            </select>
                        </div>
                        <div class="col-12 mb-3">
                            <label for="quantity">Số lượng sản phẩm <b class="text-danger">*</b></label>
                            <input type="number" placeholder="Nhập số lượng sản phẩm" id="product-quantity" class="form-control" value="${product.quantity}" />
                            <span id="validate-quantity" class="text-error">Số lượng sản phẩm không được để trống</span>
                        </div>
                        <div class="col-12">
                            <input type="submit" class="btn btn-primary w-100" value="Xác Nhận" />
                        </div>
                    </div>
                </div>
            </form>
        `
    },

    async afterRender() {
        const { id } = parseRequestUrl();
        const { data: product } = await ProductApi.get(id);
        console.log(product, 'hihi');
        $('#form-update').addEventListener('submit', async e => {
            e.preventDefault();
            if (this.validateItem('product-name', 'validate-name') && this.validateItem('product-price', 'validate-price') && this.validateItem('product-quantity', 'validate-quantity') && this.validateItem('product-description', 'validate-description')) {
                // const newProduct = {
                //     ...product,
                //     name: $('#product-name').value,
                //     description: $('#product-description').value,
                //     price: $('#product-price').value,
                //     category: $('#category').value,
                //     quantity: Number($('#product-quantity').value),
                // }
                let formData = new FormData()
                formData.append('name', $('#product-name').value),
                    formData.append('description', $('#product-description').value),
                    formData.append('price', $('#product-price').value),
                    formData.append('category', $('#category').value),
                    formData.append('quantity', $('#product-quantity').value)
                const result = await ProductApi.update(id, formData);
                if (result.status === 200) {
                    alert('Sửa sản phẩm thành công');
                    window.location.href = '#/products'
                }
                // ProductApi.update(id, newProduct);
                // location.href = '#/products'
                // location.reload();
            }
        })
    },

    validateItem(id, idText) {
        if (!document.getElementById(id).value) {
            document.getElementById(idText).style.display = 'block';
            document.getElementById(id).style.borderColor = 'red';
            return false;
        }
        document.getElementById(idText).style.display = 'none';
        document.getElementById(id).style.borderColor = '';
        return true;
    }
}

export default ProductEditPage;