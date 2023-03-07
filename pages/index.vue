<template>
  <div>
    <div class="section has-background-image">
      <div style="position: absolute; width: 100%; height: 100%; top: 0;">
        <client-only>
          <vue-particles color="#fff" :particlesNumber="80" shapeType="circle" :particleSize="4"
            linesColor="#fff" :linesWidth="1" :lineLinked="true" :linesDistance="150" :moveSpeed="4"
            :hoverEffect="true" hoverMode="grab" width="auto"></vue-particles>
        </client-only>
      </div>
      <div class="container has-text-centered" style="padding: 5rem 0;">
        <h1 class="title has-text-white">The BEST place in the world for finding your sport scholarship</h1>
      </div>
    </div>
    <AthleteSignUp/>
    <AthletesSection/>
    <RecruiterSection/>
    <div class="section">
      <div class="container has-text-centered">
          <div class="columns is-vcentered is-multiline">
              <div class="column is-6">
                  <h1 class="title is-2">
                      Sports Scholarships
                  </h1>
                  <br>
                  <h2 class="subtitle is-4">
                    An sports scholarship is a form of scholarship to attend a college or university or a private high school awarded to an individual based predominantly on his or her ability to play in a sport.
                  </h2>
                  <br>
                  <div class="has-text-centered">
                      <b-button type="is-info" size="is-medium" @click="sportsScholarshipsMoreInfo">Read More</b-button>
                  </div>
              </div>
              <div class="column is-6" id="ss">
                  <figure class="image">
                      <img src="/sport1.jpg" alt="Sport Scholarship">
                  </figure>
              </div>
          </div>
      </div>
    </div>
    <div class="section is-grey">
      <div class="container has-text-centered">
          <div class="columns is-vcentered is-multiline">
              <div class="column is-6">
                  <figure class="image">
                      <img src="/ja.png" alt="Creator Story">
                  </figure>
              </div>
              <div class="column is-6">
                  <h1 class="title is-2">
                      Creator Story
                  </h1>
                  <br>
                  <div class="has-text-centered">
                    <div v-html="getCreatorStory"></div>
                    <br>
                    <div class="has-text-centered">
                      <b-button type="is-info" @click="readLegalInfo">Read Legal Info</b-button>
                    </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
    <SchoolsSection/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  scrollToTop: true,
  methods: {
    sportsScholarshipsMoreInfo () {
      this.$buefy.dialog.alert({
        title: 'Sports Scholarships',
        message: this.getSportsScholarshipsMoreInfo,
        confirmText: 'Close'
      })
    },
    readLegalInfo () {
      this.$buefy.dialog.alert({
        title: 'Legal info',
        message: this.getLegalInfo,
        confirmText: 'Close'
      })
    }
  },
  computed: {
    ...mapGetters(['getSportsScholarshipsMoreInfo', 'getLegalInfo', 'getCreatorStory'])
  },
  mounted(){
    if(process.client){
      window.scrollTo(0, 0);
    }
  }
}
</script>
