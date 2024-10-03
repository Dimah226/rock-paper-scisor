
const seconds = document.getElementById("seconds");
const mainOrdi = document.querySelector(".main-ordi .i-main");
const mainJoueur = document.querySelector(".main-joueur .i-main");
const etoile1=document.querySelector(".etoile1")
const etoile2=document.querySelector(".etoile2")
let nbrOrdi=0
let nbrJoeur=0

function timer() {
    let timeLeft = 10;
    if (nbrOrdi === 3|| nbrJoeur===3) { // Ajouter des parenthèses ici
        etoile1.src = `./image/0-etoiles.png`;
        etoile2.src = `./image/0-etoiles.png`;
        nbrJoeur = 0;
        nbrOrdi = 0;
        
    }
    window.valeur=undefined
    choix.forEach(el => {
        el.style.border = ""; // Retirer la bordure
    });
    const countdown = setInterval(() => {
        seconds.innerText = timeLeft + " Sec"; // Afficher le temps restant
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(countdown);

            // Si window.valeur est undefined ou "Je me sens chanceux"

            if (window.valeur === undefined || window.valeur === "Je me sens chanceux") {
                window.valeur = Math.floor(Math.random() * 3) + 1; // Valeur aléatoire entre 1 et 3
            } else {
                // Convertir le choix en valeur numérique
                const choixMap = { "Ciseau": 3, "Papier": 2, "Pierre": 1 };
                window.valeur = choixMap[window.valeur];
            }

            const valeurJoueur = window.valeur;
            const valeurOrdi = Math.floor(Math.random() * 3) + 1; // 1 = Pierre, 2 = Papier, 3 = Ciseaux
            
            // Afficher les images
            const choixImages = ["pierre", "feuille", "ciseau"];
            mainOrdi.src = `./image/${choixImages[valeurOrdi - 1]}-ordi.png`;
            mainJoueur.src = `./image/${choixImages[valeurJoueur - 1]}-joueur.png`;

            // Afficher le résultat
            if (valeurJoueur === valeurOrdi) {
                document.querySelector(".text").innerText = "Égalité !";
            } else if ((valeurJoueur === 1 && valeurOrdi === 3) || // Pierre bat Ciseaux
                       (valeurJoueur === 2 && valeurOrdi === 1) || // Papier bat Pierre
                       (valeurJoueur === 3 && valeurOrdi === 2)) { // Ciseaux bat Papier
                    nbrJoeur+=1
                    etoile2.src=`./image/${nbrJoeur}-etoiles.png`;
                document.querySelector(".text").innerText = "You win!";
            } else {
                document.querySelector(".text").innerText = "RAHAH win!";
                nbrOrdi+=1
                etoile1.src=`./image/${nbrOrdi}-etoiles.png`;
            }
            if (nbrJoeur===3){
                document.querySelector(".text").style.visibility="visible";
                document.querySelector(".text").innerText = "You win the Game";
                document.querySelector("button").style.visibility="visible";
                document.querySelector("button").innerText="Recommencez";
            }else if(nbrOrdi===3){
                document.querySelector(".text").style.visibility="visible";
                document.querySelector(".text").innerText = "RAHAH win the Game";
                document.querySelector("button").style.visibility="visible";
                document.querySelector("button").innerText="Recommencez";
            }else{
                document.querySelector("button").style.visibility="visible";
                document.querySelector("button").innerText="Continuez";
                document.querySelector(".text").style.visibility="visible";
            }
        }
    }, 1000);
}

document.querySelector("button").addEventListener("click", function() {
    this.style.visibility = "hidden"; // Masque l'élément cliqué tout en préservant son espace
    document.querySelector(".text").style.visibility = "hidden";
    
    
    
    timer();
    
});

// Gestion des choix de l'utilisateur
const choix = document.querySelectorAll(".choix1");

choix.forEach(choix1 => {
    choix1.addEventListener("click", () => {
        // Vérifie si le temps restant est supérieur à 0
        if (seconds.innerText !=="0 Sec") {
            // Réinitialiser la bordure de tous les choix
            choix.forEach(el => {
                el.style.border = ""; // Retirer la bordure
            });

            // Appliquer le dégradé à l'élément cliqué
            choix1.style.borderImage = "linear-gradient(45deg, red, #8a2be2)"; // Dégradé
            choix1.style.borderWidth = "5px"; // Épaisseur de la bordure
            choix1.style.borderStyle = "solid"; // Type de bordure

            // Mettre à jour la valeur choisie
            window.valeur = choix1.querySelector("p").innerText;
        }
    });
});
