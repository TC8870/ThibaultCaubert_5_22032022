//Afficher l'URL actuelle et extraite le code ID
let params = (new URL(document.location)).searchParams;
let id = params.get('id');
MyIdKanap = params.get('id')

//Afficher l'article//
promesse = fetch(" http://localhost:3000/api/products/" + MyIdKanap)
    .then((reponse) => 
    {
        //Renvoie la reponse dans la console avec son statut
        //Affiche le statut de la promesse au format JSON dans la console
        usersData = reponse.json();
        usersData.then(userJsonData => 
        {
            //Affichage du HTML
            //Partie Image
            let newImage = document.createElement('img')
            newImage.src = userJsonData.imageUrl
            newImage.alt = userJsonData.altTxt
            document.getElementsByClassName("item__img")[0].appendChild(newImage)
            //Partie Title
            let newH1 = document.getElementById('title')
            newH1.innerHTML = userJsonData.name
            //Partie Prix
            let newSpanPrice = document.getElementById('price')
            newSpanPrice.innerHTML = userJsonData.price
            //Partie Description
            let newDescription = document.getElementById('description')
            newDescription.innerHTML = userJsonData.description
            //Partie Input Option
            var optionSelectionColor = document.getElementById('colors');
            //Trouver le nombre de valeurs couleurs
            colorChoiceReferences = userJsonData.colors.length
            //Boucle pour chaque colori
            for (let actualColor = 0; actualColor < colorChoiceReferences; actualColor++) 
            {
                // création option + attribuer un texte dans l'option + lier le texte comme valeur + ajouter au HTML
                var colorOptionChoice = document.createElement('option');
                colorOptionChoice.appendChild(document.createTextNode(userJsonData.colors[actualColor]));
                colorOptionChoice.value = userJsonData.colors[actualColor];
                optionSelectionColor.appendChild(colorOptionChoice);
            }
        })
            .catch((err) => console.log("ERREUR PROMESSE"))
    })


//Fonction d'ajout au panier
function addToPanier()
    {
        //Tester si couleur
        if (document.getElementById('colors').value == "")
            {
            alert('pas de couleur renseignée')
            return false
            }
        //Tester si quantité
        if (document.getElementById('quantity').value == "0")
            {
            alert('pas de quantité renseignée')
            return false
            }

        //si array n'existe pas
        let mySelectionProducts=[]
        if (localStorage.getItem("myOrder") === null) 
            {
            const cartitem = 
                {
                productId: id,
                productColor: document.getElementById('colors').options[document.getElementById('colors').selectedIndex].value,
                productQuantity: parseInt(document.getElementById("quantity").value)
                }
            mySelectionProducts.push (cartitem)
            localStorage.setItem("myOrder", JSON.stringify(mySelectionProducts));
            alert("Produit ajouté au panier")
            }
        //Si array existe
        else
            {
            //Si la référence est en doublon
                mySelectionProducts=JSON.parse(window.localStorage.getItem("myOrder"))
                const valeurTrouvee = mySelectionProducts.find(element => element.productId == id && element.productColor ==  document.getElementById('colors').options[document.getElementById('colors').selectedIndex].value )
             
                if(valeurTrouvee)  //enlever element du tableau et créer une nouvelle cart item
                    {               
                    newValueQuantity=parseInt(valeurTrouvee.productQuantity) + parseInt(document.getElementById("quantity").value)
                    var myArray = mySelectionProducts;
                    var myIndex = mySelectionProducts.indexOf(valeurTrouvee);
                    if (myIndex !== -1) 
                        {
                        myArray.splice(myIndex, 1);
                        }     
                    const cartitem = 
                        {
                        productId: id,
                        productColor: document.getElementById('colors').options[document.getElementById('colors').selectedIndex].value,
                        productQuantity: newValueQuantity
                        }
                    mySelectionProducts.push (cartitem)
                    localStorage.setItem("myOrder", JSON.stringify(mySelectionProducts));
                    alert("Produit ajouté au panier")
                    }
                //Si référence n'est pas en doublon
                else
                {
                    var myKanapArray = localStorage.getItem("myOrder");
                    var myKanapArrayJson = JSON.parse(myKanapArray)
                    const cartitem = 
                        {
                        productId: id,
                        productColor: document.getElementById('colors').options[document.getElementById('colors').selectedIndex].value,
                        productQuantity: parseInt(document.getElementById("quantity").value)
                        }
                    mySelectionProducts.push (cartitem)
                    localStorage.setItem("myOrder", JSON.stringify(mySelectionProducts));
                    alert("Votre article a été ajouté au panier")
                }
            }
    }
        
//Ajouter un produit au panier au clic
document
    .getElementById("addToCart")
    .addEventListener("click", addToPanier)