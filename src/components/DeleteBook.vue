<template>
  <ion-alert
    :is-open="isOpen"
    header="Delete Book"
    :message="message"
    :buttons="alertButtons"
    @didDismiss="$emit('cancel-delete')"
  />
</template>

<script setup lang="ts">

import {
  IonAlert
} from '@ionic/vue';

import { computed } from 'vue';

interface Book {
  title: string;
  author: string;
  category: string;
  publicationYear: string;
  status: string;
  coverPreview: string;
}

const props = defineProps<{
  isOpen: boolean;
  book: Book | null;
}>();

const emit = defineEmits<{
  (e: 'confirm-delete'): void;
  (e: 'cancel-delete'): void;
}>();

const message = computed(() => {
  if (!props.book) {
    return 'Are you sure you want to delete this book?';
  }

  return `Are you sure you want to delete "${props.book.title}"?`;
});

const alertButtons = [
  {
    text: 'Cancel',
    role: 'cancel'
  },
  {
    text: 'Delete',
    role: 'destructive',
    handler: () => {
      emit('confirm-delete');
    }
  }
];

</script>