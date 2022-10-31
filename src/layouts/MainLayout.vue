<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
          Shortener App
        </q-toolbar-title>

<div class="row no-wrap q-pa-md" style="display: flex; align-items: center">
          <q-avatar size="30px" class="q-mr-sm" v-show="teste">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          <div class="text-subtitle1 q-sm-md" v-show="teste">{{ teste }}</div>
          <q-btn flat class="text-white" label="Entrar" to="/login" v-show="!teste"/>
          <q-btn flat class="text-white" label="Sair" @click.prevent="handleLogout" v-show="teste"/>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useStore } from 'vuex'
import { defineComponent, ref, computed } from 'vue'
import useAuthUser from 'src/composebles/useAuthUser'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'MainLayout',

  setup () {
    const userId = computed(() => {
      if (store.state.user.user !== undefined) {
        return store.state.user.user.data.nome
      } else {
        return null
      }
    })
    const teste = ref(userId)
    const store = useStore()
    const leftDrawerOpen = ref(false)

    const router = useRouter()

    const { logout, user } = useAuthUser()

    const $q = useQuasar()

    const handleLogout = async () => {
      console.log(user)
      $q.dialog({
        title: 'Sair',
        message: 'Tem certeza que deseja sair?',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        await logout()
        router.replace({ name: 'login' })
      })
    }

    return {
      handleLogout,
      leftDrawerOpen,
      userId,
      teste
    }
  }
})
</script>
