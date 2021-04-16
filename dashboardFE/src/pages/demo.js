const router = async () => {
    try {
      const request = parseRequestUrl();
      const parseUrl =
        (request.resource ? `/${request.resource}` : "/") +
        (request.id ? "/:id" : "");
  
      const page = routes[parseUrl];
      const main = $("#main-content");
      const header = $("#header");
      const banner = $("#banner");
      if (request.resource === "login") {
        header.innerHTML = "";
        banner.innerHTML = "";
        main.innerHTML = await page.render();
        await page.afterRender();
      }
  
      if (request.resource === "admin") {
        header.innerHTML = await Header.render();
        main.innerHTML = await adminPage.render();
        adminPage.afterRender();
        Header.afterRender()
      }
      if (request.resource !== "admin" && request.resource !== "login" ) {
        header.innerHTML = await Header.render();
        await Header.afterRender()
        banner.innerHTML = await Banner.render();
        main.innerHTML = await page.render();
        if (
          page === ListProduct ||
          page === AddProductPage ||
          page === Homepage ||
          page === RepairProduct ||
          page === ViewCartPage ||
          page === AddNewCategory ||
          page === CategoryList ||
          page === RepairCategory ||
          page === ProductDetail ||
          page === ContactPage
        ) {
          await page.afterRender();
        }
      }
    } catch (error) {
      const main = $("#main-content");
      console.log(error);
      main.innerHTML = await Error404Page.render();
    }
  };