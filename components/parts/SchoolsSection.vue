<template>
    <div class="section">
      <div class="container">
        <p class="title has-text-centered has-text-grey">Schools</p>
        <p class="subtitle has-text-centered has-text-grey">Check is your favorite school on our list</p>
        <div class="columns is-multiline">
          <div class="column is-4">
            <div class="section is-grey fixed-shady">
              <div class="subtitle has-text-centered">Search</div>
              <b-field>
                <b-input placeholder="School Name" v-model="name" expanded></b-input>
              </b-field>
              <b-field>
                <multiselect ref="multiselect" v-model="states" :options="getStates" multiple placeholder="Pick A State"></multiselect>
              </b-field>
              <b-field>
                <multiselect ref="multiselect" v-model="leagues" :options="getLeagues" multiple placeholder="Pick A League"></multiselect>
              </b-field>
              <b-field>
                <multiselect ref="multiselect" v-model="divisions" :options="getDivisions" multiple placeholder="Pick A Division"></multiselect>
              </b-field>
              <b-field>
                <multiselect ref="multiselect" v-model="sports" :options="getSports" placeholder="Pick sport" multiple :searchable="false" :clear-on-select="false" :preserve-search="true" label="name" track-by="id"></multiselect>
              </b-field>
            </div>
          </div>
          <div class="column is-8">
            <div class="section is-grey fixed-shady">
              <b-table :data="schools" :columns="columns" default-sort="name" mobile-cards paginated :per-page="5" :current-page="1"></b-table>
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
            states: [],
            leagues: [],
            divisions: [],
            sports: [],
            columns: [
                { field: 'name', label: 'School Name', sortable: true},
                { field: 'state', label: 'State', sortable: true},
                { field: 'league', label: 'League', sortable: true},
                { field: 'division', label: 'Division', sortable: true},
            ]
        }
    },
    computed: {
        ...mapGetters(['getSchools', 'getSports', 'getStates', 'getLeagues', 'getDivisions']),
        schools () {
            let schools = this.getSchools;
            if (this.name != '') {
                schools = schools.filter(school => school.name.toLowerCase().includes(this.name.toLowerCase()))
            }
            if (this.states.length) {
                schools = schools.filter(school => this.states.includes(school.state))
            }
            if (this.leagues.length) {
                schools = schools.filter(school => this.leagues.includes(school.league))
            }
            if (this.divisions.length) {
                schools = schools.filter(school => this.divisions.includes(school.division))
            }
            if (this.sports.length) {
                schools = schools.filter(school => this.sports.some(sport => Object.keys(school.sports).map(val => school.sports[val].id).includes(sport.id)))
            }
            return schools;
        }
    },
}
</script>