let analyser, context, arrayTiming;
let switchDegrees = true;
const fullLogo = document.querySelector('.logo')
const logo = document.querySelector('#logo');
const audio = document.querySelector('#audio');
const logoItem = document.querySelectorAll('.logo__item');
const bodyBorder = document.querySelectorAll('.body__border');

const volumeControl = document.querySelector('.volumeControl');

const playButton = document.querySelector('.play');

const controls = document.querySelector('.controls');
const showControls = document.querySelector('.show__controls');
const volumeLine = document.querySelector('.volume__line')

const audioLine = document.querySelector('.audio__line');
const durationLine = document.querySelector('.duration__line');
const audioLineControl = document.querySelector('.audioLineControl');

const currentTimeStat = document.querySelector('.time__current');
const durationTimeStat = document.querySelector('.time__duration');


window.onload = function() {
    const audioDuration = Number(audio.duration);
    let audioDurationSec = undefined;
    const currentTime = Number(audio.currentTime);
    currentTimeStat.innerText = audio.currentTime;
    Math.trunc(audioDuration%60)>10 ? audioDurationSec = Math.trunc(audioDuration%60) : audioDurationSec = '0' + Math.trunc(audioDuration%60)
    durationTimeStat.innerText = `${Math.floor(audioDuration/60)}:${audioDurationSec}`;
    setInterval(function() {
        switchDegrees = !switchDegrees;
    }, arrayTiming)
} 

showControls.onclick = function() {
    controls.classList.toggle('hide');
    showControls.classList.toggle('rotate');
    audioLine.classList.toggle('hide');
}

playButton.onclick = function() {
    if(!context) {
        preparation();
    }
    if(audio.paused) {
        audio.play();
        loop()
        this.classList.add('playing');
    }
    else {
        audio.pause();
        this.classList.remove('playing');
    }

}

function preparation() {
    context = new AudioContext();
    analyser = context.createAnalyser();
    const src = context.createMediaElementSource(audio);
    src.connect(analyser);
    analyser.connect(context.destination);
    loop();
}
function loop() {
    if(!audio.paused) {
        window.requestAnimationFrame(loop);
    }
    const array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);
    arrayTiming = array[120]
    for(logoEl of logoItem) {
        logoEl.style.height = (array[60]/1.5)+ '%';
        logoEl.style.width = (array[60]/8)+ '%';
        logoEl.style.background  = `radial-gradient(circle, rgba(${array[55]-25},${array[30]-25},${array[60]-25},1) 0%, rgba(${array[60]},${array[15]},${array[40]},1) 54%)`;
    }
    logo.style.height = (array[60]/2)+ '%';
    logo.style.width = (array[60]/2) + '%';
    logo.style.background  = `radial-gradient(circle, rgba(${array[40]},${array[50]},${array[60]},1) ${array[70]/4}%, rgba(${array[40]},${array[60]},${array[50]},1) ${array[60]/2}%)`;
    logo.style.boxShadow = `0 0 ${array[70]}px rgb(${array[40]},${array[50]},${array[60]})`;
    for(bodyBorderItem of bodyBorder) {
        bodyBorderItem.style.boxShadow = `0 0 ${array[70]/2}px rgb(${array[40]},${array[50]},${array[60]})`;
    }

    if(switchDegrees) {
        fullLogo.style.transform = `rotate(${Number(array[40])}deg)`;
    }
    else {
        fullLogo.style.transform = `rotate(-${Number(array[40])}deg)`;
    }

    let currentTime = Number(audio.currentTime);
    const audioDuration = Number(audio.duration);
    let audioDurationSec = undefined;
    let currentTimeSec = undefined;
    Math.trunc(audioDuration%60)>10 ? audioDurationSec = Math.trunc(audioDuration%60) : audioDurationSec = '0' + Math.trunc(audioDuration%60);
    currentTime>60 ? currentTimeSec = Math.trunc(currentTime%60) : currentTimeSec = '0' + Math.trunc(currentTime%60);

    if(Math.trunc(currentTime%60) >= 10) {
        currentTimeSec = Math.trunc(currentTime%60);
    }
    else {
        currentTimeSec = '0' + Math.trunc(currentTime%60);
    }
    if(currentTime >= audioDuration) {
        playButton.classList.remove('playing');
    }
    durationLine.style.width = `${(currentTime/audioDuration)*100}%`;
    currentTimeStat.innerText = `${Math.floor(currentTime/60)}:${currentTimeSec}`;
    durationTimeStat.innerText = `${Math.floor(audioDuration/60)}:${audioDurationSec}`;

}
volumeControl.addEventListener('input', function(e) {
    e.preventDefault();
    audio.volume = volumeControl.value;
    volumeLine.style.width = `${Number(volumeControl.value)*100}%`
})

audioLineControl.addEventListener('click', function(e) {
    e.preventDefault();
    const audioDuration = Number(audio.duration);
    const audioControl = Number(audioLineControl.value);
    let currentTime = audioControl*audioDuration;
    audio.currentTime = currentTime;
    if(!context) {
        preparation();
    }
    if(audio.paused) {
        audio.play();
        loop()
        playButton.classList.add('playing');
    }
})
