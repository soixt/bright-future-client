<template>
    <b-collapse aria-id="contentIdForA11y2" class="card" animation="slide" :open="isOpen">
        <div slot="trigger" slot-scope="props" class="card-header" role="button" aria-controls="contentIdForA11y3">
            <p class="card-header-title">General Settings</p>
            <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
            </a>
        </div>
        <div class="card-content columns">
            <div class="column">
                <b-field label="Full Name" expanded>
                    <b-field>
                        <b-input placeholder="Full Name" icon="draw" v-model="settings.name" expanded></b-input>
                    </b-field>
                </b-field>
                <b-field label="E-mail" expanded>
                    <b-field>
                        <b-input placeholder="E-mail" type="email" icon="at" v-model="settings.email" expanded></b-input>
                    </b-field>
                </b-field>
                <b-field label="Your new password">
                    <b-input placeholder="New password" type="password" password-reveal icon="lock" v-model="settings.password" required></b-input>
                </b-field>
                <b-button type="is-primary" class="is-fullwidth" @click="passwordConfirmation({ title: 'Update General Settings', message: 'If you want to <b>update</b> your general settings please enter your password.', url: '/settings/general', options: settings, btn: 'general-settings-button' })" :loading="getInUseButton('general-settings-button')" :disabled="getInUseButton('general-settings-button')">Update</b-button>
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
                name: '',
                email: '',
                password: ''
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