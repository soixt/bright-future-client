<template>
    <div class="section is-grey">
        <div class="container has-text-centered">
            <Divider>What are we?</Divider>
            <div class="is-size-5">Bright Future is an online service that helps athletes present their profile to hundreds of schools coaches in less than few minutes.</div>
            <br v-if="!$auth.loggedIn">
            <div class="has-text-centered" v-if="!$auth.loggedIn">
                <b-button type="is-info" size="is-medium" @click="toggleModal('athleteSignUpModal')">Sign Up Now</b-button>
            </div>
        </div>
        <b-modal :active="isModalActive('athleteSignUpModal')" :width="640" v-if="!$auth.loggedIn">
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Athlete Sign Up
                        <b-button @click="toggleModal('recruiterSignUpModal')" type="is-primary" size="small" style="float:right;margin-right:10px;">Recruiter sign up</b-button>
                    </p>
                    <button type="button" class="delete" @click="toggleModal('')"/>
                </header>
                <section class="modal-card-body">
                    <b-field label="Full Name">
                        <b-input placeholder="Full Name" icon="draw" v-model="athleteSignUpForm.name"></b-input>
                    </b-field>
                    <b-field label="E-mail">
                        <b-input placeholder="E-mail" type="email" icon="at" v-model="athleteSignUpForm.email"></b-input>
                    </b-field>
                    <b-field label="Password">
                        <b-input placeholder="Password" type="password" password-reveal icon="lock" v-model="athleteSignUpForm.password"></b-input>
                    </b-field>
                    <client-only>
                        <b-field label="Select a birthday">
                            <b-datepicker placeholder="Click to select" icon="calendar-today" v-model="athleteSignUpForm.bday" trap-focus></b-datepicker>
                        </b-field>
                    </client-only>
                    <b-field label="Gender">
                        <b-select placeholder="Select your gender" icon="gender-male-female-variant" expanded v-model="athleteSignUpForm.gender">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </b-select>
                    </b-field>
                    <b-field label="Location">
                        <b-input placeholder="Location" icon="map-marker" v-model="athleteSignUpForm.location"></b-input>
                    </b-field>
                    <b-field label="Sport">
                        <multiselect v-model="athleteSignUpForm.sports" :options="getSports" :searchable="false" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick sport" label="name" track-by="id"></multiselect>
                    </b-field>
                    <div class="has-text-centered">
                        By signing up you are accepting our legal terms.<br>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="toggleModal('')">Close</button>
                    <button class="button is-primary" @click="athleteSignUp('athlete-signup-button')" :loading="getInUseButton('athlete-signup-button')" :disabled="getInUseButton('athlete-signup-button')">Sign Up</button>
                </footer>
            </div>
        </b-modal>
        <b-modal :active="isModalActive('recruiterSignUpModal')" :width="640" v-if="!$auth.loggedIn">
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Recruiter Sign Up
                        <b-button @click="toggleModal('athleteSignUpModal')" type="is-primary" style="float:right;margin-right:10px;" size="small">Athlete sign up</b-button>
                    </p>
                    <button type="button" class="delete" @click="toggleModal('')"/>
                </header>
                <section class="modal-card-body">
                    <b-field label="Full Name">
                        <b-input placeholder="Full Name" icon="draw" v-model="recruiterSignUpForm.name"></b-input>
                    </b-field>
                    <b-field label="E-mail">
                        <b-input placeholder="E-mail" type="email" icon="at" v-model="recruiterSignUpForm.email"></b-input>
                    </b-field>
                    <b-field label="Password">
                        <b-input placeholder="Password" type="password" password-reveal icon="lock" v-model="recruiterSignUpForm.password"></b-input>
                    </b-field>
                    <b-field label="Work website">
                        <b-input placeholder="Work website" icon="briefcase" v-model="recruiterSignUpForm.website"></b-input>
                    </b-field>
                    <b-field label="Sport">
                        <multiselect v-model="recruiterSignUpForm.sports" :options="getSports" :searchable="false" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick sport" label="name" track-by="id"></multiselect>
                    </b-field>
                    <div class="has-text-centered">
                        By signing up you are accepting our legal terms.<br>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="toggleModal('')">Close</button>
                    <button class="button is-primary" @click="recruiterSignUp('recruiter-signup-button')" :loading="getInUseButton('recruiter-signup-button')" :disabled="getInUseButton('recruiter-signup-button')">Sign Up</button>
                </footer>
            </div>
        </b-modal>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data () {
        return {
            athleteSignUpForm: {
                name: '',
                email: '',
                password: '',
                bday: null,
                gender: '',
                location: '',
                sports: []
            },
            recruiterSignUpForm: {
                name: '',
                email: '',
                password: '',
                website: '',
                sports: []
            }
        }
    },
    methods: {
        ...mapActions(['setInUseButton', 'removeInUseButton', 'toggleModal']),
        athleteSignUp (btn) {
            this.$axios.post(`/auth/signup/athlete`, this.athleteSignUpForm).then(res => {
                this.setInUseButton(btn)
                this.$buefy.notification.open({ duration: 3000, message: res.data.message, position: 'is-bottom-right', type: 'is-primary', hasIcon: true, icon: 'check-circle' })
                this.$auth.loginWith('local', { data: this.athleteSignUpForm }).then(res => {
                    this.$buefy.notification.open({ duration: 3000, message: res.data.message, position: 'is-bottom-right', type: 'is-primary', hasIcon: true, icon: 'check-circle' })
                }).catch(err => {
                    this.removeInUseButton(btn)
                    let message = (err.response.data.errors) ? Object.values(err.response.data.errors).join('<br/>') : err.response.data.message
                    this.$buefy.notification.open({ duration: 3000, message: message, position: 'is-bottom-right', type: 'is-danger', hasIcon: true, icon: 'alert-circle' })
                })
            }).catch(err => {
                this.removeInUseButton(btn)
                let message = (err.response.data.errors) ? Object.values(err.response.data.errors).join('<br/>') : err.response.data.message
                this.$buefy.notification.open({ duration: 3000, message: message, position: 'is-bottom-right', type: 'is-danger', hasIcon: true, icon: 'alert-circle' })
            })
        },
        recruiterSignUp (btn) {
            this.setInUseButton(btn)
            this.$axios.post(`/auth/signup/recruiter`, this.recruiterSignUpForm).then(res => {
                this.$buefy.notification.open({ duration: 3000, message: res.data.message, position: 'is-bottom-right', type: 'is-primary', hasIcon: true, icon: 'check-circle' })
                this.$auth.loginWith('local', { data: this.recruiterSignUpForm }).then(res => {
                    this.removeInUseButton(btn)
                    this.$buefy.notification.open({ duration: 3000, message: res.data.message, position: 'is-bottom-right', type: 'is-primary', hasIcon: true, icon: 'check-circle' })
                }).catch(err => {
                    this.removeInUseButton(btn)
                    let message = (err.response.data.errors) ? Object.values(err.response.data.errors).join('<br/>') : err.response.data.message
                    this.$buefy.notification.open({ duration: 3000, message: message, position: 'is-bottom-right', type: 'is-danger', hasIcon: true, icon: 'alert-circle' })
                })
            }).catch(err => {
                this.removeInUseButton(btn)
                let message = (err.response.data.errors) ? Object.values(err.response.data.errors).join('<br/>') : err.response.data.message
                this.$buefy.notification.open({ duration: 3000, message: message, position: 'is-bottom-right', type: 'is-danger', hasIcon: true, icon: 'alert-circle' })
            })
        }
    },
    computed: {
        ...mapGetters(['getSports', 'getInUseButton', 'isModalActive'])
    },
}
</script>