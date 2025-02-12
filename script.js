document.addEventListener("DOMContentLoaded", function() {
    const images = ["☀️", "🌙", "⭐", "❤️", "🌸", "🌳", "🏠", "🚗", "✈️", "⛵"];
    const cards = [...images, ...images]; // Duplicamos las imágenes para hacer pares
    const gameBoard = document.getElementById("game-board");
    const resetButton = document.getElementById("reset-button");

    let flippedCards = [];
    let matchedCards = [];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createCard(image) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.image = image;
        card.textContent = "❓"; // Emoji de interrogación para el reverso
        card.addEventListener("click", flipCard);
        return card;
    }

    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
            this.textContent = this.dataset.image;
            this.classList.add("flipped");
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                setTimeout(checkForMatch, 1000);
            }
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.image === card2.dataset.image) {
            card1.classList.add("matched");
            card2.classList.add("matched");
            matchedCards.push(card1, card2);

            if (matchedCards.length === cards.length) {
                alert("¡Felicidades! Has ganado el juego.");
            }
        } else {
            card1.textContent = "❓";
            card2.textContent = "❓";
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
        }

        flippedCards = [];
    }

    function resetGame() {
        gameBoard.innerHTML = "";
        matchedCards = [];
        shuffle(cards);
        cards.forEach(image => {
            const card = createCard(image);
            gameBoard.appendChild(card);
        });
    }

    resetButton.addEventListener("click", resetGame);

    // Inicializar el juego
    resetGame();
});