import { makeObservable, action, computed, observable } from "mobx";
import { clearPersistedStore, makePersistable } from "mobx-persist-store";
import { toast } from "react-toastify";
import { UserLogin } from "../../models/user/UserLogin";
import { urlBase } from "../../utils/global";

class UserStore {
    serverIp : string = "192.168.137.1"
    static userStore: UserStore

    static getUserStore(){
        if(this.userStore === undefined){
            this.userStore = new UserStore()
        }
        return this.userStore
    }

    //Observables =>
    userLogin: UserLogin = {
        error: false,
        message: '',
        token: '',
        token_expired: false,
        expired_date: "",
        user: {}
    }
    error: boolean = false

    constructor(){
        makeObservable(this, {
            userLogin: observable,
            getUserLogin: action,
            clearStoredDate: action,
            getUserCredencials: computed,
            getError: computed
        })
    }
     async getUserLogin(username: string, password: string){
        const request = await fetch(`${urlBase}/login?username=${username}&password=${password}`, {
            method: 'GET',
            'headers': {
                'Access-Control-Allow-Origin': "*"
            }
        })
        if(request.status === 200){
            const response = await request.json()
            this.userLogin = response
            localStorage.setItem('token_user_etno', this.userLogin.token!)
            localStorage.setItem('user_etno_locality', this.userLogin.user?.username!)
            this.error = false
            toast.success('Logueado correctamente', {
                position: 'bottom-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
        }else{
            const response = await request.json()
            this.error = true
            toast.error('Credenciales Incorrectas', {
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
    async clearStoredDate() {
        await clearPersistedStore(this);
      }
    
    get getUserCredencials(){
        return this.userLogin
    }
    get getError(){
        return this.error
    }
}
export default UserStore