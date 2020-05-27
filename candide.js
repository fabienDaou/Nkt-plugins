$.plugin({
    name: "Candide",
    videoNodeId: "videoDaou",
    init: function () {
        const video = document.createElement("video");
        video.setAttribute("id", this.videoNodeId);
        video.setAttribute("autoplay", true);

        const hiddenCanvas = document.createElement("canvas");
        hiddenCanvas.setAttribute("id", "hiddenCanvas");
        hiddenCanvas.style.display = "none";

        const outputCanvas = document.createElement("canvas");
        outputCanvas.setAttribute("id", "outputCanvas");
        outputCanvas.style.backgroundColor = "black";

        const listNode = document.getElementById("list");
        listNode.parentNode.appendChild(video);
        listNode.parentNode.appendChild(hiddenCanvas);
        listNode.parentNode.appendChild(outputCanvas);

        const hiddenContext = hiddenCanvas.getContext('2d');
        const outputContext = outputCanvas.getContext('2d');

        const constraints = {
            video: {
                width: 100,
                height: 100,
            }
        };

        const getGrayScale = frame => {
            const length = frame.data.length / 4;

            let r = 0;
            let g = 0;
            let b = 0;

            for (let i = 0; i < length; i++) {
                r += frame.data[i * 4 + 0];
                g += frame.data[i * 4 + 1];
                b += frame.data[i * 4 + 2];
            }
            const average = (r + g + b) / 3;
            return {
                r: average / length,
                g: average / length,
                b: average / length,
            };
        }

        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&()/\\+<>';

        const processFrame = () => {
            const fontHeight = 7;
            const { videoWidth: width, videoHeight: height } = video;

            if (width && height) {
                hiddenCanvas.width = width;
                hiddenCanvas.height = height;
                outputCanvas.width = width;
                outputCanvas.height = height;
                hiddenContext.drawImage(video, 0, 0, width, height);

                outputContext.textBaseline = 'top';
                outputContext.font = `${fontHeight}px Consolas`;

                const text = outputContext.measureText('@');
                const fontWidth = parseInt(text.width);

                outputContext.clearRect(0, 0, width, height);

                for (let y = 0; y < height; y += fontHeight) {
                    for (let x = 0; x < width; x += fontWidth) {
                        const frameSection = hiddenContext.getImageData(x, y, fontWidth, fontHeight);
                        const { r, g, b } = getGrayScale(frameSection);
                        const randomCharacter = charset[Math.floor(Math.random() * charset.length)];

                        outputContext.fillStyle = `rgb(${r},${g},${b})`;
                        outputContext.fillText(randomCharacter, x, y);
                    }
                }
            }

            window.requestAnimationFrame(processFrame);
        };

        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                video.srcObject = stream;
            }).catch(err => {
                console.error(err);
            });

        video.addEventListener('play', function () {
            window.requestAnimationFrame(processFrame);
            console.log('Live!');
        });
    },
    stop: function () {
        document.getElementById(this.videoNodeId).remove();
        document.getElementById("hiddenCanvas").remove();
        document.getElementById("outputCanvas").remove();
    }
})