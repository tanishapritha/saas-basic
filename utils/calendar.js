document.addEventListener('DOMContentLoaded', () => {
    const calendarGrid = document.getElementById('calendarGrid');

    // Generate 7-day calendar slots
    const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    days.forEach(day=>{
        const slot = document.createElement('div');
        slot.className='calendar-slot';
        slot.style.minHeight='100px';
        slot.style.border='1px solid #ccc';
        slot.style.borderRadius='8px';
        slot.style.padding='5px';
        slot.style.display='flex';
        slot.style.flexDirection='column';
        slot.innerHTML=`<strong>${day}</strong>`;
        calendarGrid.appendChild(slot);

        // Enable drop
        slot.addEventListener('dragover', e=>e.preventDefault());
        slot.addEventListener('drop', e=>{
            e.preventDefault();
            const card = document.querySelector('.wardrobe-grid .card.dragging') || e.dataTransfer.getData('text/html');
            if(card){
                const clone = card.cloneNode(true);
                clone.style.position='relative';
                clone.style.top='0';
                clone.style.left='0';
                clone.style.margin='2px 0';
                slot.appendChild(clone);
            }
        });
    });

    // Add dragging class on drag start
    document.querySelectorAll('.wardrobe-grid .card').forEach(card=>{
        card.addEventListener('dragstart', ()=>card.classList.add('dragging'));
        card.addEventListener('dragend', ()=>card.classList.remove('dragging'));
    });
});
