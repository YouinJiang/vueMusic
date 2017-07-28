<template>
  <div class="audioBox-wrap">
    <div class="audioBox-head flex-box">
      <div class="audioBox-back" @click="hideAudioBox">
        <img src="../assets/images/icon-back.png" alt="">
      </div>
      <div class="audioBox-name flex-box1">
        <span>{{song.name}}</span>
        <span class="audioBox-sing">{{song.singer}}</span>
      </div>
    </div>
    <div class="audio-audio">
      <audio ref="music" id='music' :src="dataUrl" :autoplay="this.playing" v-on:timeupdate="updateTime"  v-on:ended="playContinueS"></audio>
    </div>
    <div class="audio-text" ref="audioBox">
      <p class="audio-text-list" v-for="(list,index) in songText" :key="index" v-bind:class="list[0][1]" :ref="list[0][1]">{{list[1]}}</p>
  
    </div>
    <div class="audio-progress-warp">
      <div class="audio-progress" v-on:click="touchSit($event)">
        <div class="audio-progress-in" v-bind:style="{width:progressTime+'%'}">
          <div class="audio-progress-radius"></div>
        </div>
      </div>
      <div class="audio-time">
        <p>{{currentTime}}</p>
        <p>{{duration}}</p>
      </div>
    </div>
  
    <div class="audio-button-warp">
      <div class="audio-button">
        <div class="audio-play-order">
          <i class="audio-play-orderIcon"></i>
        </div>
        <div class="audio-play-box">
          <i class="audio-play-l" @click="playLastS">
            <img src="../assets/images/icon-backward.png" alt="">
          </i>
          <i :class="playClass" @click='ckickPlay'></i>
          <i class="audio-play-r" @click="playContinueS">
            <img src="../assets/images/icon-forward.png" alt="">
          </i>
        </div>
        <div class="audio-play-list">
          <i class="audio-play-listIcon" @click="isShowList"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState, mapGetters } from 'vuex'
import base64 from '../base64.js'
import axios from 'axios'
import $ from 'jquery'
export default {
  data () {
    return {
      'a': 34,
      songText: null,
      clse: 'audio-play-c'
    }
  },
  computed: {
    ...mapState([
      'song', 'playing'
    ]),
    ...mapGetters([
      'currentTime', 'duration'
    ]),
    ...mapState({
      dataUrl (state) {
        this.isId = state.song.id
        if (this.isId) {
          return 'http://ws.stream.qqmusic.qq.com//' + this.isId + '.m4a?fromtag=46'
        } else {
          return ''
        }
      },
      progressTime (state) {
        let dataTime
        // console.log(this.songText);
        for (let data in this.songText) {
          dataTime = data.split(':')
          dataTime = parseInt(dataTime[0]) * 60 + parseInt(dataTime[1])
          if (state.currentTime === dataTime) {
            for (let inDate in this.songText) {
              if (this.songText[inDate][0][1] === 'current') {
                this.songText[inDate][0][1] = ''
              }
            }

            // let ele = this.$refs.audioBox
            // let eleCur = this.$refs.current
            let eleCur = $('.audio-text').find('.current')
            if (eleCur.length > 0) {
              $('.audio-text').animate({ 'scrollTop': $('.audio-text').scrollTop() + eleCur.offset().top - $('.audio-text').offset().top - 30 }, 350)
            }
            this.songText[data][0].push('current')
          }
        }
        return state.currentTime / state.duration * 100
      }
    }),
    playClass () {
      return this.playing ? 'audio-play-c' : 'audio-play-c2'
    }
  },
  created () {
    console.log(this.dataUrl)
    // if(this.song.showNewSong){
    //   this.showSongText();
    // }
  },
  methods: {
    ...mapMutations([
      'setIsAudioBox', 'clickPlay', 'isShowSongList'
    ]),
    hideAudioBox () {
      this.setIsAudioBox(false)
    },
    updateTime () {
      // console.log(parseInt(this.$refs.music.duration));
      this.$store.commit('updateCurrentTime', parseInt(this.$refs.music.currentTime))
      this.$store.commit('updateDuration', parseInt(this.$refs.music.duration))
    },
    touchSit (event) {
      this.$refs.music.currentTime = parseInt(this.$refs.music.duration) * ((event.pageX - 25) / event.toElement.clientWidth)
      this.$store.commit('updateCurrentTime', parseInt(this.$store.duration) * ((event.pageX - 25) / event.toElement.clientWidth))
      event.preventDefault()
    },
    isShowList () {
      this.isShowSongList(true)
    },
    ckickPlay () {
      if (!this.playing) {
        this.$refs.music.play()
      } else {
        this.$refs.music.pause()
      }
      this.clickPlay(!this.playing)
    },
    showSongText () {
      this.$store.commit('showNewSong', false)
      axios.get('https://api.darlin.me/music/lyric/' + this.song.id)
        .then(e => {
          var data = e.request.response
          data = data.substring(data.indexOf('(') + 1)
          data = data.substring(0, data.lastIndexOf(')'))
          data = typeof data === 'string' ? JSON.parse(data) : data
          this.songText = base64.decode(data.lyric)
            .split('[')
            .slice(5)
            .map(str => {
              let t = str.split(']')
              return { [t[0]]: [[t[0]], t[1]] }
            })
            .reduce((a, b) => {
              return { ...a, ...b }
            })
          console.log(this.songText)
        })
        .catch(function (response) {
          alert('请联系管理员' + response)
        })
    },
    playContinueS () {
      this.$store.dispatch('playContinue', true)
    },
    playLastS () {
      this.$store.dispatch('playContinue', false)
    }
  },
  watch: {
    song (song) {
      $('.audio-text').animate({'scrollTop': 0}, 30)
      this.$store.commit('showNewSong', false)
      axios.get('https://api.darlin.me/music/lyric/' + this.song.id)
        .then(e => {
          var data = e.request.response
          data = data.substring(data.indexOf('(') + 1)
          data = data.substring(0, data.lastIndexOf(')'))
          data = typeof data === 'string' ? JSON.parse(data) : data
          this.songText = base64.decode(data.lyric)
            .split('[')
            .slice(5)
            .map(str => {
              let t = str.split(']')
              return { [t[0]]: [[t[0]], t[1]] }
            })
            .reduce((a, b) => {
              return { ...a, ...b }
            })
        })
        .catch(function (response) {
          alert('请联系管理员' + response)
        })
    }
  }
}
</script>
<style scoped>
.audioBox-sing {
  font-size: .8rem;
  padding-left: .5rem;
}

