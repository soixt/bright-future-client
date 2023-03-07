<template>
    <b-collapse aria-id="contentIdForA11y2" class="card" animation="slide" :open="isOpen">
        <div slot="trigger" slot-scope="props" class="card-header" role="button" aria-controls="contentIdForA11y3">
            <p class="card-header-title">Presentations</p>
            <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
            </a>
        </div>
        <div class="card-content columns">
            <div class="column">
                <b-field>
                  <b-input placeholder="Enter secret code" icon="lock-check" v-model="settings.secret" expanded></b-input>
                  <p class="control">
                    <b-button class="button is-primary" @click="passwordConfirmation({ title: 'Unlock By Secret Code', message: 'If you want to <b>unlock</b> free plan please enter your password.', url: '/settings/secretcode', options: settings, btn: 'presentations-settings-button' })" :loading="getInUseButton('presentations-settings-button')" :disabled="getInUseButton('presentations-settings-button')">
                        <b-icon icon="lock-open"></b-icon>
                    </b-button>
                  </p>
                </b-field>
                <p class="has-text-centered">If you want to buy presentations, you can send me money via <a href="https://paypal.me/sorasanin" target="_blank">paypal</a>. One presentation for all schools with your sport is five dollars. If you send ten dollars you will get two presentations and so on. Moslty, your account will be updated with new available presentations within a few minutes, but sometimes you will need to wait up to 12h.</p>
                <p class="has-text-centered">I hope you will find your scholarship!</p>
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
            settings: {
                secret: ''
            }
        }
    },
    methods: {
        ...mapActions(['passwordConfirmation']),
    },
    created () {
        this.settings.name = this.$auth.user.name
        this.settings.email = this.$auth.user.email
    },
    computed: {
        ...mapGetters(['getInUseButton'])
    }
}
</script>