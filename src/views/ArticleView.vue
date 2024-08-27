<template>
  <GlobalToolbar />
  <div class="article">
    <ToolbarArticle
      v-model="setVisibleToolbar"
      @onNewArticle="onNewArticle" 
      @onEditArticle="onEditArticle" 
      @onRemoveArticle="onRemoveArticle" />

    <ListArticle
      @selected="rowSelected" 
      @unselected="rowUnSelected" />
  </div>

  <SaveArticle
    v-model="new_article" />

  <UpdateArticle 
    v-model="edit_article" 
    :article="article_selected" />

  <DeleteArticle
    v-model="remove_article"
    :article="article_selected" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { debounce } from 'lodash'
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import ToolbarArticle from '@/system/pages/article/ToolbarArticle.vue';
import ListArticle from '@/system/pages/article/ListArticle.vue';
import SaveArticle from '@/system/pages/article/SaveArticle.vue';
import UpdateArticle from '@/system/pages/article/UpdateArticle.vue';
import DeleteArticle from '@/system/pages/article/DeleteArticle.vue';
import articleService from '@/system/services/articleService';

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