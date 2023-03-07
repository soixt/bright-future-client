<template>
    <b-collapse aria-id="contentIdForA11y2" class="card" animation="slide" :open="isOpen">
        <div slot="trigger" slot-scope="props" class="card-header" role="button" aria-controls="contentIdForA11y3">
            <p class="card-header-title">Account Settings</p>
            <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
            </a>
        </div>
        <div class="card-content columns">
            <div class="column">
                <b-field label="Location" expanded v-if="$auth.user.role == 'athlete'">
                    <b-field>
                        <b-input placeholder="Location" icon="map-marker" v-model="settings.location" expanded></b-input>
                    </b-field>
                </b-field>
                <b-field label="Birthday" expanded v-if="$auth.user.role == 'athlete'">
                    <b-field>
                        <b-input placeholder="Birthday" icon="calendar" :value="settings.birthday" disabled expanded></b-input>
                    </b-field>
                </b-field>
                <b-field label="Work website" expanded v-if="$auth.user.role == 'recruiter'">
                    <b-field>
                        <b-input placeholder="Work website" icon="briefcase" v-model="settings.website" expanded></b-input>
                    </b-field>
                </b-field>
                <b-field v-if="$auth.user.role == 'recruiter'">
                    <b-switch v-model="settings.notifyOnNew">Get email when the new athletes sign up</b-switch>
                </b-field>
                <b-field v-if="$auth.user.role == 'recruiter'">
                    <b-switch v-model="settings.notifyOnFavorites">Get email when favorites update profile</b-switch>
                </b-field>
                <b-field v-if="$auth.user.role == 'recruiter'">
                    <b-switch v-model="settings.instantSportFilter">Automatically show athletes with my sports</b-switch>
                </b-field>
                <b-field label="Sport" expanded>
                    <b-field>
                        <multiselect ref="multiselect" v-model="settings.sports" v-if="$auth.user.role == 'recruiter'" :options="getSports" multiple :searchable="false" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick sport" label="name" track-by="id"></multiselect>
                        <b-input placeholder="Sport" :value="$auth.user.sports[0].name" disabled v-if="$auth.user.role == 'athlete'" expanded></b-input>
                    </b-field>
                </b-field>
                <b-field label="Additional Info" v-if="$auth.user.role == 'athlete'">
                    <b-input placeholder="Tell us about yourself" maxlength="200" type="textarea" v-model="settings.about"></b-input>
                </b-field>
                <b-button type="is-primary" class="is-fullwidth" @click="passwordConfirmation({ title: 'Update Account Settings', message: 'If you want to <b>update</b> your account settings please enter your password.', url: '/settings/account', options: settings, btn: 'account-settings-button' })" :loading="getInUseButton('account-settings-button')" :disabled="getInUseButton('account-settings-button')">Update</b-button>
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
                location: '',
                birthday: '',
                website: '',
                notifyOnNew: false,
                notifyOnFavorites: false,
                instantSportFilter: false,
                sports: [],
                about: ''
            }
        }
    },
    methods: {
        ...mapActions(['passwordConfirmation']),
    },
    created () {
        this.settings.location = this.$auth.user.extended.location ?? ''
        this.settings.birthday = this.$auth.user.extended.bday ?? ''
        this.settings.website = this.$auth.user.extended.website ?? ''
        this.settings.notifyOnNew = this.$auth.user.extended.settings && this.$auth.user.extended.settings.notifyOnNew ? this.$auth.user.extended.settings.notifyOnNew : false
        this.settings.notifyOnFavorites = this.$auth.user.extended.settings && this.$auth.user.extended.settings.notifyOnFavorites ? this.$auth.user.extended.settings.notifyOnFavorites : false
        this.settings.instantSportFilter = this.$auth.user.extended.settings && this.$auth.user.extended.settings.instantSportFilter ? this.$auth.user.extended.settings.instantSportFilter : false
        this.settings.sports = this.$auth.user.sports ?? []
        this.settings.about = this.$auth.user.extended.about ?? ''
    },
    computed: {
        ...mapGetters(['getSports', 'getInUseButton'])
    },
}
</script>