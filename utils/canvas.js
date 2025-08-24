// Virtual Try-On: Resize & Rotate Clothing Items
document.addEventListener('DOMContentLoaded', () => {
    const canvasContainer = document.querySelector('.canvas-container');

    canvasContainer.addEventListener('click', e => {
        if(e.target.classList.contains('card')){
            selectItem(e.target);
        }
    });

    let selectedItem = null;

    function selectItem(item){
        selectedItem = item;
        // Add border to show selection
        document.querySelectorAll('.canvas-container .card').forEach(c=>c.style.border='none');
        item.style.border='2px dashed #8c52ff';
    }

    // Keyboard Controls for selected item
    document.addEventListener('keydown', e => {
        if(!selectedItem) return;

        const step = 5;
        const rotateStep = 5;

        const left = parseInt(selectedItem.style.left || 0);
        const top = parseInt(selectedItem.style.top || 0);
        const rotate = selectedItem.dataset.rotate ? parseInt(selectedItem.dataset.rotate) : 0;

        switch(e.key){
            case 'ArrowLeft':
                selectedItem.style.left = left - step + 'px';
                break;
            case 'ArrowRight':
                selectedItem.style.left = left + step + 'px';
                break;
            case 'ArrowUp':
                selectedItem.style.top = top - step + 'px';
                break;
            case 'ArrowDown':
                selectedItem.style.top = top + step + 'px';
                break;
            case 'r': // Rotate clockwise
                selectedItem.dataset.rotate = rotate + rotateStep;
                selectedItem.style.transform = `rotate(${rotate + rotateStep}deg)`;
                break;
            case 'R': // Rotate counter-clockwise
                selectedItem.dataset.rotate = rotate - rotateStep;
                selectedItem.style.transform = `rotate(${rotate - rotateStep}deg)`;
                break;
            case '+': // Scale up
                const currentScale = selectedItem.dataset.scale ? parseFloat(selectedItem.dataset.scale) : 1;
                const newScale = currentScale + 0.1;
                selectedItem.dataset.scale = newScale;
                selectedItem.style.transform = `rotate(${rotate}deg) scale(${newScale})`;
                break;
            case '-': // Scale down
                const curScale = selectedItem.dataset.scale ? parseFloat(selectedItem.dataset.scale) : 1;
                const decScale = curScale - 0.1;
                selectedItem.dataset.scale = decScale;
                selectedItem.style.transform = `rotate(${rotate}deg) scale(${decScale})`;
                break;
        }
    });
});
