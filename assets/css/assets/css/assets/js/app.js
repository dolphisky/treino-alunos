// Autenticação
function checkAccess() {
    const ACCESS_CODE = "treino2024";
    const input = document.getElementById('access-code');
    
    if(input.value === ACCESS_CODE) {
        localStorage.setItem('authenticated', 'true');
        initApp();
    } else {
        alert('Código inválido!');
    }
}

// Inicialização do App
function initApp() {
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('main-app').style.display = 'block';
    
    // QR Code
    new QRCode(document.getElementById("qrcode-container"), {
        text: window.location.href,
        width: 100,
        height: 100
    });
    
    // Carregar dados
    loadTrainingData();
}

// Carregar dados dos treinos
async function loadTrainingData() {
    try {
        const response = await fetch('training-data.json');
        const data = await response.json();
        renderTrainingDays(data);
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}

// Verificar autenticação ao carregar
if(localStorage.getItem('authenticated') === 'true') {
    initApp();
}
