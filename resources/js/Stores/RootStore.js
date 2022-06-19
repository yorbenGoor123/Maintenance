import UserStore from "./UserStore"

class RootStore {
    userStore

    constructor() {
        this.userStore = new UserStore(this);
    }
}

export default RootStore