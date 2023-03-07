<template></template>

<script>
export default {
  async asyncData({ $axios, redirect, route, error }) {
    try {
      await $axios.$post(`/stop-emails`, { hash: route.params.slug })
      redirect({ name: 'index' })
    } catch (e) {
      error({ statusCode: 404, message: 'Something went wrong.' })
    }
  },
  head() {
    return {
      title: 'Stop Emails - Bright Future'
    }
  },
}
</script>

