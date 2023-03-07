<template>
    <div>
        <figure class="avatar has-text-centered change-avatar">
            <img :src="$auth.user.avatar">
            <div class="change-avatar-overlay" @click="$refs.avatarInput.$el.click()">
              <b-icon icon="camera" size="is-large"></b-icon>
            </div>
            <b-upload v-model="avatar" class="file-label hidden-file-input" ref="avatarInput" @input="avatarModal = true"></b-upload>
        </figure>
        <b-modal :active="avatarModal" :width="400">
            <div class="modal-card" style="width: 400px">
                <header class="modal-card-head">
                    <p class="modal-card-title">Upload Image</p>
                    <button type="button" class="delete" @click="avatarModal = false"/>
                </header>
                <section class="modal-card-body">
                    <cropper class="cropper" ref="cropper" :src="image" :stencil-props="{ aspectRatio: 1/1 }" stencil-component="circle-stencil"></cropper>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="avatarModal = false">Close</button>
                    <button class="button is-primary" @click="uploadImage('avatar-upload-button')" :loading="getInUseButton('avatar-upload-button')" :disabled="getInUseButton('avatar-upload-button')">Upload Image</button>
                </footer>
            </div>
        </b-modal>
    </div>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper'
import { mapActions, mapGetters } from 'vuex'
export default {
    components: {
        Cropper
    },
    data () {
        return {
            avatar: null,
            avatarModal: false
        }
    },
    methods: {
        ...mapActions(['setInUseButton', 'removeInUseButton']),
        uploadImage () {
			const { canvas } = this.$refs.cropper.getResult();
			if (canvas) {
				const form = new FormData();
				canvas.toBlob(blob => {
                    form.append('file', blob);
                    this.$axios.post(`/settings/avatar`, form, {headers: { 'Content-Type': 'multipart/form-data' }}).then(res => {
                        this.$auth.setUser(res.data.data)
                        this.avatarModal = false
                        this.avatar = null
                        this.$buefy.notification.open({ duration: 3000, message: res.data.message, position: 'is-bottom-right', type: 'is-primary', hasIcon: true, icon: 'check-circle' })
                    }).catch(err => {
                        this.avatar = null
                        let message = (err.response.data.errors) ? Object.values(err.response.data.errors).join('<br/>') : err.response.data.message
                        this.$buefy.notification.open({ duration: 3000, message: message, position: 'is-bottom-right', type: 'is-danger', hasIcon: true, icon: 'alert-circle' })
                    })
				}, 'image/jpeg');
			}
		}
    },
    computed: {
        ...mapGetters(['getInUseButton']),
        image () {
            return this.avatar != null && this.avatar != undefined ? URL.createObjectURL(this.avatar) : ''
        }
    },
}
</script>