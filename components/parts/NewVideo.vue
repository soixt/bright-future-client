<template>
    <b-collapse aria-id="contentIdForA11y2" class="card" animation="slide" :open="isOpen">
        <div slot="trigger" slot-scope="props" class="card-header" role="button" aria-controls="contentIdForA11y3">
            <p class="card-header-title">Add New Video</p>
            <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
            </a>
        </div>
        <div class="card-content columns">
            <div class="column">
                <b-field label="Choose your video type">
                    <b-select placeholder="Video Types" v-model="newVideo.type" expanded>
                        <option value="highlights">Highlights</option>
                        <option value="fullgames">Full Games</option>
                        <option value="training">Training</option>
                    </b-select>
                </b-field>
                <b-field label="Place your youtube video url here">
                    <b-input placeholder="Add your new video url here..." expanded v-model="newVideo.url"></b-input>
                </b-field>
                <b-button type="is-primary" class="is-fullwidth" @click="addNewVideo('new-video-button')" :loading="getInUseButton('new-video-button')" :disabled="getInUseButton('new-video-button')">Add Video</b-button>
            </div>
        </div>
    </b-collapse>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data () {
        return {
            isOpen: false,
            newVideo: {
                type: 'highlights',
                url: '',
            }
        }
    },
    methods: {
        ...mapActions(['setInUseButton', 'removeInUseButton']),
        addNewVideo (btn) {
            if (this.newVideo.type != '' && this.newVideo.url != '') {
                this.setInUseButton(btn)
                this.$axios.post(`/new-video`, this.newVideo).then(res => {
                    this.removeInUseButton(btn)
                    this.$auth.setUser(res.data.data)
                    this.$store.commit('setAthletes', res.data.athletes)
                    this.newVideo = { type: 'highlights', url: '' }
                    this.$buefy.notification.open({ duration: 3000, message: res.data.message, position: 'is-bottom-right', type: 'is-primary', hasIcon: true, icon: 'check-circle' })
                }).catch(err => {
                    this.removeInUseButton(btn)
                    let message = (err.response.data.errors) ? Object.values(err.response.data.errors).join('<br/>') : err.response.data.message
                    this.$buefy.notification.open({ duration: 3000, message: message, position: 'is-bottom-right', type: 'is-danger', hasIcon: true, icon: 'alert-circle' })
                })
            }
        }
    },
    computed: {
        ...mapGetters(['getInUseButton'])
    }
}
</script>