document.addEventListener('DOMContentLoaded', () => {
    const puzzleContainer = document.getElementById('puzzleContainer');
    const puzzleImage = document.getElementById('puzzleImage');
    const pieceSize = 100;
    const numPieces = 4; // 2x2 grid
    const pieces = [];

    function createPuzzlePieces() {
        for (let i = 0; i < numPieces; i++) {
            const piece = document.createElement('div');
            piece.classList.add('puzzle-piece');
            piece.draggable = true;

            const row = Math.floor(i / 2);
            const col = i % 2;

            piece.style.backgroundImage = `url(${puzzleImage.src})`;
            piece.style.backgroundPosition = `-${col * pieceSize}px -${row * pieceSize}px`;
            piece.style.left = `${Math.random() * (puzzleContainer.clientWidth - pieceSize)}px`;
            piece.style.top = `${Math.random() * (puzzleContainer.clientHeight - pieceSize)}px`;

            piece.dataset.row = row;
            piece.dataset.col = col;

            piece.addEventListener('dragstart', onDragStart);
            piece.addEventListener('dragend', onDragEnd);
            puzzleContainer.appendChild(piece);
            pieces.push(piece);
        }
    }

    function onDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.row + ',' + e.target.dataset.col);
    }

    function onDragEnd(e) {
        e.preventDefault();
        const target = e.target;
        const rect = puzzleContainer.getBoundingClientRect();
        const x = e.clientX - rect.left - pieceSize / 2;
        const y = e.clientY - rect.top - pieceSize / 2;

        target.style.left = `${Math.max(0, Math.min(rect.width - pieceSize, x))}px`;
        target.style.top = `${Math.max(0, Math.min(rect.height - pieceSize, y))}px`;

        if (checkPiecePosition(target)) {
            target.style.left = `${target.dataset.col * pieceSize}px`;
            target.style.top = `${target.dataset.row * pieceSize}px`;
            target.style.cursor = 'default';
        }
    }

    function checkPiecePosition(piece) {
        const rect = piece.getBoundingClientRect();
        const puzzleRect = puzzleContainer.getBoundingClientRect();

        const row = parseInt(piece.dataset.row, 10);
        const col = parseInt(piece.dataset.col, 10);

        return Math.abs(rect.left - col * pieceSize) < pieceSize / 2 &&
               Math.abs(rect.top - row * pieceSize) < pieceSize / 2;
    }

    createPuzzlePieces();
});
