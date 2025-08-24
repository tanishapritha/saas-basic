// Enable drag & drop for wardrobe cards
document.addEventListener('DOMContentLoaded', () => {
    const wardrobeGrid = document.getElementById('wardrobeGrid');

    let draggedItem = null;

    wardrobeGrid.addEventListener('dragstart', e => {
        if (e.target.classList.contains('card')) {
            draggedItem = e.target;
            setTimeout(() => e.target.style.display = 'none', 0);
        }
    });

    wardrobeGrid.addEventListener('dragend', e => {
        if (e.target.classList.contains('card')) {
            e.target.style.display = 'block';
            draggedItem = null;
        }
    });

    // Drop zones (for try-on or calendar)
    const dropZones = document.querySelectorAll('.canvas-container, #calendarGrid');

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', e => e.preventDefault());
        zone.addEventListener('drop', e => {
            e.preventDefault();
            if (draggedItem) {
                const clone = draggedItem.cloneNode(true);
                clone.style.position = 'absolute';
                clone.style.top = (e.offsetY - clone.offsetHeight/2) + 'px';
                clone.style.left = (e.offsetX - clone.offsetWidth/2) + 'px';
                if (zone.id === 'calendarGrid') {
                    clone.style.position = 'relative';
                    clone.style.top = '0';
                    clone.style.left = '0';
                    zone.appendChild(clone);
                } else {
                    zone.appendChild(clone);
                    makeDraggable(clone);
                }
            }
        });
    });

    // Function to make cloned items draggable inside canvas
    function makeDraggable(el){
        let offsetX, offsetY;
        el.addEventListener('mousedown', e => {
            offsetX = e.offsetX;
            offsetY = e.offsetY;

            function mouseMoveHandler(e){
                el.style.left = (e.clientX - offsetX - el.parentElement.getBoundingClientRect().left) + 'px';
                el.style.top = (e.clientY - offsetY - el.parentElement.getBoundingClientRect().top) + 'px';
            }

            function mouseUpHandler(){
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
            }

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        });
    }
});
