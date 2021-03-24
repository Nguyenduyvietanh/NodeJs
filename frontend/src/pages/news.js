import NewAPI from "../api/newAPI";

const News = {
    async render() {
        const { data: news } = await NewAPI.getAll();
        console.log(news, 'hihi');
        return /*html*/`
            <h1 style="color: #2F4F4F; text-align: center; font-weight: bold;"> Tin Tức </h1>
            <div class="content-news">
            ${news.map(item => {
                return `
                        <div class="box-news">
                            <div class="image-new">
                                <a href="#/newdetail/${item.id}"><img src="${item.image}" width="264px"
                                        height="200px" alt=""> </a>
                            </div>
                            <div class="vietbai-new">
                                <span> ${item.name}</span>
                            </div>
                            <div class="title-new">
                                <a href="#/newdetail/${item.id}">
                                    <h3> ${item.title} </h3>
                                </a>
                            </div>
                            <div class="detail-new">
                                <p> ${item.description} </p>
                            </div>
                        </div>
                    `
            }).join(' ')}
            </div>
        `
    },

    async afterRender() {

    }
}

export default News;