import CategoryAPI from "../api/categoryAPI.js"

const Header = {
    async render() {
        const { data: { categories } } = await CategoryAPI.getAll();
        console.log(categories, 123);
        return `
            ${categories.map(category => {
            return `
                        <a href="/#/category/${category._id}"> ${category.name}  </a> <br>
                        <hr size="1px" color="#eaeaea" width="249px" align="left">
                    `
        }).join(" ")
            }       
        `
    }
}
export default Header;