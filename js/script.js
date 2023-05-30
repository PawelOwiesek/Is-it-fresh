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

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${days} days ${hours} hours ${minutes} min ${remainingSeconds} s`;
  };

  const timeCalculation = () => {
    products.forEach(({ timeOut }) => {
      const currentTime = new Date();
      const endTime = new Date(timeOut);
      const timer = Math.floor((endTime - currentTime) / 1000);
      const formatedTime = formatTime(timer);
      formatedTime.toLocaleString();
    });
    renderProducts();
  };

  const addNewproduct = (newProduct, startingDate, timeLeft, timeFlow) => {
    products.push({
      product: newProduct,
      timeIn: startingDate,
      timeOut: timeLeft,
      timeFlow: timeFlow,
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
      const currentTime = new Date();
      const endTime = new Date(product.timeOut);
      const timer = Math.floor((endTime - currentTime) / 1000);
      const formatedTime = formatTime(timer);
      const timeFlow = formatedTime.toLocaleString();

      htmlString += `
        <li class="list__item">${product.product}</li> 
        <span class="list__item--dateIn">
          <label>Date in:
          <input value=${product.timeIn} class="form__input js-formInput" name="expire date" readonly></label>
        </span> 
        <span class="list__item--exDate">
          <label>Date out:
          <input value=${product.timeOut}  class="form__input" name="time" readonly></label>
        </span>
        <span class="list__item--timeFlow">Pozostalo: ${timeFlow}</span>
      `;
    });

    const productsContainer = document.querySelector(".js-productsList");
    productsContainer.innerHTML = htmlString;
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const newProduct = document.querySelector(".js-addProduct").value.trim();
    const startingDate = document.querySelector(".js-dateInput").value;
    const timeLeft = document.querySelector(".js-timeLeft").value;
    const currentTime = new Date();
    const endTime = new Date(timeLeft);
    const timer = Math.floor((endTime - currentTime) / 1000);
    const formatedTime = formatTime(timer);
    const timeFlow = formatedTime.toLocaleString();
    setInterval(timeCalculation, 1000);
    if (!newProduct) {
      return;
    }
    timeCalculation();
    addNewproduct(newProduct, startingDate, timeLeft, timeFlow);
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
