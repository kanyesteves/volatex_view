import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSidebarStore = defineStore('sidebarStore', () => {
  const isOpen = ref(window.innerWidth >= 768);

  function toggle() {
    isOpen.value = !isOpen.value;
    updateCSSVariable();
  }

  function close() {
    isOpen.value = false;
    updateCSSVariable();
  }

  function handleResize() {
    const wasOpen = isOpen.value;
    const shouldBeOpen = window.innerWidth >= 768;
    if (wasOpen !== shouldBeOpen) {
      isOpen.value = shouldBeOpen;
      updateCSSVariable();
    }
  }

  function updateCSSVariable() {
    document.documentElement.style.setProperty(
      '--sidebar-width',
      isOpen.value ? '260px' : '0px'
    );
  }

  return { isOpen, toggle, close, handleResize, updateCSSVariable };
});
