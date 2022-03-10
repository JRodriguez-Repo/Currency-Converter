const currency1 = document.getElementById('currency1');
const currency2 = document.getElementById('currency2');
const amount1 = document.getElementById('amount1');
const amount2 = document.getElementById('amount2');
const rate = document.getElementById('rate');
const swapBtn = document.getElementById('swap');
const updatedLast = document.getElementById('last_updated');
const updateNext = document.getElementById('next_update');



//get currency rate and update DOM
function calculate() {

    const input1 = currency1.value;
    const input2 = currency2.value;
    
    fetch(`https://v6.exchangerate-api.com/v6/47337334b42d7c1572f3bc70/latest/${input1}`)
    .then(response => response.json())
    .then((data) => {
        
            console.log(data);
        
        const conversion_rate = data.conversion_rates[input2];
        rate.innerHTML = `1 ${input1} = ${conversion_rate} ${input2}`;
        amount2.value = (amount1.value * conversion_rate).toFixed(2);

        
        const last_update = data.time_last_update_utc;
        const next_update = data.time_next_update_utc;
        updatedLast.innerHTML = `Last update @ ${last_update}`;
        updateNext.innerHTML = `Next update @ ${next_update}`;

    });
         
}

currency1.addEventListener('change', calculate);
currency2.addEventListener('change', calculate);
amount1.addEventListener('input', calculate);
amount2.addEventListener('input', calculate);
swapBtn.addEventListener('click', () => {


    const temp = currency1.value;
    currency1.value = currency2.value;
    currency2.value = temp;
    calculate();
});