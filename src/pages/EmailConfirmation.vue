<template>
  <q-page padding>
    <p class="col-12 text-h4 text-center">Obrigado Por se cadastrar!</p>
    <p class="col-12 text-h4 text-center">Por favor confirme seu email para finalizar seu cadastro</p>
    <p class="col-12 text-h4 text-center">Email: <strong>{{ $route.query.email }}</strong></p>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmailConfirmation'

})
</script>
