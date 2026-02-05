document.addEventListener('DOMContentLoaded', () => {
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');

    yesButton.addEventListener('click', () => {
        const gifDisplay = document.getElementById('gifDisplay');
        const question = document.querySelector('.question');
        const buttonsContainer = document.querySelector('.buttons');

        gifDisplay.src = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDUxdjB4cGtjNW93MDB6bTM3OXc1YmUwcWd3eDFzMW90amtlZmNqOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/o75ajIFH0QnQC3nJqv/giphy.gif'; // Placeholder GIF URL
        gifDisplay.classList.remove('hidden');

        question.classList.add('hidden');
        buttonsContainer.classList.add('hidden');
    });

    const repelOffset = 50; // Minimum distance the button's edge should be from the cursor

    // Get the initial position of the noButton before any transforms are applied
    // This is the position when transform is translate(0,0)
    // We need to get this once when the DOM content is loaded.
    const initialNoButtonRect = noButton.getBoundingClientRect();
    const initialNoButtonCenterX = initialNoButtonRect.left + initialNoButtonRect.width / 2;
    const initialNoButtonCenterY = initialNoButtonRect.top + initialNoButtonRect.height / 2;

    // A flag to indicate if the button is currently being repelled
    let isRepelling = false;

    // Attach mousemove to the document to continuously check mouse position
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Get the current (rendered) position of the noButton
        const currentNoButtonRect = noButton.getBoundingClientRect();
        const currentNoButtonCenterX = currentNoButtonRect.left + currentNoButtonRect.width / 2;
        const currentNoButtonCenterY = currentNoButtonRect.top + currentNoButtonRect.height / 2;

        // Calculate vector from mouse to current button center
        const vectorX = currentNoButtonCenterX - mouseX;
        const vectorY = currentNoButtonCenterY - mouseY;
        const distance = Math.sqrt(vectorX * vectorX + vectorY * vectorY);

        // Calculate the minimum distance required from the mouse to the button's center
        // This is the button's radius plus the desired repelOffset
        const minCenterDistance = (currentNoButtonRect.width / 2) + repelOffset;

        if (distance < minCenterDistance) { // If mouse is too close to the button's center
            isRepelling = true;

            // Calculate the desired position for the button's center
            // Move the button's center away from the mouse by `minCenterDistance`
            // Ensure distance is not zero to avoid division by zero
            const normalizedVectorX = distance === 0 ? 0 : vectorX / distance;
            const normalizedVectorY = distance === 0 ? 0 : vectorY / distance;

            const targetNoButtonCenterX = mouseX + normalizedVectorX * minCenterDistance;
            const targetNoButtonCenterY = mouseY + normalizedVectorY * minCenterDistance;

            // Calculate the translation needed from its initial, untranslated position
            const newTranslateX = targetNoButtonCenterX - initialNoButtonCenterX;
            const newTranslateY = targetNoButtonCenterY - initialNoButtonCenterY;

            noButton.style.transform = `translate(${newTranslateX}px, ${newTranslateY}px)`;
        } else {
            // If mouse is far enough away, and if the button was repelling, reset it
            if (isRepelling) {
                noButton.style.transform = 'translate(0, 0)';
                isRepelling = false;
            }
        }
    });
});
