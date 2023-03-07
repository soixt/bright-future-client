<template>
  <section class="container smt5 gg">
    <div class="columns is-multiline">
      <div class="column is-4">
        <UserBlock :user="athlete"/>
      </div>
      <div class="column is-8 user-block" v-if="athlete && athlete.videos">
        <div class="section is-grey fixed-shady" style="padding: 1.5rem; position: relative; margin: 0; margin-bottom: 3rem;" v-for="(video, k) in athlete.videos" :key="k">
          <div class="stack-top left">{{ video.type }}</div>
          <a @click.prevent="deleteVideo(video.id, 'delete-video-button-' + video.id)" :loading="getInUseButton('delete-video-button-' + video.id)" :disabled="getInUseButton('delete-video-button-' + video.id)" v-if="$auth.loggedIn && $route.params.slug == $auth.user.username" class="delete dlt-btn modal-toggle" data-id="confirmation-modal"></a>
          <figure class="image is-16by9">
            <iframe class="has-ratio" width="640" height="360" :src="`https://www.youtube.com/embed/${video.url}?showinfo=0`" frameborder="0" allowfullscreen></iframe>
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  scrollToTop: true,
  data () {
    return {
      user: null
    }
  },
  methods: {
    ...mapActions(['setInUseButton', 'removeInUseButton']),
    deleteVideo (id, btn) {
      if (id != '' && this.$auth.loggedIn && this.$auth.user.username == this.$route.params.slug) {
        this.setInUseButton(btn)
        this.$buefy.dialog.confirm({
          title: 'Deleting video',
          message: 'Are you sure you want to <b>delete</b> your video? This action cannot be undone.',
          confirmText: 'Delete Video',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => {
            this.$axios.post(`/delete-video`, { id: id }).then(res => {
              this.removeInUseButton(btn)
              this.$auth.setUser(res.data.data)
              this.$store.commit('setAthletes', res.data.athletes)
              this.$buefy.notification.open({ duration: 3000, message: res.data.message, position: 'is-bottom-right', type: 'is-primary', hasIcon: true, icon: 'delete-circle' })
            }).catch(err => {
              this.removeInUseButton(btn)
              let message = (err.response.data.errors) ? Object.values(err.response.data.errors).join('<br/>') : err.response.data.message
              this.$buefy.notification.open({ duration: 3000, message: message, position: 'is-bottom-right', type: 'is-danger', hasIcon: true, icon: 'alert-circle' })
            })
          }
        })
      }
    }
  },
  async asyncData({ $axios, params, error, store }) {
    if (!store.state.auth.loggedIn || store.state.auth.user.username != params.slug) {
      try {
        const user = await $axios.$get(`/athlete/${params.slug}`)
        return { user: user.data }
      } catch (e) {
        error({ statusCode: 404, message: 'This page do not exist.' })
      }
    }
  },
  computed: {
    ...mapGetters(['getInUseButton']),
    title () {
      if (this.athlete) {
        return this.athlete.name
      } 
      return this.$route.params.slug
    },
    athlete () {
      return this.$auth.loggedIn && this.$auth.user.username == this.$route.params.slug ? this.$auth.user : this.user
    }
  },
  head() {
    return {
      title: this.title + ' - Bright Future',
      meta: [
        { hid: 'description', name: 'description', content: this.athlete.sport },
        { hid: 'og:title', name: 'og:title', content: this.athlete.name },
        { hid: 'og:image', name: 'og:image', content: this.athlete.avatar },
        { hid: 'og:description', name: 'og:description', content: this.athlete.sport }
      ],
    }
  },
  mounted(){
    if(process.client){
      window.scrollTo(0, 0);
    }
    console.log(this.athlete)
  }
}
</script>
