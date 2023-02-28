import { makeObservable, action, computed, observable } from "mobx";
import { toast } from "react-toastify";
import { News, PaginatedNews } from "../../models/section/Section";
import ImageStore from "../image/ImageStore";
const imageStore = ImageStore.getImageStore()

class NewsStore{
    serverIp : string = "192.168.137.1"
    static newsStore : NewsStore

    static getNewsStore(){
        if(this.newsStore === undefined){
            this.newsStore = new NewsStore()
        }
        return this.newsStore
    }

       //Observables =>
       paginatedNews : PaginatedNews = {}
       news: News = {}
      
    constructor(){
        makeObservable(this, {
            paginatedNews : observable,
            news: observable,
            getRequestNews : action,
            getNews: computed,
            addRequestNews: action,
            editNews: action,
            deleteNews : action,
            updateNewsList: action,
            updatePaginatedNews: action,
            updateNews: action,
            getPaginatedNews: computed
        })
    }

    updateNewsList( news : News[]){
        this.paginatedNews.content = news
    }
    updatePaginatedNews( pagiantedNews: PaginatedNews){
        this.paginatedNews = pagiantedNews
    }
    updateNews(news: News){
        this.news = news
    }
     get getPaginatedNews(){
        return this.paginatedNews
    }
     get getNews(){
        return this.news
     }

    async addRequestNews(locality: String, news: News, file: File){
        await imageStore.addImageAPI('Bolea', 'noticia', 'noticia', file!!)
        news.imageUrl = imageStore.getImage.link

        const response = await fetch(`http://${this.serverIp}:8080/users/add/news?username=${locality}`, {
            method: 'POST',
            body: JSON.stringify(news),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        },
        )
        if(response.ok){
            this.paginatedNews.content?.push(news)
            this.news = news
            toast.success('Se ha añadido exitosamente', {
                position: 'bottom-center',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
          })
        }else{
            toast.error('No se ha añadido', {
                position: 'bottom-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
          })
    }
}
    async editNews(locality: string, newsId: string, news: News, file: File){
        if (file !== undefined){
            await imageStore.addImageAPI('Bolea', 'noticia', 'noticia', file!!)
            news.imageUrl = imageStore.getImage.link
        }
        const response = await fetch(`http://${this.serverIp}:8080/users/update/news?username=${locality}&newsId=${newsId}`, {
            method: 'PUT',
            body: JSON.stringify(news),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        if(response.ok) {
            toast.success('Se ha actualizado exitosamente', {
                position: 'top-center',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
          })
        } else {
            toast.error('No se ha actualizado', {
                position: 'top-center',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
          }) 
        }
    }
  
    async getRequestNews( locality : string, pageNum: number, elementSize: number){
        const response = await fetch(`http://${this.serverIp}:8080/news?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`,{
            method: 'GET',
           
        })
        const news = await response.json()
        this.updatePaginatedNews(news)
    }
    
    async deleteNews(username: string, title : string){
        const response = await fetch(`http://${this.serverIp}:8080/users/delete/news?username=${username}&title=${title}`,{
            method : 'DELETE',
            headers : {
                'Access-Control-Allow-Origin':'*'
            }
        })

        if(response.ok){
            const newPaginatedNews = this.paginatedNews.content!!.filter((item)=>item.title !== title)
            this.updateNewsList(newPaginatedNews)
            this.updateNews({})
            toast.success('Se ha borrado exitosamente', {
                position: 'bottom-center',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
          })
        }else{
            toast.error('No se ha podido borrar', {
                position: 'bottom-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
          })
        }
    }
}
export default NewsStore