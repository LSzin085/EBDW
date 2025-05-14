document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const audio = document.getElementById('ambiente');
    const popup = document.getElementById('popupSom');
    const btnAtivar = document.getElementById('ativarSom');
    const volumeControl = document.getElementById('volumeControl');
    const volumeContainer = document.getElementById('volumeContainer');
    
    // Configurações iniciais
    function initAudio() {
        // Configura volume inicial (50%)
        audio.volume = 0.5;
        
        // Tenta reproduzir automaticamente (pode ser bloqueado)
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Autoplay foi bloqueado - mostra o popup
                showPopup();
            });
        } else {
            // Navegadores mais antigos - mostra o popup por precaução
            showPopup();
        }
        
        // Configura eventos
        setupEvents();
    }
    
    // Mostra o popup de ativação
    function showPopup() {
        popup.classList.remove('hidden');
    }
    
    // Configura todos os event listeners
    function setupEvents() {
        // Quando clica no botão de ativar
        btnAtivar.addEventListener('click', function() {
            audio.play()
                .then(() => {
                    // Esconde o popup e mostra o controle de volume
                    popup.classList.add('hidden');
                    volumeContainer.style.display = 'block';
                })
                .catch(e => {
                    console.error("Erro ao reproduzir:", e);
                });
        });
        
        // Controle de volume
        volumeControl.addEventListener('input', function() {
            audio.volume = this.value;
        });
        
        // Verifica se o áudio está disponível
        audio.addEventListener('canplay', function() {
            console.log("Áudio carregado e pronto para reprodução");
        });
        
        // Trata erros de carregamento
        audio.addEventListener('error', function() {
            console.error("Erro no áudio:", audio.error);
            const popupText = popup.querySelector('p');
            popupText.textContent = "Erro ao carregar o áudio. Por favor, recarregue a página.";
            popupText.style.color = "#ff6b6b";
        });
    }
    
    // Inicializa o sistema de áudio
    initAudio();
});