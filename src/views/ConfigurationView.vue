<template>
  <div class="configuration">
    <GlobalToolbar />

    <div :class="$style.container">
      <GlobalStaticMenu
        :class="$style.sidebar" />

      <Card :class="$style.mainContent" class="card">
        <template #content>
          <h2>Configurações do Sistema</h2>
          <Accordion >
            <AccordionPanel value="0">
                <AccordionHeader><i v-tooltip.bottom="'Essa sessão é para adicionar a logotipo que será inserida quando for exportar o faturamento dos rolos'" class="pi pi-info-circle"></i> Logotipo da empresa</AccordionHeader>
                <AccordionContent>
                  <FileUpload name="file" url="/configurations/upload" :multiple="true" accept="image/*" :maxFileSize="1000000">
                    <template #empty>
                        <span>Arraste e solte a logo aqui.</span>
                    </template>
                  </FileUpload>

                  <div v-if="logoUrl">
                    <img :src="logoUrl" alt="Logotipo da empresa" style="max-width: 200px;" />
                  </div>
                </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </template>
      </Card>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Card from 'primevue/card';
import Accordion from 'primevue/accordion';
import FileUpload from 'primevue/fileupload';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import GlobalStaticMenu from '@/global/components/GlobalStaticMenu.vue';

import { useMenuStore } from '@/global/storages/authStorage';
import router from '@/router';

const menuStore = useMenuStore();
const items_config = menuStore.items_config
onMounted(() => {
  validMenu()
})

const validMenu = () => {
  items_config.forEach((section) => {
    if (section.items.length == 1) {

      section.items.forEach(element => {
        if (element.label == "Produção") {

          router.push('/production')

        }
      });

    }
  })
}

const logoUrl = ref(null);

// onMounted(() => {
//   getFile()
// })

// const getFile = () => {

// }

</script>

<style module>
.container {
  display: flex;
}

.sidebar {
  margin-top: 1rem;
  width: var(--sidebar-width);
  transition: width 0.2s ease;
  background-color: #f5f5f5;
}

.mainContent {
  margin-top: 1rem;
  flex-grow: 1;
  margin-left: 10px;
}

</style>