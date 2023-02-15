import { makeObservable, action, computed, observable } from "mobx";
import { Link, PaginatedLink } from "../../models/section/Section";

class LinkStore{
   serverIp : string = "192.168.241.51"
    static linkStore: LinkStore
    static getLinkStore(){
        if(this.linkStore === undefined){
            this.linkStore = new LinkStore()
        }
        return this.linkStore
    }
     //Observables =>
     paginatedLink : PaginatedLink = {}
     title: string = ""
     url : string = ""

     constructor(){
        makeObservable(this, {
            paginatedLink: observable,
            title: observable,
            url: observable,
            setTitle:action,
            getRequestLink: action,
            deleteLink: action,
            updateLinkList: action,
            updatePaginatedLink: action,
            getPaginatedLink: computed,
            getTitle: computed

        })
     }
     setTitle(title: string){
        this.title= title
     }
     get getTitle(){
        return this.title
     }
     updateLinkList( links : Link[]){
        this.paginatedLink.content = links
     }
     updatePaginatedLink( paginatedLink : PaginatedLink){
        this.paginatedLink=paginatedLink
     }
     get getPaginatedLink(){
        return this.paginatedLink
     }

     async getRequestLink(locality : string, pageNum : number, elementSize: number){
        const response = await fetch(`http://${this.serverIp}:8080/link?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`,{
            method: 'GET'
        })
        const link = await response.json()
        this.updatePaginatedLink(link)
     }
     async deleteLink(username: string, title:string){
        const response= await fetch(`http://${this.serverIp}:8080/users/delete/link?username=${username}&title=${title}`,{
            method: 'DELETE',
            headers:{
                'Access-Control-Allow-Origin':'*', 
            }
        })
        const newPaginatedLinks = this.paginatedLink.content!!.filter((item)=>item.title !==title)
        this.updateLinkList(newPaginatedLinks)
     }

     

}export default LinkStore