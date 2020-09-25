import {elements} from "./base";

export const clearBreed = () =>{
    elements.breed.innerHTML = '';
};
export const renderBreed = (breed,isLiked) =>{
    const markup = `
        <figure class="breed__fig">
            <img src="${breed.img}" alt="${breed.name}" class="breed__img">
            <h1 class="breed__title">
                <span>${breed.name}</span>
            </h1>
        </figure>
        <div class="breed__details">   
            <button class="breed__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart-${isLiked ?'' : 'outlined'}"></use>
                </svg>
            </button>
        </div>
        <div class="breed__ingredients">
            <ul class="breed__ingredient-list">
                <li class="breed__item">
                    <div class="breed__count">LIFE SPAN : ${breed.life}</div>
                    <div class="breed__ingredient">
                        <span class="breed__unit"></span>                   
                    </div>
                </li>  
                <li class="breed__item">
                    <div class="breed__count">HEIGHT : ${breed.height}</div>
                    <div class="breed__ingredient">
                        <span class="breed__unit">cm</span>
                    </div>
                </li>  
                <li class="breed__item">
                    <div class="breed__count">WEIGHT : ${breed.weight}</div>
                    <div class="breed__ingredient">
                        <span class="breed__unit">kg</span>
                    </div>
                </li>  
                
                <li class="breed__item">
                    <div class="breed__count">ORIGIN : ${breed.origin}</div>
                    <div class="breed__ingredient">
                        <span class="breed__unit"></span>
                    </div>
                </li>                  
            </ul>
            
        </div>
        <div class="breed__directions">
            <h2 class="heading-2">What temperament is this dog has ?</h2>
            <p class="breed__directions-text">
                This dog is 
                <span class="breed__by">${breed.temp}</span>
            </p>
        </div>
        <div class="breed__directions">
            <h2 class="heading-2">Why we breed it?</h2>
            <p class="breed__directions-text">
                This dog is usually bred for
                <span class="breed__by">${breed.bred}</span>
            </p>
        </div>
    `;
    elements.breed.insertAdjacentHTML('afterbegin',markup);

};