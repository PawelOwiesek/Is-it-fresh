{
    const exDate=[
        {
            entry:18-01-2022,
        },
        {
            entry:22-01-2024,
        },
    ];
    const tasks = [];

    const addNewTask = (newTaskProduct) => {
        (newTaskProduct)
        tasks.push({
            product: newTaskProduct,
        })
        render();
    };

    const headerTime = () => {
        const now = new Date();
        const timeString = document.querySelector(".js-timeString");
        timeString.innerText = now.toLocaleString('pl', {
            dateStyle: "full",
            timeStyle: "medium",
        });
        
    }

    const render = () => {

        let htmlString = "";

        for (const task of tasks) {
            htmlString +=
                `
             <li 
                class="list__item">${task.product}
            </li>
            <span class="list__item--exDate">
            <label>Expier date:</label>
            <input value=${dateInput.value} class="form__input js-formImput" name="expier date" readonly>
           </span> 
           <span>
             <label>Time left:</label>
            <input value=${timeLeft.value} class="form__input" name="time left" readonly>
           </span>
               `;

        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
        dateInput=document.querySelector(".js-dateInput");
        timeLeft=document.querySelector(".js-timeLeft");
    };
    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskProducts = document.querySelector(".js-addProducts").value;
        if (newTaskProducts === "") {
            return;
        }
        addNewTask(newTaskProducts);
    };

    const init = () => {
        headerTime();
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
        setInterval(headerTime,1000);
    }
    init();
}