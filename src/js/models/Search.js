import axios from "axios";
import {key} from "../config";

export default class Search{
    constructor(query){
        this.query = query;
    }

    async getResults(query) {

        try{
            const res = await axios(`https://api.thedogapi.com/v1/breeds/search?key=${key}&q=${this.query}`);
            this.result = res.data;
           // console.log(this.result);
        }catch(error) {
            alert(error);
        }
    }
}