    document.getElementById('predictBtn').addEventListener('click', () => {
        // Masquer la grille et afficher l'animation de chargement
        document.getElementById('grid').style.display = 'none';
        document.getElementById('loading').style.display = 'block';

        // Après un délai de 2 secondes (le temps de l'animation), afficher le résultat
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
            generateGrid();
        }, 2000); // Le temps ici correspond à la durée de l'animation
    });

    let previousPredictions = [];

    // Fonction pour générer la grille
    function generateGrid() {
        const gridSize = 25;
        const grid = Array(gridSize).fill('⚫️');
        let diamondIndices = [];

        // Simuler des positions sûres pour les diamants
        const safePositions = [...Array(gridSize).keys()].filter(i => Math.random() > 0.5);

        if (safePositions.length >= 3) {
            diamondIndices = getRandomSample(safePositions, 3);
        } else {
            diamondIndices = getRandomSample([...Array(gridSize).keys()], 3);
        }

        diamondIndices.forEach(i => grid[i] = '💎');
        previousPredictions.push(diamondIndices);

        displayGrid(grid);
    }

    // Fonction pour obtenir un échantillon aléatoire de la taille souhaitée
    function getRandomSample(arr, size) {
        let shuffled = arr.slice(0), i = arr.length, temp, index;
        while (i--) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(0, size);
    }

    // Fonction pour afficher la grille
    function displayGrid(grid) {
        const gridDiv = document.getElementById('grid');
        gridDiv.innerHTML = ''; // Clear previous result
        gridDiv.style.display = 'grid'; // Afficher la grille

        grid.forEach(cell => {
            const div = document.createElement('div');
            div.textContent = cell;
            gridDiv.appendChild(div);
        });
    }
