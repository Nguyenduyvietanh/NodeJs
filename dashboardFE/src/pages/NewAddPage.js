import NewAPI from '../api/NewAPI.js';
import { $, validateItem } from '../utils.js';
import firebase from 'firebase';
import { firebaseConfig } from '../firebbase/index.js';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const NewAddPage = {
    async render() {
        return /*html*/`
            <h1 style= "text-align: center; color: red;"> Thêm Tin Tức </h1>
            <form id="form-new">
                <div class="form-group">
                    <div class="row">
                        <div class="col-12 mb-3">
                            <label for="name">Tiêu đề <b class="text-danger">*</b></label>
                            <input type="text" placeholder="Nhập tên tiêu đề" id="new-title" class="form-control" />
                            <span id="validate-title" class="text-error">Tiêu đề bài viết không được để trống</span>
                        </div>
                        <div class="col-12 mb-3">
                            <label for="price">Mô tả<b class="text-danger">*</b></label>
                            <textarea name="" id="new-description" cols="30" rows="5" placeholder="Nội dung mô tả"
                                class="form-control"></textarea>
                            <span id="validate-description" class="text-error">Mô tả bài viết không được để trống</span>
                        </div>
                        <div class="col-12 mb-3">
                            <label for="price">Nội dung tin tức</label>
                            <div id="editor"></div>
                        </div>
                        <div class="col-12 mb-3">
                            <label for="file">Ảnh <b class="text-danger">*</b></label>
                            <input type="file" placeholder="" id="new-image" class="form-control" />
                            <span id="validate-image" class="text-error">Ảnh tin tức không được để trống</span>
                        </div>
                        <div class="col-12 mb-3">
                            <label for="price">Người viết <b class="text-danger">*</b></label>
                            <input type="text" placeholder="Nhập người viết" id="new-name" class="form-control" />
                            <span id="validate-name" class="text-error">Người viết không được để trống</span>
                        </div>
                        <div class="col-12">
                            <input type="submit" class="btn btn-primary w-100" value="Thêm tức mới" />
                        </div>
                    </div>  
                </div>
            </form>
        `
    },

    async afterRender() {
        let contentPost;
        ClassicEditor
            .create(document.querySelector('#editor'))
            .then(editor => {
                contentPost = editor;
            })
            .catch(error => {
                console.error(error);
            });
        $('#form-new').addEventListener('submit', async e => {
            e.preventDefault();
            if (validateItem('new-title', 'validate-title') &&
                validateItem('new-description', 'validate-description') &&
                validateItem('new-image', 'validate-image') &&
                validateItem('new-name', 'validate-name')
            ) {
                if (!firebase.apps.length) {
                    firebase.initializeApp(firebaseConfig);
                }
                const { data: listNew } = await NewAPI.getAll();
                let content = contentPost.getData();
                const newImage = $('#new-image').files[0];
                let storageRef = firebase.storage().ref(`images/${newImage.name}`);
                storageRef.put(newImage).then(function () {
                    storageRef.getDownloadURL().then((url) => {
                        const neww = {
                            id: listNew.length + 1,
                            title: $('#new-title').value,
                            description: $('#new-description').value,
                            image: url,
                            name: $('#new-name').value,
                            content: content

                        };
                        NewAPI.add(neww);
                        location.href = '#/news';
                        location.reload();
                        alert('Thêm tin tức thành công ');
                    })
                })
            }
        });
    },

}
export default NewAddPage;