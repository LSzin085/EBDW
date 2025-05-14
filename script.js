
const eventDate = new Date('2025-05-30T17:30:00');
eventDate.setDate(eventDate.getDate()); 
eventDate.setHours(20, 0, 0, 0); 

function updateCountdown() {
    const now = new Date();
    const diff = eventDate - now;
    
    if (diff <= 0) {
        document.querySelector('.countdown').innerHTML = '<div style="font-size: 2rem;">O evento começou!</div>';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Atualiza a cada segundo
setInterval(updateCountdown, 1000);

// Chama imediatamente para evitar atraso inicial
updateCountdown();