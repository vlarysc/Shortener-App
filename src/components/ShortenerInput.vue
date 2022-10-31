<template>

  <q-input outlined v-model="form.url" @keydown.enter="newLink" label-slot>
    <template v-slot:prepend>
      <q-avatar>
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" bg-deep-orange text-white >
          <path
            d="M14.851 11.923c-.179-.641-.521-1.246-1.025-1.749-1.562-1.562-4.095-1.563-5.657 0l-4.998 4.998c-1.562 1.563-1.563 4.095 0 5.657 1.562 1.563 4.096 1.561 5.656 0l3.842-3.841.333.009c.404 0 .802-.04 1.189-.117l-4.657 4.656c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-1.952-1.951-1.952-5.12 0-7.071l4.998-4.998c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464.493.493.861 1.063 1.105 1.672l-.787.784zm-5.703.147c.178.643.521 1.25 1.026 1.756 1.562 1.563 4.096 1.561 5.656 0l4.999-4.998c1.563-1.562 1.563-4.095 0-5.657-1.562-1.562-4.095-1.563-5.657 0l-3.841 3.841-.333-.009c-.404 0-.802.04-1.189.117l4.656-4.656c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464 1.951 1.951 1.951 5.119 0 7.071l-4.999 4.998c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-.494-.495-.863-1.067-1.107-1.678l.788-.785z" />
        </svg>
      </q-avatar>
    </template>

    <template v-slot:label>
      Cole aqui sua  <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders">URL</span>
    </template>

    <template v-slot:append>
      <q-btn round dense flat icon="send"  @click.prevent="newLink"  />
    </template>
  </q-input>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ShortenerInput',
  emit: ['postLink'],
  setup (props, { emit }) {
    const store = useStore()
    const userId = computed(() => {
      if (store.state.data !== undefined) {
        return store.state.user.user.data.id
      } else {
        return null
      }
    })
    const form = ref({
      url: '',
      uuid: userId
    })
    const newLink = () => {
      try {
        emit('postLink', form.value)
      } catch (error) {
        throw new Error(error)
      }
    }

    return {
      newLink,
      form

    }
  }

}
</script>

<style>

</style>
