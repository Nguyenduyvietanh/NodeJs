import ProductApi from "../api/ProductApi";
import { parseRequestUrl } from "../utils";

const CategoryPage = {
    async render() {
        const { id } = parseRequestUrl();
        const { data: products } = await ProductApi.getAll();
        const result = products.filter(product => product.categoryId == id).map(product => {
            return ` 
                 <div class="all-sp">
                    <div class="imgg">
                        <a href="/#/products/${product.id}"><img src="${product.image}" class="img-fluid" width="100%" height="350px" alt=""></a>
                    </div>
                    <div class="ten">
                        <a href="">${product.name}</a>
                        <p>${product.price} <b>$</b> </p>
                    </div>
                    <div class="text">
                        <a href="/#/products/${product.id}"> <button class="nnn">Xem Chi Tiết  <i class="fa fa-eye" aria-hidden="true"></i></button> </a>
                    </div>
                </div>
            
            `
        }).join(" ");
        return `
             <div class="danhmuc-sp">
                ${result}
             </div>
        `

    },
    
    async afterRender() {
        
    }
}
export default CategoryPage;