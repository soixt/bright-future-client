<template>
    <div class="section" v-if="getAthletes.data.length">
      <div class="container">
        <Divider>Our Athletes</Divider>
        <div class="columns is-multiline">
          <div class="column is-4">
            <div class="section is-grey fixed-shady smt5">
              <div class="subtitle has-text-centered">Search Athletes</div>
              <b-field>
                <multiselect ref="multiselect" v-model="sports" :options="getSports" placeholder="Pick sport" multiple :searchable="false" :clear-on-select="false" :preserve-search="true" label="name" track-by="id"></multiselect>
              </b-field>
              <b-field>
                <b-input placeholder="Name" v-model="name" icon="draw" expanded></b-input>
              </b-field>
              <b-field>
                <b-input placeholder="Location" v-model="location" icon="map-marker" expanded></b-input>
              </b-field>
              <b-field v-if="$auth.loggedIn && $auth.user.role == 'recruiter'">
                <b-switch v-model="favorites">Show favorites only</b-switch>
              </b-field>
              <b-field>
                <b-select placeholder="Athletes per page" icon="account-box-multiple" expanded v-model="perPage">
                  <option :value="2">2 per page</option>
                  <option :value="10">10 per page</option>
                  <option :value="25">25 per page</option>
                  <option :value="50">50 per page</option>
                </b-select>
              </b-field>
              <b-pagination
                :total="athletes.length"
                :range-before="5"
                :range-after="3"
                :current.sync="currentPage"
                order="is-centered"
                :per-page="perPage"
                icon-prev="chevron-left"
                icon-next="chevron-right"
                aria-next-label="Next page"
                aria-previous-label="Previous page"
                aria-page-label="Page"
                aria-current-label="Current page">
            </b-pagination>
            </div>
          </div>
          <div class="column is-8">
            <div class="columns features is-multiline">
              <div class="column is-6" v-for="(athlete, i) in athletesPaginated" :key="i">
                <UserBlock :user="$auth.loggedIn && athlete.id == $auth.user.id ? $auth.user : athlete" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            name: '',
            sports: [],
            location: '',
            favorites: false,
            bday: null,
            perPage: 2,
            currentPage: 1
        }
    },
    mounted() {
      if (this.$auth.loggedIn && this.$auth.user.role == 'recruiter' && this.$auth.user.extended.settings.instantSportFilter) {
        this.sports = [...this.$auth.user.sports]
      }
    },
    computed: {
        ...mapGetters(['getAthletes', 'getSports']),
        athletes () {
            let athletes = this.getAthletes.data

            if (this.favorites) {
                athletes = athletes.filter(athlete => this.$auth.user.favorites.includes(athlete.id))
            }

            if (this.name != '') {
                athletes = athletes.filter(athlete => athlete.name.toLowerCase().includes(this.name.toLowerCase()))
            }

            if (this.location != '') {
                athletes = athletes.filter(athlete => athlete.extended.location.toLowerCase().includes(this.location.toLowerCase()))
            }

            if (this.sports.length) {
                athletes = athletes.filter(athlete => this.sports.some(sport => Object.keys(athlete.sports).map(val => athlete.sports[val].id).includes(sport.id)))
            }

            return athletes
        },
        athletesPaginated () {
            return this.athletes.filter((athlete, i) => {
                return (i + 1) <= (this.currentPage * this.perPage) && (i + 1) > ((this.currentPage - 1) * this.perPage)
            })
        }
    },
}
</script>