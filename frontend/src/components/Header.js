import CategoryAPI from "../api/categoryAPI.js"

const Header = {
    async render() {
        const { data: categories } = await CategoryAPI.getAll();
        return `
            ${categories.map(category => {
            return `
                        <a href="/#/category/${category.id}"> ${category.name}  </a> <br>
                        <hr size="1px" color="#eaeaea" width="249px" align="left">
                    `
        }).join(" ")
            }       
        `
    }
}
export default Header;