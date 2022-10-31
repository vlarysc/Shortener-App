<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <div>
        <ShortenerInput class="q-pb-md"  @postLink="postLink"  style="min-width: 900px"/>
        <div class="short-url">
          <div class="row justify-center items-center q-pa-md" v-show="link.shortUrl">
            <span class="col-3 text-deep-orange cursor-pointer" > <a class="href" :href= 'link.shortUrl'> {{ link.shortUrl }}</a> </span>
            <q-btn class="col-1 bg-deep-orange text-white" icon="link" @click="copyLink(link.code)"></q-btn>
          </div>
        </div>
        <ShortenerTable :links="links" @copyLink="copyLink" @removeLink="removeLink" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useQuasar, Loading } from 'quasar'
import useAuthUser from 'src/composebles/useAuthUser'
import ShortenerInput from 'src/components/ShortenerInput.vue'
import ShortenerTable from 'src/components/ShortenerTable.vue'
import linkService from 'src/services/links'

export default defineComponent({
  name: 'Home',
  components: { ShortenerInput, ShortenerTable },
  setup () {
    const { user } = useAuthUser()
    const { get, del, post } = linkService()

    const links = ref([])
    const link = ref([])
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

    const postLink = async (form) => {
      try {
        showLoading()
        link.value = await post(form)
        await getData().then(() => {
          hideLoading()
          showNotif('Link criado com sucesso!')
        })
      } catch (error) {
        throw new Error(error)
      }
    }

    const getData = async () => {
      try {
        const data = await get()
        links.value = data
      } catch (error) {
        throw new Error(error)
      }
    }
    const removeLink = async (id) => {
      showLoading()
      try {
        await del(id)
        await getData().then(() => {
          hideLoading()
          showNotif('Link criado com sucesso!')
        })
      } catch (error) {
        hideLoading()
        showNotif('Certifique-se de que está logado e/ou que esse link pertence a você')
      }
    }
    const copyLink = async (id) => {
      showNotif('Link copiado com sucesso!')
      try {
        navigator.clipboard.writeText(`http://localhost:3000/${id}`)
      } catch (error) {
        throw new Error(error)
      }
    }
    onMounted(() => {
      getData()
    })
    return {
      user,
      filter: ref(''),
      links,
      copyLink,
      removeLink,
      postLink,
      link,
      showLoading,
      showNotif
    }
  }

})
</script>
