{
  const headerTime = () => {
    const now = new Date();
    const timeString = document.querySelector(".js-timeString");
    timeString.innerText = now.toLocaleString("nl", {
      dateStyle: "full",
      timeStyle: "medium",
    });
  };

  const products = [];

  const addNewproduct = (newProduct, startingDate, timeLeft) => {
    products.push({
      product: newProduct,
      timeIn: startingDate,
      timeOut: timeLeft,
    });
    renderProducts();
  };

  const clearInput = () => {
    const newProductInput = document.querySelector(".js-newProduct");
    newProductInput.value = "";
    newProductInput.focus();
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
    const newProduct = document.querySelector(".js-addProduct").value.trim();
    const startingDate = document.querySelector(".js-dateInput").value;
    const timeLeft = document.querySelector(".js-timeLeft").value;

    if (!newProduct) {
      return;
    }

    addNewproduct(newProduct, startingDate, timeLeft);
    clearInput();
  };

  const init = () => {
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
    headerTime();
    setInterval(headerTime, 1000);
    renderProducts();
  };
  init();
}
