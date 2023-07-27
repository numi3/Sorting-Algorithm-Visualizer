document.addEventListener('DOMContentLoaded', function () {

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function generateArray(size, min, max) {
        const array = [];
        for (let i = 0; i < size; i++) {
            const num = Math.floor(Math.random() * (max - min + 1)) + min;
            array.push(num);
        }
        return array;
    }

    const generateArrayBtn = document.getElementById('generateArrayBtn');
    generateArrayBtn.addEventListener('click', function () {
        const arraySize = document.getElementById('arraySize').value;
        const minNum = 1;
        const maxNum = 100;

        const generatedArray = generateArray(arraySize, minNum, maxNum);
        renderArray(generatedArray);
        console.log(generatedArray);
    });

    async function bubbleSort() {
        const array = document.querySelectorAll('.bar');
        const arraySize = array.length;

        for (let k = 0; k < arraySize; k++) {
            for (let i = 0; i < arraySize - 1; i++) {
                const bar1 = array[i];
                const bar2 = array[i + 1];

                bar1.style.backgroundColor = 'lime';
                bar2.style.backgroundColor = 'lime';
                if (parseInt(bar1.dataset.height) > parseInt(bar2.dataset.height)) {
                    bar1.style.backgroundColor = 'red';
                    bar2.style.backgroundColor = 'red';

                    const tmp = bar2.dataset.height;
                    bar2.dataset.height = bar1.dataset.height;
                    bar1.dataset.height = tmp;
                }
                await sleep(0);
                bar1.style.height = `${parseInt(bar1.dataset.height)}%`;
                bar2.style.height = `${parseInt(bar2.dataset.height)}%`;
                bar1.style.backgroundColor = '#2196F3';
                bar2.style.backgroundColor = '#2196F3';
            }
        }
    }

    async function optBubbleSort() {
        const array = document.querySelectorAll('.bar');
        const arraySize = array.length;


        for (let i = 0; i < arraySize - 1; i++) {
            for (let j = 0; j < arraySize - i - 1; j++) {
                const bar1 = array[j];
                const bar2 = array[j + 1];

                bar1.style.backgroundColor = 'lime';
                bar2.style.backgroundColor = 'lime';
                if (parseInt(bar1.dataset.height) > parseInt(bar2.dataset.height)) {
                    bar1.style.backgroundColor = 'red';
                    bar2.style.backgroundColor = 'red';

                    const tmp = bar2.dataset.height;
                    bar2.dataset.height = bar1.dataset.height;
                    bar1.dataset.height = tmp;

                }
                await sleep(0);
                bar1.style.height = `${parseInt(bar1.dataset.height)}%`;
                bar2.style.height = `${parseInt(bar2.dataset.height)}%`;


                bar1.style.backgroundColor = '#2196F3';
                bar2.style.backgroundColor = '#2196F3';
            }
        }
    }


    async function selectionSort() {
        const array = document.querySelectorAll('.bar');
        const arraySize = array.length;

        for (let i = 0; i < arraySize - 1; i++) {
            minIndex = i;
            for (let j = i + 1; j < arraySize; j++) {
                array[i].style.backgroundColor = 'lime';
                const bar1 = array[j];
                const bar2 = array[minIndex];

                bar1.style.backgroundColor = 'black';
                await sleep(0);
                bar1.style.backgroundColor = '#2196F3';

                if (parseInt(bar1.dataset.height) < parseInt(bar2.dataset.height)) {
                    bar1.style.backgroundColor = 'red';
                    minIndex = j;
                    bar2.style.backgroundColor = '#2196F3';
                }


            }

            const tmp = array[i].dataset.height;
            array[i].dataset.height = array[minIndex].dataset.height;
            array[minIndex].dataset.height = tmp;

            array[i].style.height = `${parseInt(array[i].dataset.height)}%`;
            array[minIndex].style.height = `${parseInt(array[minIndex].dataset.height)}%`;

            array[i].style.backgroundColor = '#2196F3';
            array[minIndex].style.backgroundColor = '#2196F3';
        }
    }


    function renderArray(array) {
        const container = document.getElementById('main');
        container.innerHTML = '';

        const maxNum = Math.max(...array);

        array.forEach((num) => {
            const bar = document.createElement('canvas');
            bar.classList.add('bar');
            const heightPercentage = (num / maxNum) * 100;
            bar.dataset.height = heightPercentage;
            bar.style.height = `${heightPercentage}%`;
            container.appendChild(bar);
        });

        resizeArray();
    }

    window.addEventListener('resize', function () {
        resizeArray();
    });

    function resizeArray() {
        const container = document.getElementById('main');
        const containerWidth = container.clientWidth;
        const bars = container.querySelectorAll('.bar');
        const numBars = bars.length;
        const barWidth = Math.floor((containerWidth / numBars) - 1);

        bars.forEach((bar) => {
            bar.style.width = `${barWidth}px`;
        });
    }

    const sortArrayBtn = document.getElementById('startBtn');
    sortArrayBtn.addEventListener('click', function () {
        const alg = selectedAlgorithm();
        if (alg === 'bubbleSort') {
            bubbleSort();
        } else if (alg == 'optBubbleSort') {
            optBubbleSort();
        } else if (alg === 'selectionSort') {
            selectionSort();
        }
    });

    function selectedAlgorithm() {
        return document.getElementById('algorithmSelect').value;
    }

    function fixLabel() {
        const slider = document.getElementById('arraySize');
        const label = document.getElementById('arraySizeLabel');
        label.innerHTML = `Elements: ${slider.value}`;

        slider.addEventListener('input', function () {
            label.innerHTML = `Elements: ${slider.value}`;
        });
    }

    function initializeArray() {
        renderArray(generateArray(document.getElementById('arraySize').value, 1, 100));
    }

    fixLabel();
    initializeArray();
});
