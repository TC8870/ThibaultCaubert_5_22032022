//Récupérer le Array du local storage
var myKanapArray = localStorage.getItem("myOrder");
var myKanapArrayJson = JSON.parse(myKanapArray)

//trouver le nombre de références
myCompteurtobuy = myKanapArrayJson.length

//Fonction de création panier----------------------------------------------------------------------------------------------
function createPanier()
    {
        for (let myFinalCompteur = 0; myFinalCompteur < myCompteurtobuy; myFinalCompteur++) 
        {
            //Trouver ID + color + qté avant édition HTML
            myFinalID = myKanapArrayJson[myFinalCompteur].productId
            promesse = fetch(" http://localhost:3000/api/products/" + myFinalID)
            .then((reponse) => 
            {
                usersData = reponse.json();
                usersData.then((choixindex) => 
                {
                    //Création Article
                    let newItemToBuy = document.createElement('ARTICLE')
                    newItemToBuy.className = "cart__item"
                    newItemToBuy.id = myKanapArrayJson[myFinalCompteur].productId
                    newItemToBuy.color = myKanapArrayJson[myFinalCompteur].productColor
                    //Création Div cart__item__img
                    let newDivcartItemImg = document.createElement('div')
                    newDivcartItemImg.className = "cart__item__img"
                    //Création Img
                    let newImageFinal = document.createElement('img')
                    newImageFinal.src = choixindex.imageUrl
                    newImageFinal.alt = choixindex.altTxt
                    //Création Div cart__item_content
                    let newDivcartItemContent = document.createElement('div')
                    newDivcartItemContent.className = "cart__item_content"
                    //Création Div cart__item__description
                    let newDivcartItemdescription = document.createElement('div')
                    newDivcartItemdescription.className = "cart__item_content_description"
                    //Création H2Name
                    let newH2Name = document.createElement('h2')
                    newH2Name.textContent = choixindex.name
                    //Création Pcolor
                    let newPColor = document.createElement('p')
                    newPColor.textContent = myKanapArrayJson[myFinalCompteur].productColor
                    //Création PPrice
                    let newPPrice = document.createElement('p')
                    newPPrice.textContent = choixindex.price*myKanapArrayJson[myFinalCompteur].productQuantity + " €"
                    //Création Div cart__item__content__settings
                    let newDivcartItemContentsettings = document.createElement('div')
                    newDivcartItemContentsettings.className = "cart__item__content__settings"
                    //Création Div cart__item__content__settings__quantity
                    let newDivcartItemContentsettingsquantity = document.createElement('div')
                    newDivcartItemContentsettingsquantity.className = "cart__item__content__settings__quantity"
                    //Création Pquantite
                    let Pquantite = document.createElement('p')
                    Pquantite.textContent = "Qté : "
                    //Création Input
                    let newInputNumber = document.createElement('input')
                    newInputNumber.className = "itemQuantity"
                    newInputNumber.setAttribute('name', 'itemQuantity')
                    newInputNumber.setAttribute('type', 'number')
                    newInputNumber.setAttribute('min', 1)
                    newInputNumber.setAttribute('max', 100)
                    newInputNumber.setAttribute('value', myKanapArrayJson[myFinalCompteur].productQuantity)
                    //Création Div cart__item__content__settings__delete
                    let newDivcartItemContentsettingsdelete = document.createElement('div')
                    newDivcartItemContentsettingsdelete.className = "cart__item__content__settings__delete"
                    //Création Psupprimer
                    let Psupprimer = document.createElement('p')
                    Psupprimer.textContent = "Supprimer"
                    Psupprimer.className = "deleteItem"
                            
                    //Intégrer dans le HTML
                    document.getElementById("cart__items").appendChild(newItemToBuy)
                    newItemToBuy.appendChild(newDivcartItemImg)
                    newDivcartItemImg.appendChild(newImageFinal)
                    newItemToBuy.appendChild(newDivcartItemContent)
                    newDivcartItemContent.appendChild(newDivcartItemdescription)
                    newDivcartItemdescription.appendChild(newH2Name)
                    newDivcartItemdescription.appendChild(newPColor)
                    newDivcartItemdescription.appendChild(newPPrice)
                    newDivcartItemContent.appendChild(newDivcartItemContentsettings)
                    newDivcartItemContentsettings.appendChild(newDivcartItemContentsettingsquantity)
                    newDivcartItemContentsettingsquantity.appendChild(Pquantite)
                    newDivcartItemContentsettingsquantity.appendChild(newInputNumber)
                    newDivcartItemContentsettings.appendChild(newDivcartItemContentsettingsdelete)
                    newDivcartItemContentsettingsdelete.appendChild(Psupprimer)
                    //Trouver quantité totale
                    totalQuantiteKanap= totalQuantiteKanap+myKanapArrayJson[myFinalCompteur].productQuantity
                    document.getElementById('totalQuantity').innerHTML=totalQuantiteKanap
                    //Trouver prix total
                    totalPrice=totalPrice+myKanapArrayJson[myFinalCompteur].productQuantity*choixindex.price
                    document.getElementById('totalPrice').innerHTML=totalPrice
                }) 
                    //Si erreur
                    .catch((err) => console.log("ERREUR PROMESSE PRIX"))
            })
        }}

