import ContactApi from "../api/ContactAPI";
import { $ } from '../utils';

const ListContact = {
    async render() {
        const { data: listContact } = await ContactApi.getAll();

        return `
        <h1 style= "text-align: center; color: red;"> Danh Sách Liên Hệ </h1>
            <div id="list-contacts">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên khách hàng</th>
                            <th scope="col">Email</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Nội dung</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    ${listContact.map(contact => {
            return `
                            <tr>
                                <td>${contact.id}</td>
                                <td>${contact.name}</td>
                                <td>${contact.email}</td>
                                <td>${contact.phone}</td>
                                <td>${contact.note}</td>
                                <td>
                                    <button class="btn btn-danger btn-remove remove-contact" data-id="${contact.id}">Remove</button>
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
        const btns = $('#list-contacts .remove-contact');
        btns.forEach(btn => {
            const id = btn.dataset.id;
            btn.addEventListener('click', function () {
                const question = confirm('Bạn có chắc chắn muốn xóa không?')
                if (question) {
                    ContactApi.remove(id);
                    location.reload();
                }
            })
        })
    }
}
export default ListContact;