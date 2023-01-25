{

    const tasks = [];
    const dates = [];

    console.log(tasks);
    console.log(dates);
    
    const clear=()=>{
        newTask.documnet.querySelector(".js-newTask");
        newTask.value="";
        newTask.focus();
    }

    const addNewTask = (newTaskProduct) => {
        (newTaskProduct)
        tasks.push({
            product: newTaskProduct,
        })
        render();
    };

    const addNewDate = (endTime) => {
        if(endTime===""){
            return;
        }

        (endTime)
        dates.push({
            data: endTime,
        })
    }

    const headerTime = () => {
        const now = new Date();
        const timeString = document.querySelector(".js-timeString");
        timeString.innerText = now.toLocaleString('en', {
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
            <input value=${calculatedTime} class="form__input js-calculateResult" name="time" readonly>
           </span>
               `;

        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
        dateInput = document.querySelector(".js-dateInput");
        timeLeft = document.querySelector(".js-timeLeft");
        
        
    };
    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskProducts = document.querySelector(".js-addProducts").value;
        if (newTaskProducts === "") {
            return;
        }
        addNewTask(newTaskProducts);clear();
    };
    const counter = () => {

        if (timeLeft.value === "") {
            return;
        };
        
        currentTime = new Date();
        endTime = new Date(timeLeft.value);

        seconds = Math.abs(currentTime - endTime) / 1000;
        minutes = parseInt(seconds / 60);
        hours = parseInt(minutes / 60);
        days = parseInt(hours / 24);
        years = parseInt(days / 365);

        seconds = parseInt((seconds - minutes * 60));
        minutes = parseInt((minutes - hours * 60));
        hours = parseInt((hours - days * 24));
        days = parseInt((days - years * 365));
        const calculateResult = document.querySelector(".js-calculateResult");

        calculatedTime = (`D:  ${days}, H:  ${hours}, m: ${minutes} , s: ${seconds} `);
        calculateResult.value = `${calculatedTime}`;
        addNewDate(endTime);
    }


    const init = () => {
        headerTime();
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
        setInterval(headerTime, 1000);
        setInterval(counter,1000);

    }
    init();

}




