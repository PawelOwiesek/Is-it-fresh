{
  const headerTime = () => {
    const now = new Date();
    const timeString = document.querySelector(".js-timeString");
    timeString.innerText = now.toLocaleString("nl", {
      dateStyle: "full",
      timeStyle: "medium",
    });
  };

  let products = [
    {
      product: "Tomatoes",
      timeIn: "2023-06-18 07:06:00",
      timeOut: "2023-06-18 07:06:00",
    },
  ];

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
      const formattedTime = formatTime(timer);
      formattedTime.toLocaleString();
    });
    renderProducts();
  };

  const addNewproduct = (newProduct, startingDate, timeLeft, timeFlow) => {
    products = [
      ...products,
      {
        product: newProduct,
        timeIn: startingDate,
        timeOut: timeLeft,
        timeFlow: timeFlow,
      },
    ];

    renderProducts();
    deleteProduct();
  };

  const clearInput = () => {
    const newProductInput = document.querySelector(".js-newProduct");
    newProductInput.value = "";
    newProductInput.focus();
  };

  const removeProduct = (index) => {
    products = [...products.slice(0, index), ...products.slice(index + 1)];

    renderProducts();
  };

  const deleteProduct = () => {
    const deleteButtons = document.querySelectorAll(".removeButton");

    deleteButtons.forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", () => {
        removeProduct(index);
        deleteProduct();
        console.log("hello");
      });
    });
  };

  const renderProducts = () => {
    let htmlString = "";
    products.forEach((product) => {
      const currentTime = new Date();
      const endTime = new Date(product.timeOut);
      const timer = Math.floor((endTime - currentTime) / 1000);
      const formattedTime = formatTime(timer);
      const timeFlow = formattedTime.toLocaleString();
      if (!products) return;
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
        <span class="list__item--timeFlow">Time left: ${timeFlow}</span>
        <button class="removeButton">🗑</button>
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
    const formattedTime = formatTime(timer);
    const timeFlow = formattedTime.toLocaleString();
    // const intervalId = setInterval(timeCalculation, 1000);

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
    deleteProduct();
  };

  init();
}
