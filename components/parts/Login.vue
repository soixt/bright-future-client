<template>
    <div>
        <Divider>Login</Divider>
        <form style="padding: 0 15px">
            <b-field label="Email">
                <b-input type="email" placeholder="Your email" v-model="loginForm.email" required @keyup.enter="login('login-button')"></b-input>
            </b-field>
            <b-field label="Password">
                <b-input type="password" password-reveal placeholder="Your password" v-model="loginForm.password" required @keyup.enter="login('login-button')"></b-input>
            </b-field>
            <div style="margin: 10px 0;" class="has-text-centered">
                <a @click.prevent="forgotPassword">Forgot password?</a>
            </div>
            <div class="has-text-centered">
                <button class="button is-primary" @click.prevent="login('login-button')" :loading="getInUseButton('llogin-button')" :disabled="getInUseButton('login-button')">Login</button>
            </div>
            <div class="has-text-centered">
                <br>
                <b-button type="is-dark" @click="toggleModal('athleteSignUpModal')">Sign Up Now</b-button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data () {
        return {
            loginForm: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        ...mapActions(['setInUseButton', 'removeInUseButton', 'toggleModal']),
        forgotPassword () {
            this.$buefy.dialog.prompt({
                title: 'Forgot password',
                message: `If you want to <b>reset</b> your password please enter your email.`,
                inputAttrs: {
                    type: 'email',
                    placeholder: 'E-mail',
                },
                trapFocus: true,
                type: 'is-primary',
                hasIcon: true,
                onConfirm: (value) => {
                    this.$axios.post(`/auth/forgot-password`, {email: value}).then(res => {
                        this.$buefy.notification.open({ duration: 5000, message: res.data.message, position: 'is-bottom-right', type: 'is-primary', hasIcon: true, icon: 'check-circle' })
                    }).catch(err => {
                        let message = (err.response.data.errors) ? Object.values(err.response.data.errors).join('<br/>') : err.response.data.message
                        this.$buefy.notification.open({ duration: 3000, message: message, position: 'is-bottom-right', type: 'is-danger', hasIcon: true, icon: 'alert-circle' })
                    })
                }
            })
        },
        login (btn) {
            this.setInUseButton(btn)
            this.$auth.loginWith('local', {
                data: this.loginForm
            }).then(res => {
                this.removeInUseButton(btn)
                this.$buefy.notification.open({ duration: 3000, message: res.data.message, position: 'is-bottom-right', type: 'is-primary', hasIcon: true, icon: 'check-circle' })
            }).catch(err => {
                this.removeInUseButton(btn)
                let message = (err.response.data.errors) ? Object.values(err.response.data.errors).join('<br/>') : err.response.data.message
                this.$buefy.notification.open({ duration: 3000, message: message, position: 'is-bottom-right', type: 'is-danger', hasIcon: true, icon: 'alert-circle' })
            })
        },
    },
    computed: {
        ...mapGetters(['getInUseButton'])
    }
}
</script>