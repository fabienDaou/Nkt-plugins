$.plugin({
    name: "MontreTonBoule",
    videoNodeId: "videoDaou",
    stopPlaying: false,
    init: function () {
        const video = document.createElement("video");
        video.setAttribute("id", this.videoNodeId);
        // video.setAttribute("autoplay", true);

        const hiddenCanvas = document.createElement("canvas");
        hiddenCanvas.setAttribute("id", "hiddenCanvas");
        // hiddenCanvas.style.display = "none";

        const asciiImage = document.createElement("img");
        asciiImage.setAttribute("id", "ascii");

        const listNode = document.getElementById("list");
        listNode.parentNode.appendChild(video);
        listNode.parentNode.appendChild(hiddenCanvas);
        listNode.parentNode.appendChild(asciiImage);

        const hiddenContext = hiddenCanvas.getContext('2d');

        const constraints = {
            video: {
                width: 100,
                height: 100,
            }
        };

        const processFrame = () => {
            const fontHeight = 7;
            const { videoWidth, videoHeight } = video;
            const [width, height] = clampDimensions(videoWidth, videoHeight);

            if (width && height) {
                hiddenCanvas.width = width;
                hiddenCanvas.height = height;
                hiddenContext.drawImage(video, 0, 0, width, height);

                const grayScales = convertToGrayScales(hiddenContext, width, height);
                drawAscii(grayScales, width);
            }

            if (!this.stopPlaying) {
                window.requestAnimationFrame(processFrame);
            }
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

        /////////////

        const toGrayScale = (r, g, b) => 0.21 * r + 0.72 * g + 0.07 * b;

        const getFontRatio = () => {
            const pre = document.createElement('pre');
            pre.style.display = 'inline';
            pre.textContent = ' ';

            document.body.appendChild(pre);
            const { width, height } = pre.getBoundingClientRect();
            document.body.removeChild(pre);

            return height / width;
        };

        const convertToGrayScales = (context, width, height) => {
            const imageData = context.getImageData(0, 0, width, height);

            const grayScales = [];

            for (let i = 0; i < imageData.data.length; i += 4) {
                const r = imageData.data[i];
                const g = imageData.data[i + 1];
                const b = imageData.data[i + 2];

                const grayScale = toGrayScale(r, g, b);
                imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = grayScale;

                grayScales.push(grayScale);
            }

            context.putImageData(imageData, 0, 0);

            return grayScales;
        };

        const MAXIMUM_WIDTH = 80;
        const MAXIMUM_HEIGHT = 80;

        const clampDimensions = (width, height) => {
            const rectifiedWidth = Math.floor(getFontRatio() * width);

            if (height > MAXIMUM_HEIGHT) {
                const reducedWidth = Math.floor(rectifiedWidth * MAXIMUM_HEIGHT / height);
                return [reducedWidth, MAXIMUM_HEIGHT];
            }

            if (width > MAXIMUM_WIDTH) {
                const reducedHeight = Math.floor(height * MAXIMUM_WIDTH / rectifiedWidth);
                return [MAXIMUM_WIDTH, reducedHeight];
            }

            return [rectifiedWidth, height];
        };

        const grayRamp = '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,"^`\'. ';
        const rampLength = grayRamp.length;

        const getCharacterForGrayScale = grayScale => grayRamp[Math.ceil((rampLength - 1) * grayScale / 255)];

        const drawAscii = (grayScales, width) => {
            const ascii = grayScales.reduce((asciiImage, grayScale, index) => {
                let nextChars = getCharacterForGrayScale(grayScale);
                if ((index + 1) % width === 0) {
                    nextChars += '\n';
                }

                return asciiImage + nextChars;
            }, '');
            $.chat.write(ascii, 'Djambot');
            // asciiImage.textContent = ascii;
        };

    },
    stop: function () {
        this.stopPlaying = true;
        const video = document.getElementById(this.videoNodeId);
        video.pause();
        video.remove();
        document.getElementById("hiddenCanvas").remove();
        document.getElementById("ascii").remove();
    }
})