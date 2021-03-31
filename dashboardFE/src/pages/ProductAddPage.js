import ProductApi from '../api/ProductApi.js';
import CategoryAPI from '../api/categoryAPI';
import { $ } from '../utils.js';
import firebase from 'firebase';
import { firebaseConfig } from '../firebbase/index.js';

const ProductAddPage = {
    async render() {
        const { data: { categories } } = await CategoryAPI.getAll();
        return /*html*/`
        <h1 style= "text-align: center; color: red;"> Thêm Sản Phẩm </h1>
            <form id="form-add">
                <div class="form-group">
                    <div class="row">
                        <div class="col-12 mb-3">
                            <label for="name">Tên sản phẩm <b class="text-danger">*</b></label>
                            <input type="text" placeholder="Nhập tên sản phẩm" id="product-name" class="form-control" />
                            <span id="validate-name" class="text-error">Tên sản phẩm không được để trống</span>
                        </div>
                        <div class="col-12 mb-3">
                            <label for="description">Mô tả sản phẩm <b class="text-danger">*</b></label>
                            <input type="text" placeholder="Nhập mô tả sản phẩm" id="product-description" class="form-control" />
                            <span id="validate-description" class="text-error">Mô tả phẩm không được để trống</span>
                        </div>
                        <div class="col-12 mb-3">
                            <label for="price">Giá sản phẩm <b class="text-danger">*</b></label>
                            <input type="text" placeholder="Nhập giá sản phẩm" id="product-price" class="form-control" />
                            <span id="validate-price" class="text-error">Giá sản phẩm không được để trống</span>
                        </div>
                        <div class="col-12 mb-3">
                            <label for="category">Chọn loại sản phẩm <b class="text-danger">*</b></label>
                            <select class="form-control" id="category">
                                ${categories.map(item => {
            return `
                                        <option value="${item._id}">${item.name}</option>
                                    `
        })}
                            </select>
                        </div>
                        <div class="col-12 mb-3">
                            <label for="quantity">Số lượng sản phẩm <b class="text-danger">*</b></label>
                            <input type="number" placeholder="Nhập số lượng sản phẩm" id="product-quantity" class="form-control" />
                            <span id="validate-quantity" class="text-error">Số lượng sản phẩm không được để trống</span>
                        </div>
                        <div class="col-12 mb-3">
                            <label for="file">Ảnh sản phẩm <b class="text-danger">*</b></label>
                            <input type="file" placeholder="" id="product-image" class="form-control" />
                            <span id="validate-image" class="text-error">Hình ảnh sản phẩm không được để trống</span>
                        </div>
                        <div class="col-12">
                            <input type="submit" class="btn btn-primary w-100" value="Thêm sản phẩm mới" />
                        </div>
                    </div>
                </div>
            </form>
        `
    },

    async afterRender() {
        $('#form-add').addEventListener('submit', async e => {
            e.preventDefault();
            if (this.validateItem('product-name', 'validate-name') && this.validateItem('product-price', 'validate-price') && this.validateItem('product-quantity', 'validate-quantity') ) {
                // if (!firebase.apps.length) {
                //     firebase.initializeApp(firebaseConfig);
                // }
                // const { data: listProducts } = await ProductApi.getAll();
                // const productImage = $('#product-image').files[0];
                // let storageRef = firebase.storage().ref(`images/${productImage.name}`);
                // storageRef.put(productImage).then(function () {
                //     storageRef.getDownloadURL().then((url) => {
                        const product = {
                            // id: listProducts.length + 1,
                            name: $('#product-name').value,
                            description: $('#product-description').value,
                            price: Number($('#product-price').value),
                            category: $('#category').value,
                            quantity: Number($('#product-quantity').value),
                            // photo: url
                        }
                        const result = await ProductApi.add(product);
                        if (result.status === 200) {
                            alert('Thêm mới danh mục thành công');
                            window.location.href = '/'
                        }
                        // ProductApi.add(product);
                        // location.href = '#/products'
                        // alert('Thêm mới sản phẩm thành công');
                        // location.reload();
                    // })
                // })
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

export default ProductAddPage