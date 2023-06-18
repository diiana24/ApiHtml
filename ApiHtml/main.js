const fileSelector = document.querySelector("input[type=file]");
const video = document.querySelector("video");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const volUp = document.getElementById("vol-up");
const volDown = document.getElementById("vol-down");
const loadingMessage = document.getElementById('loading-message');
const videoPlayer = document.getElementById('video-player');

function fileSupported() {
  return 'File' in window && 'FileReader' in window && 'Blob' in window;
}

function validateVideoFile(file) {
  const acceptedMimeTypes = [
    'video/mp4',
    'video/webm',
    'video/ogg',
  ];

  return acceptedMimeTypes.includes(file.type);
}

if (!fileSupported()) {
  alert('Lo sentimos, tu navegador no es compatible. Por favor, intentelo con un nuevo navegador');
} else {
  fileSelector.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file && validateVideoFile(file)) {
      loadingMessage.style.display = 'block';
      const fileReader = new FileReader();

      fileReader.onload= (event) => {
        const blob = new Blob([event.target.result], { type: file.type });
        const url = URL.createObjectURL(blob);
        video.src = url;
      };
      fileReader.readAsArrayBuffer(file);

    } else {
      alert('Por favor, selecciona un archivo de vídeo válido.');
      fileSelector.value = '';
    }
  });
  play.addEventListener('click', () => {
    video.play();
  });
  pause.addEventListener('click', () => {
    video.pause();
  });
  volUp.addEventListener('click', () => {
    if (video.volume < 1) {
      video.volume += 0.1;
    }
  });
  volDown.addEventListener('click', () => {
    if (video.volume > 0) {
      video.volume -= 0.1;
    }
  });

  video.addEventListener('loadeddata', () => {
    loadingMessage.style.display = 'none';
    videoPlayer.style.display = 'block';
  });
}