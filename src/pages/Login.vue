<template>
  <q-page padding style="display: flex;
    justify-content: center;
    flex-direction: column;">

    <q-form class="row justify-center items-center" @submit.prevent="handleLogin" style="flex-direction: column;">
      <p class="col-12 text-h4 text-center">Login</p>
      <div class="cold-md-4 col-sm-2 col-xs-10">
        <div class="q-pt-md">
          <q-input rounded outlined label="E-mail" v-model="form.email" />
        </div>
        <div class="q-pt-md">
          <q-input rounded outlined label="Senha" v-model="form.password" type="password" />
        </div>
        <div class="full-width q-pt-md">
          <q-btn label="Entrar" color="primary" class="full-width" type="submit" outline rounded />
        </div>
        <div class="full-width q-pt-md">
          <q-btn label="Cadastrar" color="primary" class="full-width" type="submit" flat rounded to="/register" />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composebles/useAuthUser'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useQuasar, Loading } from 'quasar'

export default defineComponent({
  name: 'LoginPage',

  mounted () {
    const { user } = useAuthUser()
    console.log(user)
  },
  setup () {
    const router = useRouter()
    const store = useStore()
    const $q = useQuasar()

    const showNotif = (message) => {
      $q.notify({
        message: message,
        position: 'center',
        color: 'secondary'
      })
    }
    const showLoading = async () => {
      Loading.show({
        message: 'Carregando algumas <b>informações</b>.<br/><span class="text-amber text-italic">Por favor aguarde...</span>',
        html: true
      })
    }
    const hideLoading = async () => {
      Loading.hide()
    }

    const form = ref({
      email: '',
      password: ''
    })

    function handleLogin () {
      showLoading()
      try {
        store.dispatch('login', form.value)
        setTimeout(() => {
          hideLoading()
          router.push({ name: 'home' })
        }, 2500)
      } catch (error) {
        router.push({ name: 'login' })
      }
    }
    return {
      form,
      handleLogin,
      showNotif,
      showLoading,
      hideLoading
    }
  }
})
</script>
