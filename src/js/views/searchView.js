import {elements} from "./base";

export const getInput = () => elements.searchInput.value ;

export const clearInput = () =>{
    elements.searchInput.value = '';
};

export const clearResults = () =>{
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};



/*
// 'dog like play with ball'
acc:0 / acc + cur.length = 3 / newName = ['dog']
acc:3 / acc + cur.length = 7 / newName = ['dog','like']
acc:7 / acc + cur.length = 11 / newName = ['dog','like','play']
acc:11 / acc + cur.length = 15 / newName = ['dog','like','play','with']
acc:15 / acc + cur.length = 19 / newName = ['dog','like','play','with']


const limitDogName = (dogName, limit = 15) =>{
    if(dogName.length > limit) {
        const newName = [];
        dogName.split(' ').reduce((acc,cur) =>{
            if (acc + cur.length <= limit) {
                newName.push(cur);
            }
            return acc + cur.length;

        },0);
        //return the result
        return `${newName.join(' ')}...`;
    }
    return dogName;
};
*/


const renderDog = dog => {
    const markup = `
            <li>
                <a class="results__link " href="#${dog.id}">
                    <div class="results__data">
                        <h4 class="results__name">${dog.name}</h4>
                        <p class="results__author">${dog.bred_for}</p>
                    </div>
                </a>
            </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend',markup);
};

// type:"prev" or "next"
const creatButton = (page,type) =>`
            <button class="btn-inline results__btn--${type}" data-goto= ${type === 'prev' ? page-1: page+1}>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
                </svg>
                <span>page ${type === 'prev' ? page-1: page+1}</span>
            </button>                
`;

const renderButtons = (page,numResults,resPerPage) => {
    const pages = Math.ceil(numResults/ resPerPage);
    let button;
    if (page === 1 && pages >1){
        //Only button to go to next page
        button  = creatButton(page,'next');
    }else if(page < pages){
        //both button
        button  = `${creatButton(page,'prev')}
                   ${creatButton(page,'next')} `;
    } else if (page === pages && pages >1){
        //only button to go to prev page
        button  = creatButton(page,'prev');
    } else if(pages ===1){
        elements.searchResPages.style.visibility = 'hidden';
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin',button);
};
export const renderResults = (dogs,page = 1,resPerPage = 7) => {
    //render results of current page
    const start = (page-1) * resPerPage;
    const end = page * resPerPage;
    dogs.slice(start,end).forEach(renderDog);

    //render pagination buttons
    renderButtons(page,dogs.length,resPerPage);
};

