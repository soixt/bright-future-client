<template>
  <div :class="sidebar ? 'resized' : 'base'">
    <b-navbar fixed-top transparent spaced shadow>
      <template slot="brand">
        <b-navbar-item tag="nuxt-link" :to="{ name: 'index' }">
          <img src="~/static/logo-blue.png" alt="Bright Future">Bright Future
        </b-navbar-item>
        <span class="navbar-burger show-always burger" @click="setSidebar" :class="$store.getters.getSidebar ? 'is-active' : ''">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </span>
      </template>          
    </b-navbar>
    <nuxt :key="$route.fullPath" />
    <b-sidebar type="is-light" :fullheight="true" :right="true" :open.sync="sidebar" :can-cancel="false">
      <div class="sidebar-container" v-if="$auth.loggedIn">
        <AvatarSettings/>
        <p class="subtitle has-text-centered">{{ $auth.user.name }}</p>
        <div class="has-text-centered">
          <b-button class="close-sidebar" @click="setSidebar">
            <b-icon icon="chevron-left" size="is-small"></b-icon>
          </b-button>
          <nuxt-link class="button is-dark" :to="{ name: 'index' }">
            <b-icon icon="home" size="is-small"></b-icon>
          </nuxt-link>
          <nuxt-link v-if="$auth.user.role == 'athlete'" class="button is-primary" :to="{ name: 'slug', params: { slug: $auth.user.username } }">
            <b-icon icon="account" size="is-small"></b-icon>
          </nuxt-link>
          <Present v-if="$auth.user.role == 'athlete'"/>
          <Logout/>
        </div>
        <div class="has-text-centered" v-if="$auth.loggedIn && !$auth.user.verified">
          <br>
          <b-button @click="sendVerification('send-verification-button')" :loading="getInUseButton('send-verification-button')" :disabled="getInUseButton('send-verification-button')">Get Verification E-mail</b-button>
        </div>
        <Divider/>
        <NewVideo v-if="$auth.user.role == 'athlete'"/>
        <PresentationSettings v-if="$auth.user.role == 'athlete'"/>
        <GeneralSettings/>
        <AccountSettings/> 
        <Footer/>
      </div>
      <div class="sidebar-container" v-else>
        <figure class="avatar has-text-centered">
          <img src="~/static/logo-blue.png">
        </figure>
        <div class="has-text-centered">
          <b-button class="close-sidebar" @click="setSidebar">
            <b-icon icon="chevron-left" size="is-small"></b-icon>
          </b-button>
          <nuxt-link class="button is-dark" :to="{ name: 'index' }">
            <b-icon icon="home" size="is-small"></b-icon>
          </nuxt-link>
        </div>
        <Login/>
        <Footer/>
      </div>
    </b-sidebar>
  </div> 
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import NuxtSSRScreenSize from 'nuxt-ssr-screen-size'
export default {
  mixins: [NuxtSSRScreenSize.NuxtSSRScreenSizeMixin],
  mounted(){
    if(process.client){
      window.scrollTo(0, 0);
    }
  },
  watch: {
    $route() {
      if (this.$vssWidth <= 768) {
        this.setSidebar(false)
      }
    },
  },
  computed: {
    ...mapGetters(['getInUseButton']),
    sidebar: {
      get() { return this.$store.getters.getSidebar; },
      set() { this.$store.commit('setSidebar'); }
    }
  },
  methods: {
    ...mapActions(['setSidebar', 'sendVerification'])
  },
}
</script>