import { makeObservable, action, computed, observable } from "mobx";
import { Necrologue } from "../../models/section/Section";

class NecrologueStore{
    static necrologueStore: NecrologueStore

    static getNecrologueStore(){
        if(this.necrologueStore===undefined){
            this.necrologueStore=new NecrologueStore()
        }
        return this.necrologueStore
    }

    necrologueList : Necrologue[] = []

    constructor(){
        makeObservable(this,{
            necrologueList: observable,
            getRequestNecrologue: action,
            updateNecrologueList : action,
            deleteNecrologue : action,
            getNecrologueList: computed

        })
    }
    updateNecrologueList(necrologues: Necrologue[]){
        this.necrologueList = necrologues
    }
    get getNecrologueList(){
        return this.necrologueList
    }

    async getRequestNecrologue( locality:string){
        const response = await fetch(`http://192.168.137.1:8080/tourism?username=${locality}`,{
          method: 'GET',
          'headers' : {
            'Access-Control-Allow-Origin':'*'
          }  
        })
        const necrologue = await response.json()
        this.updateNecrologueList(necrologue)
    }
    async deleteNecrologue(locality: string, name: string){
        const response = await fetch(`http://192.168.137.1:8080/tourism?username=${locality}&name=${name}`, {
            method: 'DELETE',
            'headers' : {
                'Access-Control-Allow-Origin': '*'
            }
        })

    }

}

export default NecrologueStore