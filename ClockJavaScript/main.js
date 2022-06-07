function SimpleClock() {
    const hoursArrow = document.querySelector('.hours');
    const minutesArrow = document.querySelector('.minutes');
    const secondsArrow = document.querySelector('.seconds');

    const bodyBackground = document.querySelector('body');
    const htmlBackground = document.querySelector('html');

    const clockTitle = document.querySelector('.clock__title');
    const status = document.querySelector('.status__text');

    const degrees = 6;

    setInterval(() => {
        const date = new Date();

        const hours = date.getHours() * 30;
        const minutes = date.getMinutes() * degrees;
        const seconds = date.getSeconds() * degrees;

        hoursArrow.style.transform = `rotateZ(${hours + (minutes / 12)}deg)`;
        minutesArrow.style.transform = `rotateZ(${minutes}deg)`;
        secondsArrow.style.transform = `rotateZ(${seconds}deg)`;
        if (date.getHours() >= 12 && date.getHours() < 17) {
            bodyBackground.style.background = '#9fb3cc';
            htmlBackground.style.background = '#9fb3cc';
            clockTitle.style.color = '#000'
            status.style.color = '#000';
        }
        if (date.getHours() >= 17 && date.getHours() < 19){
            bodyBackground.style.background = '#915f57';
            htmlBackground.style.background = '#915f57';
            clockTitle.style.color = '#fff'
            status.style.color = '#fff';
        }
        if (date.getHours() >= 19 && date.getHours() < 24){
            bodyBackground.style.background = '#4a4666';
            htmlBackground.style.background = '#4a4666';
            clockTitle.style.color = '#fff'
        }
        if (date.getHours() >= 0 && date.getHours < 6) {
            bodyBackground.style.background = '#2e2d36';
            htmlBackground.style.background = '#2e2d36';
            clockTitle.style.color = '#fff'
        }
        if (date.getHours() >= 6 && date.getHours < 12) {
            bodyBackground.style.background = '#cfd19d';
            htmlBackground.style.background = '#cfd19d';
            clockTitle.style.color = '#000'
        }



        if(date.getHours() >= 0 && date.getHours() < 12) {
            status.innerHTML = 'Morning';
        }
        
        if(date.getHours() >= 12 && date.getHours() < 18) {
            status.innerHTML = 'Afternoon';
        }
        if(date.getHours() >= 18 && date.getHours() < 24) {
            status.innerHTML = 'Evening';
        }

    }, 100)
}
SimpleClock()