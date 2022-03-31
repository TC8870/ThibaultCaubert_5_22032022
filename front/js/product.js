//*******Tests*******//
document.getElementById("addToCart").style.backgroundColor = "red"
console.log('Ceci est une phrase de test TC')


//Afficher l'URL actuelle
let params = (new URL(document.location)).searchParams;
// Extrait le code ID
let id = params.get('id'); 
MyIdKanap = params.get('id')

console.log(MyIdKanap)


//----------------OK

//Listes des champs dans le HTML 

//<div class="item__img">
//<!-- <img src="../images/logo.png" alt="Photographie d'un canapé"> -->

//<div class="item__content__titlePrice">
//<h1 id="title"><!-- Nom du produit --></h1>

//<p class="item__content__description__title">Description :</p>
//<p id="description"><!-- Dis enim malesuada risus sapien gravida nulla nisl arcu. --></p>


//<select name="color-select" id="colors">
//<option value="">--SVP, choisissez une couleur --</option>
//<!--                       <option value="vert">vert</option>
//                      <option value="blanc">blanc</option> -->