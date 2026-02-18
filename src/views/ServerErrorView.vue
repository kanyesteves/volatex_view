<template>
  <div class="servererror">
    <h1>500 Server error</h1>

    <Message :class="$style.messageError" severity="error">
      Servidor parou ou está com problemas. Entre em contato com o nosso time de suporte clicando 
      <a href="https://wa.me/5547996288611" target="_blank">
        AQUI.
      </a>
    </Message>
  </div>
</template>

<script lang="ts" setup>
import Message from 'primevue/message';

</script>

<style module>
  .messageError {
    margin: 2rem auto;
    max-width: 20rem;
    width: 90%;
  }
</style>