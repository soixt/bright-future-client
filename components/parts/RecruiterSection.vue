<template>
    <div class="section is-grey">
        <div class="container has-text-centered">
            <Divider>Are you a recruiter?</Divider>
            <div class="is-size-5">Want to get notified when the new athletes join our community?</div>
            <br v-if="!$auth.loggedIn">
            <div class="has-text-centered" v-if="!$auth.loggedIn">
                <b-button type="is-info" size="is-medium" @click="toggleModal('recruiterSignUpModal')">Sign Up Now</b-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    methods: {
        ...mapActions(['setInUseButton', 'removeInUseButton', 'toggleModal'])
    },
    computed: {
        ...mapGetters(['getInUseButton', 'isModalActive'])
    },
}
</script>