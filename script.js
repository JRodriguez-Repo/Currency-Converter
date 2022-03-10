const currency1 = document.getElementById('currency1');
const currency2 = document.getElementById('currency2');
const amount1 = document.getElementById('amount1');
const amount2 = document.getElementById('amount2');
const swap_rate = document.getElementById('rate');
const swapBtn = document.getElementById('swap');
const updatedLast = document.getElementById('last_updated');
const updateNext = document.getElementById('next_update');


//get currency rate and update DOM
function calculate() {

    const input1 = currency1.value;
    const input2 = currency2.value;
    
    //fetch data from api source
    fetch(`https://open.er-api.com/v6/latest/${input1}`)
    .then(response => response.json())
    .then((data) => {
        
            console.log(data);
        
        const conversion_rate = data.rates[input2];
        swap_rate.innerHTML = `1 ${input1} = ${conversion_rate} ${input2}`;
        amount2.value = (amount1.value * conversion_rate).toFixed(2);

        
        let last_update = data.time_last_update_utc;
        let next_update = data.time_next_update_utc;
        let formatted_last_update = last_update.slice(0, 17);
        let formatted_next_update = next_update.slice(0,17);

        updatedLast.innerHTML = `Last update @ ${formatted_last_update}`;
        updateNext.innerHTML = `Next update @ ${formatted_next_update}`;

    });
         
}
currency1.addEventListener('change', calculate);
currency2.addEventListener('change', calculate);
amount1.addEventListener('input', calculate);
amount2.addEventListener('input', calculate);

//swap values for exchange rate calculation
swapBtn.addEventListener('click', () => {


    const temp = currency1.value;
    currency1.value = currency2.value;
    currency2.value = temp;
    calculate();
});