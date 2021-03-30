import ProductAPI from './../api/ProductApi.js';
import CategoryAPI from './../api/categoryAPI';
class Home {
    static async render() {
        const { data: products } = await ProductAPI.getAll();
        const { data: { categories } } = await CategoryAPI.getAll();
        console.log(products, 'product');
        console.log(categories, 'categories');

        return categories.map(category => {
            return `
                <div class="mb-3">
                    <div class="sanpham">
                        <div class="top-sp">
                            <div class="tensp">
                                <h3 class="mt-4">${category.name}</h3>
                            </div>
                            <div class="danhmuc">
                                <a href="/#/category/${category.id}">Tất Cả <i class="fa fa-angle-double-right" aria-hidden="true"></i> <i class="fa fa-angle-double-right" aria-hidden="true"></i> </a>
                            </div>
                            <div class="icon">
                                <a href=""><img src="https://i.ibb.co/KmJkpP1/Untitled-1.png" alt=""></a>
                            </div>
                        </div>
                        <hr size="2px" color="#eaeaea" width="780px" align="left">
                        <div class="loaisp">
                            ${products.filter(product => product.categoryId == category.id).slice(0, 4).map(product => {
                return ` 
                                    <div class="sp">
                                        <a href="#/products/${product._id}" id="tt">
                                            <img src="${product.image}" class="img-fluid" width="176px" height="203px" alt="">
                                        </a>
                                        <div class="gia">
                                            <a href="#/products/${product._id}" id="tt">${product.name}</a>
                                            <b>
                                                <p>&emsp; ${product.price} <b>$</b></p>
                                            </b>
                                        </div>
                                    </div>
                                `
            }).join(' ')}
                        </div>
                    </div>
                </div>
                ${category.id == 1 ? `
                    <div class="mb-3">
                        <div class="baner2">
                            <img src="https://i.ibb.co/zPCrPST/anhso1.jpg" alt="">
                            <img src="https://i.ibb.co/HnsX6s5/anh-so-2.jpg" alt="">
                        </div>
                    </div>                            
                ` : category.id == 2 ? `
                    <div class="taokhoangcach">
                        <div class="banner3">
                            <img src="https://i.ibb.co/DM7X4LW/banner3.jpg" alt="">
                        </div>
                    </div>
                ` : ''}
            `;
        }).join(' ');
    }

    async afterRender() {

    }
};
export default Home;