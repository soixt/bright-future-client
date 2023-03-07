<template>
  <div class="container">
    <div class="columns" style="margin-top:3rem;">
      <div class="column section is-grey fixed-shady is-4 is-offset-4 has-text-centered">
        <div class="is-size-1">{{ error.statusCode }}</div>
        <h1 v-if="error.statusCode === 404">{{ error.message }}</h1>
        <h1 v-else>An error occurred</h1>
        <nuxt-link to="/">Home page</nuxt-link><span v-if="$router.go(-1)"> or <a @click.prevent="$router.go(-1)">Go Back</a></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['error']
  }
</script>