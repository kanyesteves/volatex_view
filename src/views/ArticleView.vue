<template>
  <div class="article">
    <GlobalToolbar />

    <div :class="$style.container">
      <GlobalStaticMenu
        :class="$style.sidebar" />

      <ToolbarArticle
        :class="$style.toolbar_article"
        v-model="setVisibleToolbar"
        @onNewArticle="onNewArticle" 
        @onEditArticle="onEditArticle" 
        @onRemoveArticle="onRemoveArticle" />

      <Card :class="$style.mainContent" class="article">
        <template #content>
          <ListArticle
            :class="$style.list_article"
            @selected="rowSelected" 
            @unselected="rowUnSelected" />
        </template>
      </Card>
    </div>
  
    <SaveArticle
      v-model="new_article" />
  
    <UpdateArticle 
      v-model="edit_article" 
      :article="article_selected"
      @selectrestore="selectRestore"  />
  
    <DeleteArticle
      v-model="remove_article"
      :article="article_selected"
      @selectrestore="selectRestore"  />

  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Card from 'primevue/card';
import { debounce } from 'lodash'
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import GlobalStaticMenu from '@/global/components/GlobalStaticMenu.vue';
import ToolbarArticle from '@/system/pages/article/ToolbarArticle.vue';
import ListArticle from '@/system/pages/article/ListArticle.vue';
import SaveArticle from '@/system/pages/article/SaveArticle.vue';
import UpdateArticle from '@/system/pages/article/UpdateArticle.vue';
import DeleteArticle from '@/system/pages/article/DeleteArticle.vue';
import articleService from '@/system/services/articleService';
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

const article_selected = ref({
  id: '',
  name: '',
  description: '',
})

const setVisibleToolbar = ref([])

const rowSelected = (event) => {
  article_selected.value.id = event.data.id
  article_selected.value.name = event.data.name
  setVisibleToolbar.value.push(event.data.id)
}

const rowUnSelected = (event) => {
  const index = setVisibleToolbar.value.indexOf(event.data.id);
  setVisibleToolbar.value.splice(index, 1)
}

const selectRestore = (event) => {
  setVisibleToolbar.value = event
}

const new_article = ref(false)
const onNewArticle = () => {
  new_article.value = true
}

const edit_article = ref(false)
const onEditArticle = () => {
  getArticleById()
  edit_article.value = true
}

const remove_article = ref(false)
const onRemoveArticle = () => {
  remove_article.value = true
}

const getArticleById = debounce(async () => {
  await articleService.get(article_selected.value.id).then(async (response) => {
    if (response.status == 200) {
      article_selected.value.id = response.data.id
      article_selected.value.name = response.data.name
      article_selected.value.description = response.data.description
    }
  });
});


</script>

<style module>
.container {
  display: flex;
  margin-top: 7rem;
  height: calc(100% - 3rem);
}

.toolbar_artcle {
  height: auto;
  flex-shrink: 0;
}

.list_artcle {
  flex-grow: 1;
  overflow-y: auto;
}

.sidebar {
  width: 260px;
  background-color: #f5f5f5;
}

.mainContent {
  border-radius: 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
}

</style>