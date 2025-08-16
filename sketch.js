// Глобальные переменные для параметров цветка
let petalsSlider, sizeSlider, complexitySlider, rotationSlider;
let centerColorPicker, petalColorPicker, backgroundColorPicker;
let canvas;

// Параметры цветка
let flowerParams = {
    petals: 8,
    size: 100,
    complexity: 5,
    rotation: 0,
    centerColor: '#ff6b9d',
    petalColor: '#ff9ecd',
    backgroundColor: '#2c3e50'
};

function setup() {
    // Создаем canvas в контейнере
    canvas = createCanvas(600, 600);
    canvas.parent('canvas-container');
    
    // Инициализируем слайдеры и цветовые пикеры
    setupControls();
    
    // Устанавливаем начальные значения
    updateDisplayValues();
}

function draw() {
    // Обновляем параметры из слайдеров
    updateParams();
    
    // Рисуем цветок
    drawJuliaFlower();
}

function setupControls() {
    // Получаем элементы управления
    petalsSlider = document.getElementById('petals');
    sizeSlider = document.getElementById('size');
    complexitySlider = document.getElementById('complexity');
    rotationSlider = document.getElementById('rotation');
    centerColorPicker = document.getElementById('center-color');
    petalColorPicker = document.getElementById('petal-color');
    backgroundColorPicker = document.getElementById('background-color');
    
    // Добавляем обработчики событий
    petalsSlider.addEventListener('input', updateDisplayValues);
    sizeSlider.addEventListener('input', updateDisplayValues);
    complexitySlider.addEventListener('input', updateDisplayValues);
    rotationSlider.addEventListener('input', updateDisplayValues);
    
    centerColorPicker.addEventListener('change', updateParams);
    petalColorPicker.addEventListener('change', updateParams);
    backgroundColorPicker.addEventListener('change', updateParams);
}

function updateDisplayValues() {
    document.getElementById('petals-value').textContent = petalsSlider.value;
    document.getElementById('size-value').textContent = sizeSlider.value;
    document.getElementById('complexity-value').textContent = complexitySlider.value;
    document.getElementById('rotation-value').textContent = rotationSlider.value;
}

function updateParams() {
    flowerParams.petals = parseInt(petalsSlider.value);
    flowerParams.size = parseInt(sizeSlider.value);
    flowerParams.complexity = parseInt(complexitySlider.value);
    flowerParams.rotation = parseInt(rotationSlider.value);
    flowerParams.centerColor = centerColorPicker.value;
    flowerParams.petalColor = petalColorPicker.value;
    flowerParams.backgroundColor = backgroundColorPicker.value;
}

function drawJuliaFlower() {
    // Устанавливаем фон
    background(flowerParams.backgroundColor);
    
    // Перемещаем в центр canvas
    translate(width / 2, height / 2);
    
    // Применяем поворот
    rotate(radians(flowerParams.rotation));
    
    // Рисуем лепестки
    drawPetals();
    
    // Рисуем центр цветка
    drawCenter();
    
    // Рисуем дополнительные детали
    drawDetails();
}

function drawPetals() {
    const numPetals = flowerParams.petals;
    const petalSize = flowerParams.size;
    const complexity = flowerParams.complexity;
    
    // Основные лепестки
    for (let i = 0; i < numPetals; i++) {
        push();
        rotate((TWO_PI / numPetals) * i);
        
        // Градиент для лепестка
        let petalColor = color(flowerParams.petalColor);
        let darkPetalColor = color(flowerParams.petalColor);
        darkPetalColor.setAlpha(150);
        
        // Рисуем основной лепесток
        fill(petalColor);
        noStroke();
        ellipse(petalSize * 0.3, 0, petalSize * 0.6, petalSize * 0.4);
        
        // Добавляем тень
        fill(darkPetalColor);
        ellipse(petalSize * 0.35, 5, petalSize * 0.5, petalSize * 0.3);
        
        // Дополнительные лепестки для сложности
        if (complexity > 3) {
            fill(petalColor);
            ellipse(petalSize * 0.6, 0, petalSize * 0.3, petalSize * 0.2);
        }
        
        if (complexity > 6) {
            fill(darkPetalColor);
            ellipse(petalSize * 0.8, 0, petalSize * 0.15, petalSize * 0.1);
        }
        
        pop();
    }
    
    // Внутренние лепестки
    if (complexity > 2) {
        for (let i = 0; i < numPetals * 2; i++) {
            push();
            rotate((TWO_PI / (numPetals * 2)) * i);
            
            let innerColor = color(flowerParams.petalColor);
            innerColor.setAlpha(200);
            fill(innerColor);
            
            ellipse(petalSize * 0.15, 0, petalSize * 0.2, petalSize * 0.15);
            pop();
        }
    }
}

function drawCenter() {
    const centerSize = flowerParams.size * 0.3;
    
    // Основной центр
    fill(flowerParams.centerColor);
    noStroke();
    circle(0, 0, centerSize);
    
    // Внутренний круг
    let innerColor = color(flowerParams.centerColor);
    innerColor.setAlpha(180);
    fill(innerColor);
    circle(0, 0, centerSize * 0.7);
    
    // Самый внутренний круг
    let coreColor = color(flowerParams.centerColor);
    coreColor.setAlpha(220);
    fill(coreColor);
    circle(0, 0, centerSize * 0.4);
    
    // Точки в центре
    if (flowerParams.complexity > 4) {
        fill(255, 255, 255, 100);
        for (let i = 0; i < 8; i++) {
            push();
            rotate((TWO_PI / 8) * i);
            circle(centerSize * 0.15, 0, 3);
            pop();
        }
    }
}

