export type TFriend = {
    name: string
    isFavorite: boolean
    isSingle: boolean
  }
  
  export function createStore() {
    // note the use of this which refers to observable instance of the store
    return {
      friends: [] as TFriend[],
      isEndAnime: false,
      isRightMenuOpen: false,
      isMsgRead: false,
      setEndAnime(val: boolean){
        this.isEndAnime = val;
      },
      setRightMenuOpen(val: boolean){
        this.isRightMenuOpen = val;
      },
      setMsgRead(val: boolean){
        this.isMsgRead = val;
      },
      makeFriend(name: string, isFavorite = false, isSingle = false) {
        const oldFriend = this.friends.find(friend => friend.name === name)
        if (oldFriend) {
          oldFriend.isFavorite = isFavorite
          oldFriend.isSingle = isSingle
        } else {
          this.friends.push({ name, isFavorite, isSingle })
        }
      },
      get singleFriends() {
        return this.friends.filter(friend => friend.isSingle)
      },
    }
  }
  
  export type TStore = ReturnType<typeof createStore>