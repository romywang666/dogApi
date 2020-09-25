import '../index.html';
import Search from './models/Search';
import Breed from "./models/Breed";
import Likes from "./models/Likes";
import * as searchView from './views/searchView';
import * as breedView from './views/breedView';
import * as likesView from './views/likesView';
import {elements,renderLoader,clearLoader} from './views/base';

/**Global state of the app
 * -search object
 * -current breed object
 *
 * liked dog
 */
const state = {};
/*
 *Search controller
 */

const controlSearch =async () =>{

    // 1 get query from view

    const query = searchView.getInput();
    //console.log(query);
    if(query){

        //2 new search object and add to state

        state.search = new Search(query);

        //3 prepare UI for results

        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try{
            //4 Search for recipes

            await state.search.getResults();

            //5 render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        }catch(err){
            alert('something wrong with searching...');
            clearLoader();
        }

    }

}

elements.searchForm.addEventListener('submit',e =>{
        e.preventDefault();
        controlSearch();

});

elements.searchResPages.addEventListener('click',e =>{
        const btn = e.target.closest('.btn-inline');
       if(btn){
           const goToPage = parseInt(btn.dataset.goto,10);
           searchView.clearResults();
           searchView.renderResults(state.search.result,goToPage);

       }
});

/*
 *Likes controller
 */
state.likes = new Likes();
likesView.toggleLikeMenu(state.likes.getNumLikes());
const controlLike = () => {
    if(!state.likes) state.likes = new Likes();
    const currentID = state.breed.id;
    // user has not yet liked current dog
    if(!state.likes.isLiked(currentID)){
        //add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.breed.name,
            state.breed.img,
            state.breed.bred
        );
        //toggle the like button
        likesView.toggleLikedBtn(true);

        //add like to UI list
        likesView.renderLike(newLike);

        //user has liked the current dog
    }else {
        //remove like from the state
        state.likes.deleteLike(currentID);

        //toggle the like button
        likesView.toggleLikedBtn(false);

        //remove like from UI list

        likesView.deleteLike(currentID);

    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};

/*
* restore liked recipes on page load
*/

window.addEventListener('load',()=>{
    state.likes = new Likes();

    //restore likes
    state.likes.readStorage();

    //toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());
    //render the existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like));
});



/*
*  like button
 */
elements.breed.addEventListener('click',e=>{
    if(e.target.matches('.breed__love,.breed__love *')){
        //like controller
        controlLike();
    }
});






/*
 *Breed controller
 */
const controlBreed = async () =>{
    //get id from url
    const id = window.location.hash.replace('#','');

    if (id){
        //Prepare UI for changes
        breedView.clearBreed();
        renderLoader(elements.breed);

        //Create new breed object
        state.breed = new Breed(id);

        try{
            //get breed data
            await state.breed.getBreed();
            console.log(state.breed);
            //Render breed
            clearLoader();
            breedView.renderBreed(state.breed,state.likes.isLiked(id));
        }catch(err){
            alert("Error on processing breed!")

        }
    }
};

window.addEventListener('hashchange',controlBreed);
window.addEventListener('load',controlBreed);

// ['hashchage','load'].forEach(event => window.addEventListener(event,controlBreed));