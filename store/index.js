import { DialogProgrammatic as Dialog, NotificationProgrammatic as Notification } from 'buefy'

export const state = () => ({
    sports: [],
    schools: [],
    athletes: [],
    states: [],
    leagues: [],
    divisions: [],
    sportsScholarshipsMoreInfo: '',
    legalInfo: '',
    creatorStory: '',
    sidebar: false,
    currentUser: null,
    inUseButtons: [],
    activeModals: ''
})
  
export const mutations = {
    setSports (state, sports) {
        state.sports = sports
    },

    setSchools (state, schools) {
        state.schools = schools
    },

    setAthletes (state, athletes) {
        state.athletes = athletes
    },

    setConfigurations (state, config) {
        state.states = config.schoolsInfo.states
        state.divisions = config.schoolsInfo.divisions
        state.leagues = config.schoolsInfo.leagues
        state.sportsScholarshipsMoreInfo = config.sportsScholarshipsMoreInfo
        state.legalInfo = config.legalInfo
        state.creatorStory = config.creatorStory
    },

    setSidebar (state) {
        state.sidebar = !state.sidebar
    },

    setfavorite (state, id) {
        console.log(id)
        state.auth.user.favorites.push(id)
    },

    setunfavorite (state, id) {
        state.auth.user.favorites = state.auth.user.favorites.filter(f => f != id)
    },

    setInUseButton (state, button_id) {
        state.inUseButtons.push(button_id)
    },

    removeInUseButton (state, button_id) {
        state.inUseButtons = state.inUseButtons.filter(btn => btn != button_id)
    },

    toggleModal (state, modal) {
        if (state.activeModals == modal) {
            state.activeModals = ''
        } else {
            state.activeModals = modal
        }
    }
}

export const getters = {
    getSports (state) {
        return state.sports
    },

    getSchools (state) {
        return state.schools
    },

    getAthletes (state) {
        return state.athletes
    },

    getStates (state) {
        return state.states
    },

    getLeagues (state) {
        return state.leagues
    },

    getDivisions (state) {
        return state.divisions
    },

    getSportsScholarshipsMoreInfo (state) {
        return state.sportsScholarshipsMoreInfo
    },

    getLegalInfo (state) {
        return state.legalInfo
    },

    getSidebar (state) {
        return state.sidebar
    },

    getCreatorStory (state) {
        return state.creatorStory
    },

    getInUseButton: (state) => (button_id) => {
        return state.inUseButtons.includes(button_id)
    },

    isModalActive: (state) => (modal) => {
        return state.activeModals == modal
    },

    getModals (state) {
        return state.activeModals
    }
}

export const actions = {
    async nuxtServerInit({ dispatch }, { req }) {
        // await dispatch('getConfigurations')
        // await dispatch('getSports')
        // await dispatch('getSchools')
        // await dispatch('getAthletes')
    },

    async getSports ({ commit }) {
        const { data } = await this.$axios.get(`/sports`)
        commit('setSports', data.data)
    },

    async getSchools ({ commit }) {
        const { data } = await this.$axios.get(`/schools`)
        commit('setSchools', data.data)
    },

    async getConfigurations ({ commit }) {
        const { data } = await this.$axios.get(`/configurations`)
        commit('setConfigurations', data.data)
    },

    async getAthletes ({ commit }) {
        const { data } = await this.$axios.get(`/athletes`)
        commit('setAthletes', data)
    },

    setSidebar ({ commit }) {
        commit('setSidebar')
    },

    favorite ({ commit }, data) {
        commit('setInUseButton', data.btn)
        this.$axios.post(`/athletes/${data.action}/${data.username}`).then(res => {
            commit('removeInUseButton', data.btn)
            commit('set' + data.action, res.data.user_id)
            Notification.open({ duration: 3000, message: res.data.message, position: 'is-bottom-right', type: 'is-primary', hasIcon: true, icon: 'check-circle' })
        }).catch(err => {
            commit('removeInUseButton', data.btn)
            let message = (err.response.data.errors) ? Object.values(err.response.data.errors).join('<br/>') : err.response.data.message
            Notification.open({ duration: 3000, message: message, position: 'is-bottom-right', type: 'is-danger', hasIcon: true, icon: 'alert-circle' })
        })
    },

    sendVerification ({ commit }, btn) {
        commit('setInUseButton', btn)
        this.$axios.post(`/auth/email/resend`).then(res => {
            commit('removeInUseButton', btn)
            Notification.open({ duration: 3000, message: res.data.message, position: 'is-bottom-right', type: 'is-primary', hasIcon: true, icon: 'check-circle' })
        }).catch(err => {
            commit('removeInUseButton', btn)
            let message = (err.response.data.errors) ? Object.values(err.response.data.errors).join('<br/>') : err.response.data.message
            Notification.open({ duration: 3000, message: message, position: 'is-bottom-right', type: 'is-danger', hasIcon: true, icon: 'alert-circle' })
        })
    },

    setInUseButton ({ commit }, button_id) {
        commit('setInUseButton', button_id)
    },

    removeInUseButton ({ commit }, button_id) {
        commit('removeInUseButton', button_id)
    },

    toggleModal ({ commit }, modal) {
        commit('toggleModal', modal)
    },

    passwordConfirmation ({ commit }, data) {
        commit('setInUseButton', data.btn)
        Dialog.prompt({
            title: data.title,
            message: data.message,
            inputAttrs: {
                type: 'password',
                placeholder: 'Current Password',
            },
            trapFocus: true,
            type: 'is-primary',
            hasIcon: true,
            onConfirm: (value) => {
                let options = data.options ? data.options : {}
                options['currentPassword'] = value
                this.$axios.post(data.url, options).then(res => {
                    commit('removeInUseButton', data.btn)
                    this.$auth.setUser(res.data.data)
                    Notification.open({ duration: 3000, message: res.data.message, position: 'is-bottom-right', type: 'is-primary', hasIcon: true, icon: 'check-circle' })
                }).catch(err => {
                    commit('removeInUseButton', data.btn)
                    let message = (err.response.data.errors) ? Object.values(err.response.data.errors).join('<br/>') : err.response.data.message
                    Notification.open({ duration: 3000, message: message, position: 'is-bottom-right', type: 'is-danger', hasIcon: true, icon: 'alert-circle' })
                })
            },
            onCancel: () => {
                commit('removeInUseButton', data.btn)
            }
        })
    }
}