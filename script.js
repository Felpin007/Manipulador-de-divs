window.onload = function() {
    let numDivsSlider = document.getElementById('numDivs');
    let divSizeSlider = document.getElementById('divSize');
    let modeSlider = document.getElementById('mode');
    let forceSlider = document.getElementById('force');
    let speedSlider = document.getElementById('speed');
    let createButton = document.getElementById('createButton');

    let numDivs = parseInt(numDivsSlider.value);
    let divSize = parseInt(divSizeSlider.value);
    let mode = modeSlider.value === '0' ? 'R' : 'P'; // 0 = Repel, 1 = Attract
    let force = parseInt(forceSlider.value);
    let speed = parseInt(speedSlider.value);

    numDivsSlider.oninput = function() {
        numDivs = parseInt(this.value);
    }

    divSizeSlider.oninput = function() {
        divSize = parseInt(this.value);
    }

    modeSlider.oninput = function() {
        mode = this.value === '0' ? 'R' : 'P';
    }

    forceSlider.oninput = function() {
        force = parseInt(this.value);
    }

    speedSlider.oninput = function() {
        speed = parseInt(this.value);
    }

    createButton.onclick = function() {
        for (let i = 0; i < numDivs; i++) {
            let div = document.createElement('div');
            div.className = 'randomDiv';
            div.style.width = `${divSize}px`;
            div.style.height = `${divSize}px`;
            div.style.backgroundColor = getRandomColor();
            div.style.left = `${Math.random() * window.innerWidth}px`;
            div.style.top = `${Math.random() * window.innerHeight}px`;
            div.style.transform = `rotate(${Math.random() * 360}deg)`;
            document.body.appendChild(div);
        }
    };

    document.onmousemove = function(e) {
        let divs = document.getElementsByClassName('randomDiv');
        for (let i = 0; i < divs.length; i++) {
            let div = divs[i];
            let dx = e.clientX - div.offsetLeft;
            let dy = e.clientY - div.offsetTop;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 150) {
                let angle = Math.atan2(dy, dx);
                if (mode === 'R') {
                    div.style.left = `${div.offsetLeft - Math.cos(angle) * force}px`;
                    div.style.top = `${div.offsetTop - Math.sin(angle) * force}px`;
                } else if (mode === 'P') {
                    div.style.left = `${div.offsetLeft + Math.cos(angle) * speed}px`;
                    div.style.top = `${div.offsetTop + Math.sin(angle) * speed}px`;
                }
            }
        }
    };
};

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}