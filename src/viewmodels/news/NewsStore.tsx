import { makeObservable, action, computed, observable } from "mobx";
import { News, PaginatedNews } from "../../models/section/Section";

class NewsStore{
    static newsStore : NewsStore

    static getNewsStore(){
        if(this.newsStore === undefined){
            this.newsStore = new NewsStore()
        }
        return this.newsStore
    }

       //Observables =>
       paginatedNews : PaginatedNews = {}
      

    constructor(){
        makeObservable(this, {
            paginatedNews : observable,
            getRequestNews : action,
            deleteNews : action,
            updateNewsList: action,
            updatePaginatedNews: action,
            getPaginatedNews: computed,
           
        })
    }

    updateNewsList( news : News[]){
        this.paginatedNews.content = news
    }
    updatePaginatedNews( pagiantedNews: PaginatedNews){
        this.paginatedNews = pagiantedNews
    }
     get getPaginatedNews(){
        return this.paginatedNews
    }
  

    async getRequestNews( locality : string, pageNum: number, elementSize: number){
        const response = await fetch(`http://192.168.137.1:8080/news?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`,{
            method: 'GET',
           
        })
        const news = await response.json()
        //console.log
        console.log(news)
        this.updatePaginatedNews(news)

    }
    async deleteNews(username: string, title : string){
        const response = await fetch(`http://192.168.137.1:8080/users/delete/news?username=${username}&title=${title}`,{
            method : 'DELETE',
            headers : {
                'Access-Control-Allow-Origin':'*'
            }
        })
        const newPaginatedNews = this.paginatedNews.content!!.filter((item)=>item.title !== title)
        this.updateNewsList(newPaginatedNews)
    }


}

export default NewsStore