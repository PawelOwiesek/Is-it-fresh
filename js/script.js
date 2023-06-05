{
  const displayHeaderTime = () => {
    const actualDate = new Date();
    const timeString = document.querySelector(".js-timeString");
    timeString.innerText = actualDate.toLocaleString(undefined, {
      dateStyle: "full",
      timeStyle: "medium",
    });
  };

  let products = [
    {
      product: "Tomatoes",
      timeIn: "2023-06-18 07:06:00",
      timeOut: "2024-06-18 07:06:00",
    },
  ];

  const formatTime = (seconds) => {
    if (seconds < 0) {
      return "date expired";
    } else if (seconds < 260000) {
      const days = Math.floor(seconds / (3600 * 24));
      const hours = Math.floor((seconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      return `⚠ D ${days} H ${hours} min ${minutes} s ${remainingSeconds} `;
    } else {
      const days = Math.floor(seconds / (3600 * 24));
      const hours = Math.floor((seconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      return `D ${days} H ${hours} min ${minutes} s ${remainingSeconds} `;
    }
  };

  let intervalId;

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

  const startInterval = () => {
    intervalId = setInterval(timeCalculation, 1000);
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
    clearInterval(intervalId);
    products = [...products.slice(0, index), ...products.slice(index + 1)];
    renderProducts();
    startInterval();
  };

  const deleteProduct = () => {
    const deleteButtons = document.querySelectorAll(".removeButton");

    deleteButtons.forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", () => {
        removeProduct(index);
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
        
        <div>
        <span class="listSection__itemLabel">Product: </span> 
        <p  class="listSection__item" >${product.product}</p>   
       </div>
           <label class="listSection__dateInLabel">Date in:
        <input value=${product.timeIn} class="listSection__date js-formInput" name="expire date" readonly>
           </label>
           <label class="listSection__expireDateLabel">Date out:
        <input value=${product.timeOut}  class="listSection__date" name="time" readonly>
           </label>
        <div class="listSection__timeFlow">
        <p class="listSection__timeLeftLabel">
        Time left:<br />
        <span class="listSection__timer"> ${timeFlow}</span>
        </p>
        </div>
        <button class="listSection__button removeButton">🗑</button>
      `;
    });

    const productsContainer = document.querySelector(".js-productsList");
    productsContainer.innerHTML = htmlString;

    deleteProduct();
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

    if (!newProduct) {
      return;
    }
    clearInterval(intervalId);
    timeCalculation();
    addNewproduct(newProduct, startingDate, timeLeft, timeFlow);
    startInterval();
    clearInput();
  };

  const init = () => {
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
    displayHeaderTime();
    setInterval(displayHeaderTime, 1000);
    renderProducts();
    startInterval();
  };

  init();
}
