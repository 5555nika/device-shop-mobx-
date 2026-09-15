import { makeAutoObservable }  from 'mobx'
import type { IUser } from '../types';

export class UserStore {
    _isAuth: boolean = false
    _user: IUser | null = null

    constructor() {
        makeAutoObservable(this)
    }

    setIsAuth(bool: boolean) {
        this._isAuth = bool
    }

    setUser(user: IUser | null) {
        this._user = user
    }

    get user()  {
        return this._user  
    }
    
    get isAuth() {
        return this._isAuth
    }
}