.audio-text {
  margin-bottom: 1rem;
  position: absolute;
  top: 2.2rem;
  bottom: 3.8rem;
  left: 0;
  right: 0;
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;
}

.audio-text-list {
  white-space: normal;
  min-height: 28px;
  height: 28px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  opacity: .6;
  line-height: 28px;
}

.current {
  opacity: 1;
}

.audio-progress-warp {
  position: absolute;
  bottom: 2.5rem;
  left: 0;
  right: 0;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
}

.audio-progress,
.audio-progress-in {
  width: 100%;
  height: .2rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: .1rem;
}

.audio-progress-in {
  width: 0;
  background: #fff;
  -webkit-transition: all .2s;
  transition: all .2s;
  display: flex;
  display: -webkit-flex;
  -ms-justify-content: flex-end;
  -webkit-justify-content: flex-end;
  -o-justify-content: flex-end;
  -moz-justify-content: flex-end;
  justify-content: flex-end;
  overflow: visible;
}

.audio-progress-radius {
  width: .5rem;
  min-width: .5rem;
  height: .5rem;
  border-radius: 50%;
  position: relative;
  top: -0.15rem;
  box-shadow: 0 0 5px 0 #7d7d7d;
  background: #fff;
}

.audio-time {
  width: 100%;
  margin-top: .25rem;
  display: -webkit-flex;
  display: -webkit-box;
  display: flex;
  justify-content: space-between;
}

.audio-time p {
  color: #fff;
  font-size: .6rem;
}

.audio-button-warp {
  padding: 0.5rem 1.5rem;
  position: absolute;
  bottom: .5rem;
  left: 0;
  right: 0;
}

.audio-play-orderIcon {
  width: .9rem;
  height: .7rem;
  display: block;
  background: url(../assets/images/icon-random.png) center center no-repeat;
  background-size: contain;
}

.audio-play-listIcon {
  width: .9rem;
  height: .7rem;
  display: block;
  background: url(../assets/images/icon-meng.png) center center no-repeat;
  background-size: contain;
}

.audio-play-box {
  width: 7.5rem;
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
}

.audio-play-box i {
  display: block;
  width: 1.25rem;
  height: 1.5rem;
}

.audio-play-c {
  background: url(../assets/images/icon-playing.png) center center no-repeat;
  background-size: contain;
}

.audio-button {
  display: -webkit-box;
  display: flex;
  justify-content: space-between;
  -webkit-align-items: center;
  align-items: center;
}
</style>
