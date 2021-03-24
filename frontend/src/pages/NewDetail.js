import NewAPI from "../api/newAPI";
import { parseRequestUrl } from "../utils";

const NewDetail = {
    async render() {
        const { id } = parseRequestUrl();
        const { data: detail } = await NewAPI.get(id);
        return `
            <div style="background: #fff; padding-left: 20px; padding-right: 10px;  padding-top: 20px;  width: 835px;">
                <h2 style="color: #2F4F4F;  font-weight: bold;" >${detail.title}</h2>
                <div style="padding-left: 10px; border-bottom: 1px dotted #939393;"> <span style=" font-size: 13px; font-style: italic;" > Đăng bởi: ${detail.name} </span> </div>  <br><br> 
                <div>${detail.description}</div>
                <div>${detail.content}</div>
            </div> 
        `
    },

    async afterRender() {

    }
}

export default NewDetail;