function drawDetails() {
    const complexity = flowerParams.complexity;
    const size = flowerParams.size;
    
    // Дополнительные узоры
    if (complexity > 5) {
        stroke(255, 255, 255, 50);
        strokeWeight(1);
        noFill();
        
        // Концентрические круги
        for (let i = 1; i <= 3; i++) {
            circle(0, 0, size * 0.1 * i);
        }
    }
    
    // Точки вокруг цветка
    if (complexity > 7) {
        fill(255, 255, 255, 80);
        noStroke();
        
        for (let i = 0; i < 12; i++) {
            push();
            rotate((TWO_PI / 12) * i);
            circle(size * 0.9, 0, 4);
            pop();
        }
    }
}

// Функция для генерации случайного цветка
function randomizeFlower() {
    // Случайные значения для параметров
    const randomPetals = Math.floor(Math.random() * 18) + 3; // 3-20
    const randomSize = Math.floor(Math.random() * 151) + 50; // 50-200
    const randomComplexity = Math.floor(Math.random() * 10) + 1; // 1-10
    const randomRotation = Math.floor(Math.random() * 360); // 0-360
    
    // Случайные цвета
    const randomColors = [
        ['#ff6b9d', '#ff9ecd', '#2c3e50'], // Розовый
        ['#ffd93d', '#ff6b6b', '#4ecdc4'], // Желтый
        ['#a8e6cf', '#dcedc1', '#ffd3b6'], // Зеленый
        ['#ff9a9e', '#fecfef', '#fecfef'], // Розовый
        ['#a8edea', '#fed6e3', '#c06c84'], // Голубой
        ['#ffecd2', '#fcb69f', '#ff9a9e'], // Оранжевый
        ['#d299c2', '#fef9d7', '#667eea'], // Фиолетовый
        ['#89f7fe', '#66a6ff', '#2c3e50'], // Синий
        ['#f093fb', '#f5576c', '#4facfe'], // Градиент
        ['#4facfe', '#00f2fe', '#43e97b']  // Голубой-зеленый
    ];
    
    const randomColorSet = randomColors[Math.floor(Math.random() * randomColors.length)];
    
    // Устанавливаем значения в слайдеры
    petalsSlider.value = randomPetals;
    sizeSlider.value = randomSize;
    complexitySlider.value = randomComplexity;
    rotationSlider.value = randomRotation;
    
    // Устанавливаем цвета
    centerColorPicker.value = randomColorSet[0];
    petalColorPicker.value = randomColorSet[1];
    backgroundColorPicker.value = randomColorSet[2];
    
    // Обновляем отображение
    updateDisplayValues();
    updateParams();
}

// Функция для сохранения изображения
function saveImage() {
    // Создаем временный canvas для сохранения
    let saveCanvas = createGraphics(800, 800);
    saveCanvas.background(flowerParams.backgroundColor);
    saveCanvas.translate(400, 400);
    saveCanvas.rotate(radians(flowerParams.rotation));
    
    // Рисуем цветок на временном canvas
    drawFlowerOnCanvas(saveCanvas);
    
    // Сохраняем изображение
    saveCanvas.save('julia-flower.png');
}

// Функция для рисования цветка на указанном canvas
function drawFlowerOnCanvas(canvas) {
    const numPetals = flowerParams.petals;
    const petalSize = flowerParams.size * 1.5; // Увеличиваем размер для сохранения
    const complexity = flowerParams.complexity;
    
    // Рисуем лепестки
    for (let i = 0; i < numPetals; i++) {
        canvas.push();
        canvas.rotate((TWO_PI / numPetals) * i);
        
        let petalColor = canvas.color(flowerParams.petalColor);
        let darkPetalColor = canvas.color(flowerParams.petalColor);
        darkPetalColor.setAlpha(150);
        
        canvas.fill(petalColor);
        canvas.noStroke();
        canvas.ellipse(petalSize * 0.3, 0, petalSize * 0.6, petalSize * 0.4);
        
        canvas.fill(darkPetalColor);
        canvas.ellipse(petalSize * 0.35, 5, petalSize * 0.5, petalSize * 0.3);
        
        if (complexity > 3) {
            canvas.fill(petalColor);
            canvas.ellipse(petalSize * 0.6, 0, petalSize * 0.3, petalSize * 0.2);
        }
        
        if (complexity > 6) {
            canvas.fill(darkPetalColor);
            canvas.ellipse(petalSize * 0.8, 0, petalSize * 0.15, petalSize * 0.1);
        }
        
        canvas.pop();
    }
    
    // Рисуем центр
    const centerSize = petalSize * 0.3;
    canvas.fill(flowerParams.centerColor);
    canvas.circle(0, 0, centerSize);
    
    let innerColor = canvas.color(flowerParams.centerColor);
    innerColor.setAlpha(180);
    canvas.fill(innerColor);
    canvas.circle(0, 0, centerSize * 0.7);
    
    let coreColor = canvas.color(flowerParams.centerColor);
    coreColor.setAlpha(220);
    canvas.fill(coreColor);
    canvas.circle(0, 0, centerSize * 0.4);
}
