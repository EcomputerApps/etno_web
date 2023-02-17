import { makeObservable, action, computed, observable } from "mobx";
import { Necrologue, PaginatedNecro } from "../../models/section/Section";

class NecrologueStore{
    serverIp : string = "192.168.137.1"
    static necrologueStore: NecrologueStore

    static getNecrologueStore(){
        if(this.necrologueStore===undefined){
            this.necrologueStore=new NecrologueStore()
        }
        return this.necrologueStore
    }

       //Observables =>
    paginatedNecro : PaginatedNecro = {}

    constructor(){
        makeObservable(this,{
            paginatedNecro: observable,
            getRequestNecrologue: action,
            updateNecrologueList : action,
            updatePaginatedNecro: action,
            deleteNecrologue : action,
            getPaginatedNecro: computed

        })
    }
    updateNecrologueList(necrologues: Necrologue[]){
        this.paginatedNecro.content = necrologues
    }
    updatePaginatedNecro( paginatedNecro : PaginatedNecro){
        this.paginatedNecro = paginatedNecro
    }
    get getPaginatedNecro(){
        return this.paginatedNecro
    }

    async getRequestNecrologue( locality:string, pageNum : number, elementSize: number){
        const response = await fetch(`http://${this.serverIp}:8080/deaths?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`,{
          method: 'GET',
          
        })
        const necrologue = await response.json()
        //console.log
        console.log(necrologue)
        this.updatePaginatedNecro(necrologue)
    }
    async deleteNecrologue(username: string, name: string){
        const response = await fetch(`http://${this.serverIp}:8080/users/delete/death?username=${username}&name=${name}`, {
            method: 'DELETE',
            headers : {
                'Access-Control-Allow-Origin': '*'
            }
        })
        const newPaginatedNecro = this.paginatedNecro.content!!.filter((item)=> item.name !== name)
        this.updateNecrologueList(newPaginatedNecro)
    }

}

export default NecrologueStore