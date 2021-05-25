// export type TFriend = {
//     name: string
//     isFavorite: boolean
//     isSingle: boolean
//   }
  
  export function uiStore() { 
    return {
      isAlertDialogOpen: false,
      isEndAnime: false,
      isRightMenuOpen: false,
      isMsgRead: false,
      setEndAnime(val: boolean){
        this.isEndAnime = val;
      },
      setAlertDialogOpen(val: boolean){
        this.isAlertDialogOpen = val;
      },
      setRightMenuOpen(val: boolean){
        this.isRightMenuOpen = val;
      },
      setMsgRead(val: boolean){
        this.isMsgRead = val;
      },
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
      getBackgroundColor(index: number){ 
        if(this.backgroundColors[index - 128])
            return this.backgroundColors[index - 128] 
        if(this.backgroundColors[index - 64])
          return this.backgroundColors[index - 64]
        if(this.backgroundColors[index - 32])
            return this.backgroundColors[index - 32] 
        if(this.backgroundColors[index - 16])
          return this.backgroundColors[index - 16]
        if(this.backgroundColors[index - 8])
          return this.backgroundColors[index - 8] 
        if(this.backgroundColors[index])
          return this.backgroundColors[index]
      },
      // friends: [] as TFriend[],
      // makeFriend(name: string, isFavorite = false, isSingle = false) {
      //   const oldFriend = this.friends.find(friend => friend.name === name)
      //   if (oldFriend) {
      //     oldFriend.isFavorite = isFavorite
      //     oldFriend.isSingle = isSingle
      //   } else {
      //     this.friends.push({ name, isFavorite, isSingle })
      //   }
      // },
      // get singleFriends() {
      //   return this.friends.filter(friend => friend.isSingle)
      // },
    }
  }
  
  export type TStore = ReturnType<typeof uiStore>