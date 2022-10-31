
import useAuthUser from 'src/composebles/useAuthUser'
const { login } = useAuthUser()
import { useRouter } from 'vue-router'
const router = useRouter()
export default {
  user: {
  },
  mutations: {
    logins (state, payload) {
      state.user = payload
    }
  },
  actions: {
    login (context, payload) {
      login(payload).then((res) => {
        console.log(res)
        context.commit('logins', res)
      }).catch((err) => {
        router.push({ name: 'login' })
        console.log(err)
      }
      )
    }
  }
}
