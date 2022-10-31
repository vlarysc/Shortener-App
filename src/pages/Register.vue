<template>
    <q-page padding style="display: flex;
    justify-content: center;
    flex-direction: column;">
      <q-form class="row justify-center items-center" @submit.prevent="handleRegister">
        <p class="col-12 text-h4 text-center">Register</p>
        <div class="cold-md-4 col-sm-2 col-xs-10">
          <q-input rounded outlined class="q-pt-md" label="Name" v-model="form.name" />
          <q-input rounded outlined class="q-pt-md" label="Email"  v-model="form.email"/>
          <q-input rounded outlined class="q-pt-md" label="Password" type="password"  v-model="form.password"/>
          <div class="full-width q-pt-md">
            <q-btn label="Register" color="primary" class="full-width" type="submit" outline rounded />
          </div>
          <div class="full-width q-pt-md">
            <q-btn label="Já tenho uma conta" color="primary" class="full-width" type="submit" flat rounded to="/login" />
          </div>
        </div>
      </q-form>
    </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composebles/useAuthUser'
import { useRouter } from 'vue-router'
import { useQuasar, Loading } from 'quasar'

export default defineComponent({
  name: 'RegisterPage',
  setup () {
    const router = useRouter()

    const { register } = useAuthUser()
    const $q = useQuasar()

    const form = ref({
      name: '',
      email: '',
      password: ''
    })

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

    const handleRegister = async () => {
      showLoading()
      try {
        await register(form.value)
        router.push({ name: 'login' })
        setTimeout(() => {
          hideLoading()
        }, 2500)
      } catch (error) {
        showNotif(error)
      }
    }
    return {
      form,
      handleRegister,
      showLoading,
      hideLoading,
      showNotif
    }
  }
})
</script>
