<template>
<div class="searchList">
  <div class="searchList-song searchList-content" v-if="searchListData.song">
    <p class="searchList-name">{{searchListData.song.name}}</p>
    <div class="searchList-songList">
      <div class="searchList-songListIn overflowText" v-for="(songList,index) in searchListData.song.itemlist" :key="index" @click="play(index,songList)">
        <span class="searchList-songNum">{{index+1}}</span>
        <span>{{songList.name}}</span>
        <span class="searchList-songNum">{{songList.singer}}</span>
      </div>
    </div>
  </div>

  <div class="searchList-sing searchList-content" v-if="searchListData.singer">
    <p class="searchList-name">{{searchListData.singer.name}}</p>
    <div class="searchList-songList" v-for="(singerList,index) in searchListData.singer.itemlist" :key="index" @click="getSinger(singerList.mid)">
      <div class="searchList-songListIn searchList-singListIn flex-box overflowText">
        <span class="searchList-singImg"><img :src="singerList.pic" alt=""></span>
        <div class="overflowText flex-box1">
          <span>{{singerList.name}}</span>
        </div>
      </div>
    </div>
  </div>

  <div class="searchList-album searchList-content" v-if="searchListData.album">
    <p class="searchList-name">{{searchListData.album.name}}</p>
    <div class="searchList-songList" v-for="(albumList,index) in searchListData.album.itemlist" :key="index" @click="getAlbum(albumList.mid)">
      <div class="searchList-songListIn searchList-singListIn flex-box overflowText">
        <span class="searchList-singImg"><img :src="albumList.pic" alt=""></span>
        <div class="overflowText flex-box1">
          <span>{{albumList.name}}</span>
          <span class="searchList-songNum">{{albumList.singer}}</span>
        </div>
      </div>
    </div>
  </div>

  <div class="searchList-mv searchList-content" v-if="searchListData.mv">
    <p class="searchList-name">{{searchListData.mv.name}}</p>
    <div class="searchList-songList">
      <div class="searchList-songListIn overflowText" v-for="(mvList,index) in searchListData.mv.itemlist" :key="index" @click="play(index,mvList)">
        <span class="searchList-songNum">{{index+1}}</span>
        <span>{{mvList.name}}</span>
        <span class="searchList-songNum">{{mvList.singer}}</span>
      </div>
    </div>
  </div>
</div>  
</template>
<script>
  import axios from 'axios'
  import {mapMutations} from 'vuex'
  export default{
    data () {
      return {
        searchListData: {}
      }
    },
    created () {
      console.log(this.$route.query.search)
      this.getData()
    },
    methods: {
      ...mapMutations([
        'clickPlay', 'setIsAudioBox'
      ]),
      play (i, li) {
        console.log(li)
        let list = { 'id': li.id, 'mid': li.mid, 'name': li.name, 'singer': li.singer, showNewSong: true }
        this.$store.commit('songInfo', list)
        this.$store.commit('setPlayList', list)
        this.clickPlay(true)
        this.setIsAudioBox(true)
      },
      getSinger (mid) {
        this.$store.commit('setIsSearch', false)
        this.$router.push({name: 'singer', query: {search: mid}})
      },
      getAlbum (mid) {
        this.$store.commit('setIsSearch', false)
        this.$router.push({name: 'album', query: {search: mid}})
      },
      getData () {
        axios.get('http://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg', {
          params: {
            key: this.$route.query.search
          }
        })
        .then(e => {
          let data = e.request.response
          data = typeof data === 'string' ? JSON.parse(data) : data
          this.searchListData = data.data
          console.log(data)
        })
      }
    },
    watch: {
      $route () {
        this.getData()
      }
    }
  }
</script>
<style>
.searchList{
  position: absolute;
  top: 2.2rem;
  bottom: 0;
  left: 0;
  right:0;
  overflow-y: auto;
  padding-bottom: 2.2rem;
  -webkit-overflow-scrolling: touch;
}

.searchList::-webkit-scrollbar{
  display: none;
}

.searchList-name{
  padding:0 .8rem;
  font-size: .7rem;
  line-height: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

 .searchList-songList{
    width: 96%;
    margin: 0 auto;
  }

  .searchList-songListIn{
    border-bottom: 1px solid #c2c8d2;
    font-size: .7rem;
    line-height: 2rem;
    color: #fff;
  }

  .searchList-songListIn span{
    padding-right: .2rem;
  }

  .searchList-songListIn span:last-child{
    padding-right: 0;
  }
  
  .searchList-songNum{
    color: #c2c8d2;
  }

  .searchList-singImg{
    width: 1.6rem;
    height: 1.6rem;
    display: block;
    overflow: hidden;
  }

  .searchList-singListIn{
    -webkit-align-items:center;
    align-items: center;
    line-height: 3rem;
  }

  .searchList-content{
    margin-top: .5rem;
  }

  .searchList-content:first-child{
    margin-top: 0;
  }
</style>
