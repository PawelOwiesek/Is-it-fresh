{
  const products = [];

  const addNewproduct = (newProduct, startingDate, timeLeft) => {
    products.push({
      product: newProduct,
      timeIn: startingDate,
      timeOut: timeLeft,
    });
    renderProducts();
  };

  const renderProducts = () => {
    let htmlString = "";
    products.forEach((product) => {
      htmlString += `
          <li class="list__item">${product.product}</li> 
          <span class="list__item--exDate">
            <label>Date in:</label>
            <input value="${product.timeIn}" class="form__input js-formImput" name="expier date" readonly>
          </span> 
          <span>
            <label>Date out:</label>
            <input value="${product.timeOut} " class="form__input" name="time" readonly>
          </span>
         
        `;
    });
    const tasksContainer = document.querySelector(".js-productsList");
    tasksContainer.innerHTML = htmlString;
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const newProduct = document.querySelector(".js-newProduct").value;
    const startingDate = document.querySelector(".js-dateInput").value;
    const timeLeft = document.querySelector(".js-timeLeft").value;

    addNewproduct(newProduct, startingDate, timeLeft);
  };

  const init = () => {
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
    renderProducts();
  };
  init();
}
