
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    searchBack: false,
    isSearch: true,
    isAudioBox: false,
    recommendId: '',
    song: {
      id: null,
      mid: null,
      name: null,
      singer: null,
      showNewSong: false
    },
    playing: false,
    currentTime: 0,
    duration: 0,
    isShowSongList: false,
    playList: [],
    showSongListMeng: false,
    listMengData: {
      id: null,
      mid: null,
      name: null,
      singer: null
    },
    showListMeng: false
  },
  getters: {
    currentTime: state => {
      return parseInt(state.currentTime / 60) + ':' + (Array(2).join(0) + (state.currentTime % 60)).slice(-2)
    },
    duration: state => {
      return parseInt(state.duration / 60) + ':' + (Array(2).join(0) + (state.duration % 60)).slice(-2)
    }
  },
  mutations: {
    setSearchBack (state, e) {
      state.searchBack = e
    },
    setIsSearch (state, e) {
      state.isSearch = e
    },
    recommendId (state, e) {
      state.recommendId = e
    },
    setIsAudioBox (state, e) {
      state.isAudioBox = e
    },
    songInfo (state, e) {
      state.song = e
    },
    showNewSong (state, e) {
      state.song.showNewSong = e
    },
    clickPlay (state, e) {
      state.playing = e
    },
    updateDuration (state, time) {
      state.duration = time
    },
    updateCurrentTime (state, time) {
      state.currentTime = time
    },
    isShowSongList (state, e) {
      state.isShowSongList = e
    },
    setPlayList (state, e) {
      if (state.playList.length > 0) {
        for (let i = 0; i < state.playList.length; i++) {
          if (state.playList[i].id === e.id) {
            return
          }
        }
      }
      state.playList.push(e)
    },
    showSongListMeng (state, e) {
      state.showSongListMeng = e
    },
    removePlayList (state, e) {
      state.playList.splice(e, 1)
    },
    listMengData (state, e) {
      state.listMengData = e
    },
    showListMeng (state, e) {
      state.showListMeng = e
    }
  },
  actions: {
    playContinue ({commit, state}, e) {
      let playListNum = state.playList.length
      var li
      if (playListNum > 1) {
        for (let i = 0; i < playListNum; i++) {
          if (state.playList[i].id === state.song.id) {
            var index = i
          }
        }
        if (e) {
          li = (index + 1) % playListNum
        } else {
          li = (index - 1 + playListNum) % playListNum
        }
        // commit('songInfo', { 'id': state.playList[li].data.songid, 'mid': state.playList[li].data.songmid, 'name': state.playList[li].data.songname, 'singer': state.playList[li].data.singer[0].name, showNewSong: true })
        console.log(state.song)
      } else {
        li = 0
        document.getElementById('music').currentTime = 0
        commit('updateCurrentTime', 0)
        document.getElementById('music').play()
      }
      commit('songInfo', { 'id': state.playList[li].id, 'mid': state.playList[li].mid, 'name': state.playList[li].name, 'singer': state.playList[li].singer, showNewSong: true })
    }
  }
})

export default store
