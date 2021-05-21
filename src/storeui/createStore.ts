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
      backgroundColors: [
        `#7aa770`,
        `#82d1cc`,
        `#f3bb7b`,
        `#ac6093`,
        `#a282e0`,
        `#dc597d`,
        `#3f43bc`,
        `#ea8464`, 
      ], 
      backgroundColorsA: [
        '#648f5b',
        '#72b4b0',
        '#d19e65',
        '#995783',
        '#866db7',
        '#973d56',
        '#7c2e44',
        '#a55e48',
      ],  
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