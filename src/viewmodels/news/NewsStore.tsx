import { makeObservable, action, computed, observable } from "mobx";
import { News } from "../../models/section/Section";


class NewsStore{

    static newsStore : NewsStore

    static getNewsStore(){
        if(this.newsStore === undefined){
            this.newsStore = new NewsStore()
        }
        return this.newsStore
    }

    newsList : News[]= []

    constructor(){
        makeObservable(this, {
            newsList : observable,
            getRequestNews : action,
            deleteNews : action,
            updateNewsList: action,
            getNewsList: computed
        })
    }
    updateNewsList( news : News[]){
        this.newsList = news
    }
    get getNewsList(){
        return this.newsList
    }
    async getRequestNews( locality : string){
        const response = await fetch(`http://192.168.137.1:8080/band?username=${locality}`,{
            method: 'GET',
            headers : {
                'Access-Control-Allow-Origin': '*'
            }
        })
        const news = await response.json()
        this.updateNewsList(news)

    }
    async deleteNews(locality: string, title : string){
        const response = await fetch(`http://192.168.137.1:8080/band?username=${locality}&name=${title}`,{
            method : 'DELETE',
            'headers' : {
                'Access-Control-Allow-Origin':'*'
            }
        })
        const newNewsList = this.newsList.filter((item)=>item.title !== title)
        this.updateNewsList(newNewsList)
    }


}

export default NewsStore