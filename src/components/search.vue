<template>
  <div class="search">
    <div class="header">
      <em v-if="isSearchBack">
        <img src="../assets/images/icon-back.png" alt="" @click="clickSearchBack">
      </em>
      <div class="search-input">
        <input type="text" placeholder="搜索 歌曲/专辑/歌手" v-model="searchInfo" @focus="keyup(searchInfo)">
      </div>
      <em>
        <img src="../assets/images/icon-search.png" alt="" @click="clickSearch(searchInfo)">
      </em>
    </div>
    <transition name="custom-classes-transition" enter-active-class="animated slideInUp fast" leave-active-class="animated slideOutDown">
      <div class="search-warp" v-if="isSearchList">
        <ul class="search-hot">
          <li class="search-hotList" v-for="(list,index) in searchList" :key="index" @click="clickSearch(list.k)">
            <div class="search-hotIn">
              <span class="search-hotListNum">{{index+1}}</span>
              <span>{{list.k}}</span>
              <span class="search-hotListNum">{{list.n}}</span>
            </div>
          </li>
        </ul>
      </div>
    </transition>
  
  </div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      searchList: [],
      isSearchList: false,
      searchInfo: ''
    }
  },
  beforeMount () {
    this.getSearchList()
    console.log(this.isSearchBack)
  },
  computed: {
    ...mapState({
      isSearchBack: 'searchBack'
    })
  },
  methods: {
    getSearchList () {
      axios.get('http://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg')
        .then(e => {
          var data = e.request.response
          data = typeof data === 'string' ? JSON.parse(data) : data
          this.searchList = data.data.hotkey
        })
    },
    clickSearch (val) {
      if (val === '') {
        return
      }
      this.isSearchList = false
      this.searchInfo = val
      // this.$store.commit("setIsSearch",true);
      this.$router.push({ name: 'searchList', query: { search: val } })
    },
    keyup (val) {
      if (this.$route.name === 'searchList') {
        return
      }
      if (val === '') {
        this.$store.commit('setSearchBack', true)
        this.isSearchList = true
      }
    },
    clickSearchBack () {
      this.searchInfo = ''
      this.isSearchList = false
      this.$store.commit('setSearchBack', false)
      this.$router.push({ path: '/' })
    }
  }
}
</script>
<style scoped>
.search {
  padding-top: 2.2rem;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2.2rem;
  z-index: 6;
  display: -webkit-flex;
  display: -webkit-box;
  display: flex;
}

.header em {
  width: 1.1rem;
  height: 1.1rem;
  padding: .5rem;
  display: block;
}

.search-input {
  flex: 1;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  padding: 0 0.2rem;
  -webkit-transition: all 1.5s ease-in-out 1s;
  ;
  -o-transition: all 1.5s ease-in-out 1s;
  ;
  transition: all 1.5s ease-in-out 1s;
  ;
}

.search-input input {
  width: 100%;
  font-size: .7rem;
  height: 1rem;
  line-height: 1rem;
  padding: 0.3rem .2rem;
  background: rgba(255, 255, 255, 0.3);
  outline: none;
  border: 0;
  color: #fff;
  margin-top: .3rem;
  border-radius: .2rem;
}

.search-warp {
  position: absolute;
  top: 0;
  bottom: 0;
  padding-top: 2.2rem;
  z-index: 5;
  left: 0;
  width: 100%;
  overflow-y: auto;
  background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#474747), to(#303030), color-stop(0.4, #5C5658));
  -webkit-overflow-scrolling: touch;
}

.search-hot {
  position: absolute;
  top: 2.2rem;
  left: 0;
  bottom: 0;
  width: 100%;
  overflow-y: auto;
}

.search-hotList {
  width: 96%;
  margin: 0 auto;
}

.search-hotIn {
  border-bottom: 1px solid #c2c8d2;
  font-size: .7rem;
  line-height: 2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fff;
}

.search-hotIn span {
  padding-right: .2rem;
}

.search-hotIn span:last-child {
  padding-right: 0;
}

.search-hotListNum {
  color: #c2c8d2;
}
</style>
