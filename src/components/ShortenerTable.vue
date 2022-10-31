<template>
  <q-table title="Links" :rows="links" :columns="columns" row-key="name" :filter="filter" style="flex-wrap: wrap" :pagination="pagination">
    <template v-slot:top-right>
      <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template v-slot:body-cell-options="props">
      <q-td :props="props">
        <q-btn class="q-mr-xs" size="sm" color="negative" icon="delete" dense @click="remove(props.row.code)"/>
        <q-btn class="bg-deep-orange text-white" size="sm"  icon="link" dense @click="copy(props.row.code)"/>
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ShortenerTable',
  props: ['links', 'copyLink'],
  emit: ['copyLink', 'removeLink'],
  setup (props, { emit }) {
    const pagination = {
      sortBy: 'hits',
      descending: true,
      page: 2,
      rowsPerPage: 3
    }
    const columns = [
      { name: 'nameUrl', align: 'center', label: 'Site', field: row => row.nameUrl[0].toUpperCase() + row.nameUrl.substring(1) },
      { name: 'shortUrl', align: 'center', label: 'URL', field: 'shortUrl' },
      { name: 'hits', align: 'center', label: 'Views', field: 'hits', sortable: true },
      { name: 'options', label: 'Opções', field: 'options', align: 'center' }
    ]
    const copy = (id) => {
      try {
        emit('copyLink', id)
      } catch (error) {
        throw new Error(error)
      }
    }
    const remove = (id) => {
      try {
        emit('removeLink', id)
      } catch (error) {
        throw new Error(error)
      }
    }
    return {
      filter: ref(''),
      columns,
      copy,
      remove,
      pagination
    }
  }
}
</script>

<style>

</style>
