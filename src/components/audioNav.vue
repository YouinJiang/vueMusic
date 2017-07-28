<template>
  <div class="audioNav flex-box" @click="showAudioBox">
    <div class="audioName">
      <p class="audio-song overflowText">{{song.name}}</p>
      <p class="audio-sing overflowText">{{song.singer}}</p>
    </div>

    <div class="audio-button flex-box">
      <i class="audio-button-l" @click.stop="playLastS"><img src="../assets/images/icon-backward.png" alt=""></i>
      <i :class="['audio-button-c',playClass]" @click.stop='clickPause'></i>
      <i class="audio-button-r" @click.stop="playContinueS"><img src="../assets/images/icon-forward.png" alt=""></i>
    </div>

    <div class="audio-progress-box">
      <div class="audio-progress">
        <div class="audio-progress-in" v-bind:style="{width:progressTime+'%'}"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default{
    name: 'audioNav',
    computed: {
      ...mapState([
        'song', 'playing'
      ]),
      ...mapState({
        playClass (state) {
          return state.playing ? 'audio-button-play' : 'audio-play-c2'
        },
        progressTime (state) {
          return state.currentTime / state.duration * 100
        }
      })
    },
    methods: {
      clickPause () {
        let music = document.getElementById('music')
        this.playing ? music.pause() : music.play()
        this.$store.commit('clickPlay', !this.playing)
      },
      playLastS () {
        this.$store.dispatch('playContinue', false)
      },
      playContinueS () {
        this.$store.dispatch('playContinue', true)
      },
      showAudioBox () {
        this.$store.commit('setIsAudioBox', true)
      }
    }
  }
</script>

<style scoped>
.audioNav{
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  background-image:-webkit-gradient(linear,0% 0%, 0% 100%, from(#474747), to(#303030), color-stop(0.4,#5C5658));
}

.audioName{
  padding-left: .5rem;
  -webkit-box-flex: 1;
  -webkit-flex:1;
  flex:1;
  overflow: hidden;
}

.audio-button{
  width: 7rem;
  -webkit-align-items:center;
  align-items: center;
  -webkit-justify-content: space-around;
  justify-content: space-around;
}

.audio-button-l,.audio-button-c,.audio-button-r{
  display: block;
  width: .9rem;
  height: 1.2rem;
}

.audio-button-play{
  background: url(../assets/images/icon-playing.png) center center no-repeat;
  background-size:contain;
}

.audio-song{
  font-size: .7rem;
  line-height: 1.2rem;
  color: #fff;
}

.audio-sing{
  font-size: .5rem;
  line-height: 1rem;
  color: #c2c8d2;
}

.audio-progress-box{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}

.audio-progress{
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.5);
}

.audio-progress-in{
  width: 0;
  height: 2px;
  background: #fff;
  -webkit-transition: all .2s;
  transition: all .2s;
}
</style>
