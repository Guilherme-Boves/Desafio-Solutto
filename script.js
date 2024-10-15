async function startFullAnimation() {
    await timeOut(4000);
    await startAvatarAnimation();
    await playAudio();
    showOrHideReplayButton(false);
}

async function restartAnimation() {
    showOrHideReplayButton(true);
    await startAvatarAnimation();
    await playAudio();
    showOrHideReplayButton(false);
}

function timeOut(timeInMilliseconds) {
    return new Promise((resolve) => setTimeout(resolve, timeInMilliseconds));
}

function startAvatarAnimation() {
    return new Promise(async (resolve) => {
                
        const avatarArray = [
            "https://storage.googleapis.com/mokaly_public/assets/avatars/mokaly-avatar-cup-2.png",
            "https://storage.googleapis.com/mokaly_public/assets/avatars/mokaly-avatar-cup-3.png",
            "https://storage.googleapis.com/mokaly_public/assets/avatars/mokaly-avatar-cup-4.png",
            "https://storage.googleapis.com/mokaly_public/assets/avatars/mokaly-avatar-cup-5.png",
            "https://storage.googleapis.com/mokaly_public/assets/avatars/mokaly-avatar-cup-6.png"
        ];

        let timer = 0;
        for (let index = 0; index < avatarArray.length; index++) {   

            await timeOut(timer); // O primeiro avatar será exibido imediatamente
            timer = 2000; // Os avatares restantes serão exibidos com o intervalo de 2 segundos

            // Criando container que irá envolver cada avatar
            const avatarContainer = document.createElement('div');
            avatarContainer.setAttribute('class', 'avatar-container');

            // Atribuindo uma porcentagem aleatória para a propriedade "left".
            // Desta forma os elementos serão exibidos em uma posição aleatória do eixo X
            const randomLeftValue = Math.floor(Math.random() * 100);
            avatarContainer.style.left = randomLeftValue + '%';

            // Criando elemento de imagem que exibirá os avatares
            const img = document.createElement('img');
            img.setAttribute('id', `avatar-${index+1}`);
            img.setAttribute('src', avatarArray[index]);
            img.setAttribute('class', "circular-mask-image");
            avatarContainer.appendChild(img);
            document.body.appendChild(avatarContainer);

            // Removendo o elemento quando chegar ao topo da página após os 3 segundos de animação
            setTimeout(() => {
                document.body.removeChild(avatarContainer);

                // Finalizando a Promise após todos os elementos serem exibidos
                if (index+1 === avatarArray.length) {
                    resolve();
                }
            }, 3000);
        }
    })
}

function playAudio() {
    return new Promise((resolve) => {
        const audio = document.getElementById("audio")
        audio.play();
        resolve();
    })
}

function showOrHideReplayButton(showOrHideButton) {
    const button = document.getElementById("replay-animation-button")
    button.hidden = showOrHideButton;
}