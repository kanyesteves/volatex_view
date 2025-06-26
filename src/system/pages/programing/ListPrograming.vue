<template>
  <div class="card">

    <Card :class="$style.card_list" v-for="programming in programings" :key="programming.id">
      <template #title>
        <div :class="$style.card_title">
            {{programming.tear}} - {{ programming.name }}
          <Button 
            v-tooltip.bottom="'Remover'"
            icon="pi pi-trash"
            severity="danger"
            :style="{'width': '30px', 'height': '30px'}"
            @click="onOnRemovePrograming(programming)"></Button>
        </div>
      </template>

      <template #content>
        <div :class="$style.card_content">
          <div v-if="programming.rpm && programming.efficiency" :class="$style.card_content_body">
            <p><b>RPM: </b>{{ programming.rpm }}</p>
            <p><b>Eficiência: </b>{{ programming.efficiency }} %</p>
          </div>
          <div v-if="programming.weight_daily && programming.days_for_done" :class="$style.card_content_body">
            <p><b>Peso por dia: </b>{{ programming.weight_daily }} kg</p>
            <p><b>Peso por dia: </b>{{ programming.days_for_done }} dias</p>
          </div>
        </div>
      </template>

      <template #footer>
        <div v-if="programming.date_start || programming.date_end" :class="$style.card_footer">
          <i>{{ programming.date_start + ' - ' + programming.date_end }}</i>
        </div>
      </template>
    </Card>

  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineEmits, watch } from 'vue'
import Card from 'primevue/card';
import { debounce } from 'lodash';
import Button from 'primevue/button';
import Message from 'primevue/message';
import programingService from '@/system/services/programingService';
import { useRefreshTable } from '@/global/storages/refreshTableStore';

const emit = defineEmits(['onRemovePrograming'])
const use_refresh_table = useRefreshTable()

onMounted(() => {
  onLoadPrograming()
})

const programingSelected = ref();
const programings = ref([]);
const refresh = ref(false)

const onOnRemovePrograming = (event) => {
  emit('onRemovePrograming', event)
};

watch(() => use_refresh_table.getRefresh(), (newValue) => {
  refresh.value = newValue
  onLoadPrograming()
})

const onLoadPrograming = debounce(async () => {
  await programingService.getAll().then((response) => {
    if (response.status === 200) {
      programings.value = response.data
      programingSelected.value = null

      setTimeout(() => {
        use_refresh_table.setRefresh(false)
        refresh.value = false
      }, 500)

      programings.value.forEach((ele) => {

        if (ele.tear != null) {
          ele.tear = ele.tear.map(item => item.name).join(', ');
        }

        if (ele.op != null) {
          ele.op = ele.op.map(item => item.code).join(', ');
        }

      })
    }
  })
});

</script>

<style lang="scss" module>

.card_list {
  display: flex;
  margin-top: 1rem;
  border: 1px solid #e0e0e0;
  color: #46494e;
}

.card_title {
  display: flex;
  justify-content: space-between;
}

.card_content {
  display: flex;
  align-items: center;
  
  
  .card_content_body {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-right: 15rem;

    p {
     margin: 5px; 
    }
  }
}

.card_footer {
  display: flex;
  justify-content: center;
}
</style>