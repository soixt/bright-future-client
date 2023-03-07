<template>
    <div class="card fixed-shady has-text-centered user-block">
        <div class="card-image">
            <figure class="avatar">
                <img :src="user.avatar">
            </figure>
        </div>
        <div class="card-content">
            <div class="content">
                <h3>{{ user.name }}</h3>
                <nuxt-link class="button is-primary" :to="{ name: 'slug', params: { slug: user.username } }" v-if="$nuxt.$route.name == 'index'">
                    <b-icon icon="account" size="is-small"></b-icon>
                </nuxt-link>
                <b-button class="button is-primary" @click="videoModal = true" v-if="$nuxt.$route.name == 'index' && user.videos.length">
                    <b-icon icon="video" size="is-small"></b-icon>
                </b-button>
                <b-button type="is-primary" v-if="$auth.loggedIn && $auth.user.role == 'recruiter'" @click="messageModal = true">
                    <b-icon icon="email" size="is-small"></b-icon>
                </b-button>
                <b-button type="is-primary" :loading="getInUseButton('follow-athlete-button')" :disabled="getInUseButton('follow-athlete-button')" v-if="$auth.loggedIn && $auth.user.role == 'recruiter' && !$auth.user.favorites.includes(user.id)" @click="favorite({ action: 'favorite', username: user.username, btn: 'follow-athlete-button' })">
                    <b-icon icon="star-outline" size="is-small"></b-icon>
                </b-button>
                <b-button type="is-primary" :loading="getInUseButton('unfollow-athlete-button')" :disabled="getInUseButton('unfollow-athlete-button')" v-if="$auth.loggedIn && $auth.user.role == 'recruiter' && $auth.user.favorites.includes(user.id)" @click="favorite({ action: 'unfavorite', username: user.username, btn: 'unfollow-athlete-button' })">
                    <b-icon icon="star" size="is-small"></b-icon>
                </b-button>
                <Divider/>
                <p>{{ user.sports[0].name }}</p>
                <p>{{ user.extended.bday }}</p>
                <p>{{ user.extended.location }}</p>
                <Divider v-if="$nuxt.$route.name == 'slug'" />
                <p class="has-text-centered" v-if="$nuxt.$route.name == 'slug'">{{ user.extended.about }}</p>
            </div>
        </div>
        <b-modal :active="messageModal" :width="640">
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Send Message To {{ user.name }}</p>
                    <button type="button" class="delete" @click="messageModal = false"/>
                </header>
                <section class="modal-card-body">
                    <b-input placeholder="Type your message..." maxlength="200" type="textarea" v-model="messageForm.body"></b-input>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="messageModal = false">Close</button>
                    <button class="button is-primary" @click="send('sending-message-button')" :loading="getInUseButton('sending-message-button')" :disabled="getInUseButton('sending-message-button')">Send</button>
                </footer>
            </div>
        </b-modal>
        <b-modal @close="videoModal = false" :active="videoModal" v-if="$nuxt.$route.name == 'index' && user.videos.length">
            <figure class="image is-16by9">
                <iframe class="has-ratio" width="1280" height="960" :src="`https://www.youtube.com/embed/${user.videos[0].url}?showinfo=0`" frameborder="0" allowfullscreen></iframe>
          </figure>
        </b-modal>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    props: {
        user: {
            type: Object,
            required: true,
        }
    },
    data () {
        return {
            messageModal: false,
            videoModal: false,
            messageForm: {
                body: ''
            }
        }
    },
    computed: {
        ...mapGetters(['getInUseButton'])
    },
    methods: {
        ...mapActions(['favorite', 'setInUseButton', 'removeInUseButton']),
        send (btn) {
          this.setInUseButton(btn)
          this.$axios.post(`/message/new/${this.user.username}`, this.messageForm).then(res => {
            this.removeInUseButton(btn)
            this.messageForm.body = ''
            this.messageModal = false
            this.$buefy.notification.open({ duration: 3000, message: res.data.message, position: 'is-bottom-right', type: 'is-primary', hasIcon: true, icon: 'check-circle' })
          }).catch(err => {
            this.removeInUseButton(btn)
            let message = (err.response.data.errors) ? Object.values(err.response.data.errors).join('<br/>') : err.response.data.message
            this.$buefy.notification.open({ duration: 9000, message: message, position: 'is-bottom-right', type: 'is-danger', hasIcon: true, icon: 'alert-circle' })
          })
        }
    }
}
</script>