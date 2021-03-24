import ContactApi from '../api/contactAPI.js';
import { $ } from '../utils.js';

const Contact = {
    async render() {
        return /*html*/`
            <h1 style="color: #2F4F4F; text-align: center; font-weight: bold;"> Liên Hệ </h1>
            <form id="form-contact">
                <div class="col-12 mb-3">
                    <label for="name">Họ và tên <b class="text-danger">*</b></label>
                    <input type="text" id="contact-name"  placeholder="Nhập họ và tên" class="form-control"  />
                    <span id="validate-name" class="text-error">Họ và tên không được để trống</span>
                </div>
                <div class="col-12 mb-3">
                    <label for="email">Email <b class="text-danger">*</b></label>
                    <input type="email" id="contact-email" placeholder="Nhập email" class="form-control" />
                    <span id="validate-email" class="text-error">Email không được để trống</span>
                </div>
                <div class="col-12 mb-3">
                    <label for="sdt">Số điện thoại <b class="text-danger">*</b></label>
                    <input type="text" id="contact-phone" placeholder="Nhập số điện thoại" class="form-control" />
                    <span id="validate-phone" class="text-error">Số điện thoại không được để trống</span>
                </div>
                <div class="col-12 mb-3">
                    <label for="ghichu">Nội Dung </label>
                    <textarea name="" id="contact-note" cols="30" rows="5" placeholder="Ghi chú"
                        class="form-control"></textarea>
                </div>
                <div class="col-12 mb-3">
                    <input type="submit" value="Gửi liên hệ"  class="btn btn-primary form-control" />
                </div>
            </form>
        `
    },

    async afterRender() {
        $('#form-contact').addEventListener('submit', async e => {
            e.preventDefault();
            if (this.validateItem('contact-name', 'validate-name') && this.validateItem('contact-email', 'validate-email') && this.validateItem('contact-phone', 'validate-phone')) {
                const { data: listContact } = await ContactApi.getAll();
                const contact = {
                    id: listContact.length + 1,
                    name: $('#contact-name').value,
                    email: $('#contact-email').value,
                    phone: $('#contact-phone').value,
                    note: $('#contact-note').value,
                };
                ContactApi.add(contact);
                location.href = '/';
                alert('Gửi liên hệ thành công ');
            }

        });
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

export default Contact;