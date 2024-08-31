window.onload = function() {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = 'img/girasol.jpg';
    const pencil = new Image();
    pencil.src = 'path/to/pencil-image.png';  // Asegúrate de tener una imagen de un lápiz aquí

    let drawnPixels = 0;
    const speed = 5; // Cambia este valor para ajustar la velocidad de la animación

    image.onload = function() {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        animateDrawing();
    };

    function animateDrawing() {
        const width = canvas.width;
        const height = canvas.height;
        const totalPixels = width * height;
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        function draw() {
            const start = drawnPixels;
            const end = Math.min(drawnPixels + speed, totalPixels);

            for (let i = start; i < end; i++) {
                const row = Math.floor(i / width);
                const col = i % width;
                const index = (row * width + col) * 4;

                if (data[index + 3] > 0) { // Verifica si el píxel no es transparente
                    ctx.putImageData(imageData, 0, 0, col, row, 1, 1);
                }
            }

            drawnPixels += speed;

            const pencilX = (drawnPixels % width) - 15;
            const pencilY = Math.floor(drawnPixels / width) - 15;

            if (drawnPixels < totalPixels) {
                ctx.clearRect(pencilX + 15, pencilY + 15, 30, 30);
                ctx.drawImage(pencil, pencilX, pencilY, 30, 30);
                requestAnimationFrame(draw);
            } else {
                ctx.drawImage(image, 0, 0, width, height);
            }
        }

        draw();
    }
};
