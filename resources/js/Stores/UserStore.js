import axios from "axios";
import { action, observable, makeObservable } from "mobx";
import RootStore from "./RootStore";


class UserStore {
    rootStore
    users
    constructor(rootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {
            users: observable,
            getUsers: action,
            addUser: action,
        })
    }

    getUsers = async () => {
        await axios.get('/api/get/users').then((e) => {
            this.users = e.data
        });
    }

    addUser = async (user) => {
        this.users.push(user);
    }
}

export default UserStore