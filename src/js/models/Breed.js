import axios from 'axios';
import {key} from '../config';

export default class Breed{
    constructor(id) {
        this.id = id;
    }

    async getBreed(){
        try{
            const res = await axios(`https://api.thedogapi.com/v1/images/search?key=${key}&limit=1&page=1&order=DESC&breed_id=${this.id}`);
            this.name = res.data[0].breeds[0].name;
            if(this.name == undefined){
                this.name = "N/A";
            };
            this.origin = res.data[0].breeds[0].origin;
            if(this.origin==undefined){
                this.origin = "N/A";
            };
            this.bred = res.data[0].breeds[0].bred_for;
            this.life = res.data[0].breeds[0].life_span;
            this.height= res.data[0].breeds[0].height.metric;
            this.weight = res.data[0].breeds[0].weight.metric;
            this.url = res.data[0].breeds[0].wikipedia_url;
            this.temp = res.data[0].breeds[0].temperament;
            this.img  = res.data[0].url;


        }catch(error){
            console.log(error);
        }
    }

}