<template>
    <b-tooltip position="is-bottom" :label="'You have ' + $auth.user.extended.presentations + ' presentations'" multilined>
        <b-button type="is-info" @click="present" :loading="getInUseButton('present-button')" :disabled="getInUseButton('present-button')">
            <b-icon icon="presentation" size="is-small"></b-icon>
        </b-button>
    </b-tooltip>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    methods: {
        ...mapActions(['passwordConfirmation']),
        present () {
            if (this.$auth.user.extended.presentations > 0) {
                this.passwordConfirmation({
                    title: 'Present your profile',
                    message: `If you want to <b>present</b> your profile please enter your password.`,
                    url: '/settings/present',
                    btn: 'present-button'
                })
            }
        }
    },
    computed: {
        ...mapGetters(['getInUseButton'])
    }
}
</script>