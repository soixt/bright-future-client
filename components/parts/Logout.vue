<template>
    <b-button type="is-danger" @click="logout('logout-button')" :loading="getInUseButton('logout-button')" :disabled="getInUseButton('logout-button')">
        <b-icon icon="power" size="is-small"></b-icon>
    </b-button>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    methods: {
        ...mapActions(['setInUseButton', 'removeInUseButton']),
        logout (btn) {
            this.setInUseButton(btn)
            this.$auth.logout().then(res => {
                this.removeInUseButton(btn)
                this.$buefy.notification.open({ duration: 3000, message: res.data.message, position: 'is-bottom-right', type: 'is-primary', hasIcon: true, icon: 'check-circle' })
            }).catch(err => {
                this.removeInUseButton(btn)
                let message = (err.response.data.errors) ? Object.values(err.response.data.errors).join('<br/>') : err.response.data.message
                this.$buefy.notification.open({ duration: 3000, message: message, position: 'is-bottom-right', type: 'is-danger', hasIcon: true, icon: 'alert-circle' })
            })
        }
    },
    computed: {
        ...mapGetters(['getInUseButton'])
    }
}
</script>