//Fonction validation panier--------------------------------------------------------------------------------------
function verificationInput()
    {
        var reg1 = new RegExp("^([A-Za-z])+$")/*regexp qui contrôle s'il y a des lettres sans chiffres ou caractères spéciaux*/
        var reg2 = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")/*regexp qui contrôle pour une adresse mail*/
        //FirstName
        if (document.getElementById('firstName').value == "")
            {document.getElementById('firstNameErrorMsg').innerHTML="Veuillez renseigner un prénom"
            return false}    
        var testName = reg1.test(document.getElementById('firstName').value)   
        if (!testName){
            document.getElementById('firstNameErrorMsg').innerHTML="Vous ne devez pas inscrire de chiffres ou caractères spéciaux"
            return false}
        if (testName){
                document.getElementById('firstNameErrorMsg').innerHTML=""}    
        //LastName
        if (document.getElementById('lastName').value == "")
            {document.getElementById('lastNameErrorMsg').innerHTML="Veuillez renseigner un nom"
            return false}
        var testLastName = reg1.test(document.getElementById('lastName').value)   
        if (!testLastName){
            document.getElementById('lastNameErrorMsg').innerHTML="Vous ne devez pas inscrire de chiffres ou caractères spéciaux"
            return false}
        if (testLastName){
                document.getElementById('lastNameErrorMsg').innerHTML=""}
        //Adresse
        if (document.getElementById('address').value == "")
            {document.getElementById('addressErrorMsg').innerHTML="Veuillez renseigner une adresse"
            return false}
        else(document.getElementById('addressErrorMsg').innerHTML="")
        //Ville
        if (document.getElementById('city').value == "")
            {document.getElementById('cityErrorMsg').innerHTML="Veuillez renseigner une ville"
            return false}
        var testCity = reg1.test(document.getElementById('city').value)   
        if (!testCity){
            document.getElementById('cityErrorMsg').innerHTML="Vous ne devez pas inscrire de chiffres ou caractères spéciaux"
            return false}
        if (testCity){
            document.getElementById('cityErrorMsg').innerHTML=""}
        //Email
        if (document.getElementById('email').value == "" )
            {document.getElementById('emailErrorMsg').innerHTML="Veuillez renseigner un email"
            return false}
        var testEmail = reg2.test(document.getElementById('email').value)   
        if (!testEmail){
            document.getElementById('emailErrorMsg').innerHTML="Veuillez renseigner un email valide"
            return false}
        if (testEmail){
            document.getElementById('emailErrorMsg').innerHTML=""}
        //Si tout est OK
        createFormulaireFinal()
    }

//Fonction de création formulaire final --------------------------------------------------------------------------------------
function createFormulaireFinal()
    {
        const formulaireCommande = 
        {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            adress: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value,
        }
        localStorage.setItem("contact", JSON.stringify(formulaireCommande));
        alert("Formulaire créé")
    }

//Au chargement de la page----------------------------------------------------------------------------------------
//Initialisation des compteurs + affichage du panier
totalPrice=0
totalQuantiteKanap= 0
createPanier()

//Modifier une quantité -------------------------------------------------------------------------------------------

//Supprimer un article --------------------------------------------------------------------------------------------

//Valider le formulaire-------------------------------------------------------------------------------------------
document
.getElementById("order")
.addEventListener("click", verificationInput)










//---------Zone de test--------------------------------------------------------------------------------------
    //Fonction POST pour l'API
function postSurAPI(){
    fetch("http://localhost:3000/api/products/order", 
    
    {
    method: 'POST',
    body: localStorage.getItem('contact'),
    headers:{
        "Content-Type":'application/json',
    }
})
}

//Supprimer article à finir

function supprimerKanap()
{
    //Nb de classes
    var nb_delete_item;
    nb_delete_item=$(".deleteItem").length;
    console.log(nb_delete_item); // 👉️ div.parent
    //alert("clic efectué")


    // Trouver classe actuelle
    nb_delete_item2=$(".deleteItem")[2]
    console.log(nb_delete_item2)
}

document
.getElementById("cart__items")
.addEventListener("click", supprimerKanap)

// - var i = 0;
// - tu fais un foreach
// - tu fais une condition qui compare un getElementByClassName a un getElementByTagName
// - si la condition est vrai tu incrémente la variable i 

 
//modification qté à finir
// newPPrice.textContent = choixindex.price*myKanapArrayJson[myFinalCompteur].productQuantity + " €"
//415b7cacb65d43b2b5c1ff70f3393ad1

//------------Fin zone de test-----------------------------------------------------------------------------------


    
