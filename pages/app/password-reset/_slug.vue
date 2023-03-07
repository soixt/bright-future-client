<template>
  <div class="container">
    <Divider>Password Reset Form</Divider>
    <div class="columns section is-grey fixed-shady">
      <div class="column is-4 is-offset-4">
          <b-field label="E-mail">
            <b-input placeholder="E-mail" type="email" icon="at" v-model="resetPasswordForm.email" required></b-input>
          </b-field>
          <b-field label="New Password">
            <b-input placeholder="New Password" type="password" password-reveal icon="lock" v-model="resetPasswordForm.password" required></b-input>
          </b-field>
          <b-field label="New Password Again">
            <b-input placeholder="New Password Again" type="password" password-reveal icon="lock" v-model="resetPasswordForm.password_confirmation" required></b-input>
          </b-field>
          <b-field class="has-text-centered empty-label" label=".">
            <b-button type="is-primary" @click="resetPassword('reset-password-button')" :loading="getInUseButton('reset-password-button')" :disabled="getInUseButton('reset-password-button')">>Reset Password</b-button>
          </b-field>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  middleware: ['auth'],
  auth: 'guest',
  scrollToTop: true,
  data () {
    return {
      resetPasswordForm: {
        email: '',
        password: '',
        password_confirmation: '',
        token: this.$route.params.slug
      }
    }
  },
  computed: {
    ...mapGetters(['getInUseButton'])
  },
  methods: {
    ...mapActions(['setInUseButton', 'removeInUseButton']),
    resetPassword (btn) {
      this.setInUseButton(btn)
      this.$axios.post(`/auth/reset-password`, this.resetPasswordForm).then(res => {
        this.removeInUseButton(btn)
        this.$router.push({name:'index'});
        this.$buefy.notification.open({ duration: 3000, message: res.data.message, position: 'is-bottom-right', type: 'is-primary', hasIcon: true, icon: 'check-circle' })
      }).catch(err => {
        this.removeInUseButton(btn)
        let message = (err.response.data.errors) ? Object.values(err.response.data.errors).join('<br/>') : err.response.data.message
        this.$buefy.notification.open({ duration: 3000, message: message, position: 'is-bottom-right', type: 'is-danger', hasIcon: true, icon: 'alert-circle' })
      })
    }
  },
  head() {
    return {
      title: 'Password Reset - Bright Future'
    }
  },
  mounted(){
    if(process.client){
      window.scrollTo(0, 0);
    }
  }
}
</script>
