<template></template>

<script>
export default {
  middleware: ['auth'],
  async asyncData({ $axios, redirect, route, error }) {
    try {
      await $axios.$get(`/auth/email/verify/${route.params.id}/${route.params.slug}?expires=${route.query.expires}&signature=${route.query.signature}`)
      redirect({ name: 'index' })
    } catch (e) {
      error({ statusCode: 404, message: 'Activation link is wrong.' })
    }
  },
  head() {
    return {
      title: 'Activation - Bright Future'
    }
  },
}
</script>
