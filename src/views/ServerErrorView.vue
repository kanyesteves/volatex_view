<template>
  <div class="servererror">
    <h1>500 Server error</h1>

    <Message :class="$style.messageError" severity="error">
      Servidor parou ou está com problemas. Entre em contato com o nosso time de suporte clicando 
      <a href="https://wa.me/5547996288611" target="_blank">
        Aqui.
      </a>
    </Message>
  </div>
</template>

<script lang="ts" setup>
import Message from 'primevue/message';

</script>

<style module>
  .messageError {
    position: absolute;
    top: 10%;
    left: 40%;
    margin-top: 1rem;
    max-width: 20rem;
  }
</style>