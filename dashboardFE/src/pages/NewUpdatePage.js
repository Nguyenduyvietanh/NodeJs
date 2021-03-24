import NewAPI from "../api/NewAPI";
import { $, parseRequestUrl } from "../utils";
import firebase from 'firebase';
import { firebaseConfig } from '../firebbase/index.js';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const NewUpdatePage = {
    async render() {
        const { id } = parseRequestUrl();
        const { data: neww } = await NewAPI.get(id);
        return /*html*/`
            <h1 style= "text-align: center; color: red;"> Sửa Tin Tức </h1>
            <form id="form-update">
                <div class="form-group">
                    <div class="row">
                        <div class="col-12 mb-3">
                            <label for="name">Tiêu đề <b class="text-danger">*</b></label>
                            <input type="text" placeholder="Nhập tên tiêu đề" id="new-title" class="form-control"  value="${neww.title}"  />
                            <span id="validate-title" class="text-error">Tiêu đề bài viết không được để trống</span>
                        </div>
                        <div class="col-12 mb-3">
                            <label for="price">Mô tả<b class="text-danger">*</b></label>
                            <textarea name="" id="new-description" cols="30" rows="5" placeholder="Nội dung mô tả"
                                class="form-control">${neww.description}</textarea>
                            <span id="validate-description" class="text-error">Mô tả bài viết không được để trống</span>
                        </div>
                        <div class="col-12 mb-3">
                            <label for="price">Nội dung tin tức</label>
                            <div id="editor"></div>
                        </div>
                        <div class="col-12 mb-3">
                            <label for="price">Ảnh </label>
                            <div class="col-4"> <img src="${neww.image}" style="width:300px; height: 250px;"  alt=""> </div>
                        </div>


                        <div class="col-12 mb-3">
                            <label for="price">Người viết <b class="text-danger">*</b></label>
                            <input type="text" placeholder="Nhập người viết" id="new-name" class="form-control" value="${neww.name}" />
                            <span id="validate-name" class="text-error">Người viết không được để trống</span>
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
        const { data: neww } = await NewAPI.get(id);
        let contentPost;
        ClassicEditor
            .create(document.querySelector('#editor'))
            .then(editor => {
                contentPost = editor;
                editor.setData(neww.content);
            })
            .catch(error => {
                console.error(error);
            });
        $('#form-update').addEventListener('submit', async e => {
            e.preventDefault();
            if (this.validateItem('new-title', 'validate-title') && this.validateItem('new-description', 'validate-description') && this.validateItem('new-name', 'validate-name')) {
                const newFeed = {
                    ...neww,
                    title: $('#new-title').value,
                    description: $('#new-description').value,
                    content: contentPost.getData(),
                    name: $('#new-name').value,
                }
                NewAPI.update(id, newFeed);
                location.href = '#/news'
                location.reload();
                alert('Sửa tin tức thành công ');
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

export default NewUpdatePage;