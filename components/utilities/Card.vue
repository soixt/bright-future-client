<template>
  <div class="column">
    <div class="card">
      <div class="card-content">
        <div class="content has-text-centered">
          <img :src="image" :alt="title"/>
          <p class="is-size-3 has-text-grey">{{ title }}</p>
          <p class="is-size-5 has-text-grey">{{ description }}</p>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  }
}
</script>
