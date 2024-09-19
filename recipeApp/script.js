const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');

const recipeDetailContent=document.querySelector('.recipe-detail-content');
const recipeCloseBtn=document.querySelector('.recipe-close-btn');

const fetchRecipe = async (query) => {
        
        recipeContainer.innerHTML="<h2>fetching recipes...</h2>"
        try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();

        recipeContainer.innerHTML=""

        response.meals.forEach(meal => {
            //console.log(meal);
            const recipeDiv=document.createElement('div')
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h2>${meal.strMeal}</h2>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span> category</p>
            
            `
            const button=document.createElement("button")
            button.textContent="view recipe"
            recipeDiv.appendChild(button)

            //add event listner on the click
            button.addEventListener('click',()=>{
                openRecipePopUp(meal)
            })
            recipeContainer.appendChild(recipeDiv);


            
        });
        //console.log(response.meals[0]);
    } catch (error) {
        recipeContainer.innerHTML="<h2>Recipe not found!!!</h2>"
        

         
            
    }
   
};

//function to fetchIngredients and measurments
const fetchIngredients=(meal)=>{
    //console.log(meal);
    let ingredientsList=""
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
        
    }
    return ingredientsList;
    
}
const openRecipePopUp = (meal) => {
    recipeDetailContent.innerHTML = `
        <div>
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3 class="headIngredients">Ingredients<h3/>
        <ul class="ingredientsList">${fetchIngredients(meal)}</ul>
        </div>
        <div>
            <h3 class="headInstruction">Instructions<h3/>
            <p class="instructions">${meal.strInstructions}</p>
        </div>       
    `;
    recipeDetailContent.parentElement.style.display = "block";
}

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if (!searchInput) {
        recipeContainer.innerHTML= `<h2>Type the meal in search box.</h2>`
        return 
    } 
    fetchRecipe(searchInput);
});

recipeCloseBtn.addEventListener("click",()=>{
    recipeDetailContent.parentElement.style.display = "none";

})

const text = "Search Your Favorite Recipes...";
const typingElement = document.getElementById('typing-effect');
let index = 0;

function type() {
    if (index < text.length) {
        typingElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(type, 100); // Adjust the typing speed (in milliseconds)
    } else {
        setTimeout(() => {
            typingElement.innerHTML = ""; // Clear text
            index = 0; // Reset index
            setTimeout(type, 100); // Restart typing effect after a short delay
        }, 2000); // Pause before restarting (in milliseconds)
    }
}

type();

