//*******Tests*******//
//document.getElementById("items").style.backgroundColor = "red"
//console.log('Ceci est une phrase de test TC')

//Afficher dans le console log//
promesse0 = fetch(" http://localhost:3000/api/products/")
    .then((reponse) => 
    {
        //Renvoie la reponse dans la console avec son statut
        console.log(reponse);
        //Affiche le statut de la promesse au format JSON dans la console
        usersData = reponse.json();
        //Afficher dans le console log//
        console.log(usersData);
        usersData.then((choixindex) => 
        {
            //Partie Boucle
            //Variables
            maxCompteur = choixindex.length // Taille Array
            console.log(maxCompteur)
            //Début de boucle
            for (let myCompteur = 0; myCompteur < maxCompteur; myCompteur++) 
            {
                //Lancer le code d'intégration HTML
                usersData.then((choixindex) => 
                {
                    //Création lien a 
                    //Création balise <Article>
                    //Création URL Image
                    //Création texte titre H3
                    //Création texte descriptif p
                    let newKanapLink = document.createElement('a')
                    newKanapLink.href = "./product.html?id=" + choixindex[myCompteur]._id
                    let newArticle = document.createElement('ARTICLE')
                    let newImage = document.createElement('img')
                    newImage.src = choixindex[myCompteur].imageUrl
                    newImage.alt = choixindex[myCompteur].altTxt
                    let newH3 = document.createElement('h3')
                    newH3.textContent = choixindex[myCompteur].name
                    newH3.className = "productName"
                    let newP = document.createElement('p')
                    newP.textContent = choixindex[myCompteur].description
                    newP.className = "productDescription"
                    //Ajout dans le HTML dans la balise items dans l'ordre
                    document.getElementById("items").appendChild(newKanapLink)
                    newKanapLink.appendChild(newArticle)
                    newArticle.appendChild(newImage)
                    newArticle.appendChild(newH3)
                    newArticle.appendChild(newP)
                })
                    //Si erreur
                    .catch((err) => console.log("ERREUR BOUCLE"))
            }
            console.log("Tous les Kanaps sont intégrés !");
            //Fin de boucle
        })
            //Si erreur
            .catch((err) => console.log("ERREUR MAIN"))
    })