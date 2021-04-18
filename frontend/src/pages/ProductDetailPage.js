import ProductApi from "../api/ProductApi";
import { parseRequestUrl } from "../utils";

const ProductDetailPage = {
  async render() {
    const { id } = parseRequestUrl();
    const { data: product } = await ProductApi.get(id);
    console.log(product);
    return `
        <div class="chitiet">
        <div class="img">
          <img src="${product.photo}" width="420px" height="600px" alt="">
        </div>
        <div class="thongtin">
          <h1>${product.name}</h1>

          <hr size="1px" color="#eaeaea" width="249px" align="left">
          <b>
            <p>Giá : <b style="color:red;"> ${product.price} $</b></p>
          </b>
          <hr size="1px" color="#eaeaea" width="249px" align="left">
          <br>
    
          <div class="size">
            Size: &emsp;
            <ul class="ul-size">
              <li class="ss" ">M</li>
                         <li class=" ss" ">L</li>
                         <li class=" ss"">XL</li>
              <li class="ss" ">2XL</li>
                         <li class=" ss" ">3XL</li>
                       </ul>
                       
                    </div>
                    <div class=" muangay">
                <a href="#"><button class="mua1">Thêm Vào Giỏ Hàng</button></a>
                <a href="#"><button class="mua2">Mua Ngay</button></a>
          </div>
          <br>
          <hr size="1px" color="#eaeaea" width="249px" align="left">
          <div class="chinhsach">
            <span> CHÍNH SÁCH TỪ Xshop </span>
            <p> <i class="fa fa-play" aria-hidden="true"></i> Đổi hàng trong vòng 3 ngày. </p>
            <p> <i class="fa fa-play" aria-hidden="true"></i> Giảm 10% trên tổng hóa đơn khi mua hàng ( tại cửa hàng ) <br> vào tuần sinh nhật ( trước và sau ngày sinh nhật 3 ngày ). </p>
            <p> <i class="fa fa-play" aria-hidden="true"></i> Giao hàng nội thành Hà Nội chỉ từ 15.000đ trong vòng 24 giờ. </p>
            <p> <i class="fa fa-play" aria-hidden="true"></i> Tích điểm 3-10% giá trị đơn hàng cho mỗi lần mua và trừ tiền <br> vào lần mua tiếp theo. </p>
          </div>
          <br>
          <hr size="1px" color="#eaeaea" width="249px" align="left">
    
        </div>
      </div>
        

        `
  },
  
  async afterRender() {
    
  }
}

export default ProductDetailPage;