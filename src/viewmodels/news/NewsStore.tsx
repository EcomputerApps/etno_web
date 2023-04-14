import { makeObservable, action, computed, observable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { toast } from "react-toastify";
import { News, NewsList, NewsType, PaginatedNews } from "../../models/section/Section";
import { urlBase } from "../../utils/global";
import ImageStore from "../image/ImageStore";
const imageStore = ImageStore.getImageStore()

class NewsStore{
    serverIp: string = "192.168.137.1"
    static newsStore : NewsStore

    static getNewsStore(){
        if(this.newsStore === undefined){
            this.newsStore = new NewsStore()
        }
        return this.newsStore
    }
     newsTypes: Array<NewsType> = [{
        "id": "checkOne",
        "value": "General",
        "title": "General",
      }, {
        "id": "checkTwo",
        "value": "Tecnología",
        "title": "Tecnología",
      },
      {
        "id": "checkThree",
        "value": "Salud",
        "title": "Salud",
      },
      {
        "id": "checkFour",
        "value": "Deporte",
        "title": "Deporte",
      }
      ]

       //Observables =>
       paginatedNews : PaginatedNews = {}
       newsList: NewsList = {}
       news: News = {}
       modalCreate: boolean = false
       modalEdit: boolean = false
      
    constructor(){
        makeObservable(this, {
            newsList: observable,
            newsTypes: observable,
            modalEdit: observable,
            modalCreate: observable,
            setModalCreate: action,
            getModalEdit: computed,
            getModalCreate: computed,
            setModalEdit: action,
            paginatedNews : observable,
            news: observable,
            getAllNewsRequest : action,
            getPaginatedNewsRequest:action,
            getNews: computed,
            addRequestNews: action,
            editNews: action,
            deleteNews : action,
            updateNewsList: action,
            updatePaginatedNews: action,
            updateNews: action,
            getPaginatedNews: computed,
            updateNewsTypes: action,
            getNewsTypes: computed,
            updateAllNews: action,
            getAllNews:computed
        })
    
    }
    updateAllNews(news : News[]){
        this.newsList.news = news
    }
    get getAllNews(){
        return this.newsList
    }
    updateNewsTypes(newsTypes : NewsType[]){
        this.newsTypes = newsTypes
    }
    get getNewsTypes(){
        return this.newsTypes
    }
    setModalEdit(mode: boolean) {
        this.modalEdit = mode
    }
    get getModalEdit() {
        return this.modalEdit
    }
    setModalCreate(mode: boolean) {
        this.modalCreate = mode
    }
    get getModalCreate() {
        return this.modalCreate
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

    async addRequestNews(locality: String, news: News, file?: File){

        if (file !== null){ 
            await imageStore.addImageAPI(localStorage.getItem('user_etno_locality')!, 'noticia', 'noticia', file!!)
            news.imageUrl = imageStore.getImage.link
        }
        
        const response = await fetch(`${urlBase}/users/add/news?username=${locality}`, {
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
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
          })
          setTimeout(function(){
            window.location.reload();
         }, 1500);
          
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
    async editNews(locality: string, newsId: string, news: News, file?: File){
        if (file !== undefined){
            await imageStore.addImageAPI(localStorage.getItem('user_etno_locality')!, 'noticia', 'noticia', file!!)
            news.imageUrl = imageStore.getImage.link
        }
        const response = await fetch(`${urlBase}/users/update/news?username=${locality}&newsId=${newsId}`, {
            method: 'PUT',
            body: JSON.stringify(news),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        if(response.ok) {
            toast.success('Se ha actualizado exitosamente', {
                position: 'bottom-center',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
          })
          setTimeout(function(){
            window.location.reload();
         }, 1500);
        } else {
            toast.error('No se ha actualizado', {
                position: 'bottom-center',
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
  
    async getPaginatedNewsRequest( locality : string, pageNum: number, elementSize: number){
        const response = await fetch(`${urlBase}/news/paginated?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`,{
            method: 'GET',
           
        })
        const news = await response.json()
        this.updatePaginatedNews(news)
    }
    async getAllNewsRequest( locality : string){
        const response = await fetch(`${urlBase}/news?username=${locality}`,{
            method: 'GET',
           
        })
        const news = await response.json()
        this.updateAllNews(news)
    }
    
    async deleteNews(username: string, idNews : string){
        const response = await fetch(`${urlBase}/users/delete/news?username=${username}&idNews=${idNews}`,{
            method : 'DELETE',
            headers : {
                'Access-Control-Allow-Origin':'*'
            }
        })

        if(response.ok){
            const newPaginatedNews = this.paginatedNews.content!!.filter((item)=>item.idNew !== idNews)
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