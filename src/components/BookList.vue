<template>
  <div class="book-list">

    <!-- EMPTY STATE -->
    <div
      v-if="books.length === 0"
      class="empty-state"
    >
      <h3>No Books Yet</h3>

      <p>
        Add a book to start your collection.
      </p>
    </div>


    <!-- BOOKS -->
    <div
      v-for="(book, index) in books"
      :key="book.id || index"
      class="book-row"
      @click="openBook(book, index)"
      @pointerdown="startLongPress(index)"
      @pointerup="cancelLongPress"
      @pointerleave="cancelLongPress"
      @pointercancel="cancelLongPress"
    >

      <!-- COVER -->
      <div class="cover-wrapper">

        <img
          v-if="book.coverPreview"
          :src="book.coverPreview"
          class="book-cover"
          alt="Book Cover"
        />

        <div
          v-else
          class="no-cover"
        >
          No Cover
        </div>

      </div>


      <!-- BASIC INFORMATION -->
      <div class="book-summary">

        <h2>
          {{ book.title }}
        </h2>

        <p class="author">
          {{ book.author }}
        </p>


        <!-- PROGRESS -->
        <div class="progress-area">

          <div class="progress-track">

            <div
              class="progress-fill"
              :style="{
                width: getProgress(book) + '%'
              }"
            ></div>

          </div>

          <span>
            {{ getProgress(book) }}%
          </span>

        </div>


        <!-- PAGES + PUBLISH DATE -->
        <div class="book-meta">

          <div class="meta-item">

            <ion-icon
              :icon="documentsOutline"
            />

            <span>
              {{ book.pages || '—' }}
            </span>

          </div>


          <div class="meta-item">

            <ion-icon
              :icon="calendarOutline"
            />

            <span>
              {{
                book.publishDate ||
                book.publicationYear ||
                '—'
              }}
            </span>

          </div>

        </div>

      </div>

    </div>


    <!-- ===================================== -->
    <!-- BOOK DETAILS MODAL                    -->
    <!-- ===================================== -->

    <ion-modal
      :is-open="selectedBook !== null"
      @didDismiss="closeBook"
    >

      <ion-header class="ion-no-border">

        <ion-toolbar class="detail-toolbar">

          <ion-buttons slot="start">

            <ion-button
              @click="closeBook"
            >
              <ion-icon
                :icon="chevronBackOutline"
              />
            </ion-button>

          </ion-buttons>

          <ion-title>
            Book Details
          </ion-title>

        </ion-toolbar>

      </ion-header>


      <ion-content
        v-if="selectedBook"
        class="details-content"
      >

        <div class="details-container">


          <!-- TOP BOOK INFORMATION -->
          <section class="book-hero">

            <div class="detail-cover">

              <img
                v-if="selectedBook.coverPreview"
                :src="selectedBook.coverPreview"
                alt="Book Cover"
              />

              <div
                v-else
                class="detail-no-cover"
              >
                No Cover
              </div>

            </div>


            <div class="hero-info">

              <h1>
                {{ selectedBook.title }}
              </h1>

              <p>
                {{ selectedBook.author }}
              </p>

              <span
                v-if="selectedBook.category"
                class="category-badge"
              >
                {{ selectedBook.category }}
              </span>

            </div>

          </section>


          <!-- TABS -->
          <div class="tabs">

            <button
              :class="{
                active:
                  activeTab === 'notes'
              }"
              @click="activeTab = 'notes'"
            >
              Notes
            </button>

            <button
              :class="{
                active:
                  activeTab === 'info'
              }"
              @click="activeTab = 'info'"
            >
              Info
            </button>

          </div>


          <!-- ================================= -->
          <!-- NOTES                             -->
          <!-- ================================= -->

          <section
            v-if="activeTab === 'notes'"
            class="tab-content"
          >

            <h2>
              Reading Progress
            </h2>


            <!-- STARTED READING -->
            <div class="note-field">

              <label>
                Started Reading
              </label>

              <input
                v-model="notes.startedReading"
                type="date"
                class="date-input"
              />

            </div>


            <!-- FINISHED -->
            <div class="note-field">

              <label>
                Finished
                <span>
                  Optional
                </span>
              </label>

              <input
                v-model="notes.finishedReading"
                type="date"
                class="date-input"
              />

            </div>


            <!-- PAGES READ -->
            <div class="note-field">

              <label>
                Pages Read
              </label>

              <div class="pages-read">

                <input
                  v-model.number="notes.pagesRead"
                  type="number"
                  min="0"
                  :max="Number(selectedBook.pages) || 0"
                  @input="validatePagesRead"
                />

                <span>
                  /
                  {{ selectedBook.pages || 0 }}
                  pages
                </span>

              </div>

            </div>


            <!-- PROGRESS -->
            <div class="detail-progress">

              <div class="progress-heading">

                <span>
                  Progress
                </span>

                <strong>
                  {{ currentProgress }}%
                </strong>

              </div>

              <div class="large-progress-track">

                <div
                  class="large-progress-fill"
                  :style="{
                    width:
                      currentProgress + '%'
                  }"
                ></div>

              </div>

            </div>


            <!-- SAVE NOTES -->
            <ion-button
              expand="block"
              class="save-notes-button"
              @click="saveNotes"
            >
              Save Reading Progress
            </ion-button>

          </section>


          <!-- ================================= -->
          <!-- INFO                              -->
          <!-- ================================= -->

          <section
            v-if="activeTab === 'info'"
            class="tab-content info-content"
          >

            <div class="info-item">
              <label>Title</label>
              <p>{{ selectedBook.title }}</p>
            </div>


            <div class="info-item">
              <label>Authors</label>
              <p>{{ selectedBook.author }}</p>
            </div>


            <div class="info-item">
              <label>Language</label>
              <p>
                {{ selectedBook.language || 'Not specified' }}
              </p>
            </div>


            <div class="info-item">
              <label>Description</label>
              <p>
                {{ selectedBook.description || 'No description.' }}
              </p>
            </div>


            <div class="info-item">
              <label>Categories</label>
              <p>
                {{ selectedBook.category }}
              </p>
            </div>


            <div class="info-item">
              <label>Publisher</label>
              <p>
                {{ selectedBook.publisher || 'Not specified' }}
              </p>
            </div>


            <div class="info-item">
              <label>Edition</label>
              <p>
                {{ selectedBook.edition || 'Not specified' }}
              </p>
            </div>


            <div class="info-item">
              <label>Publish Date</label>
              <p>
                {{
                  selectedBook.publishDate ||
                  selectedBook.publicationYear ||
                  'Not specified'
                }}
              </p>
            </div>


            <div class="info-item">
              <label>Pages</label>
              <p>
                {{ selectedBook.pages || 'Not specified' }}
              </p>
            </div>


            <div class="info-item">
              <label>Format</label>
              <p>
                {{ selectedBook.format || 'Not specified' }}
              </p>
            </div>


            <div
              v-if="selectedBook.isbn"
              class="info-item"
            >
              <label>ISBN</label>
              <p>{{ selectedBook.isbn }}</p>
            </div>


            <!-- GALLERY -->
            <div
              v-if="
                selectedBook.galleryImages &&
                selectedBook.galleryImages.length
              "
              class="info-item"
            >

              <label>
                Gallery
              </label>

              <div class="gallery-grid">

                <img
                  v-for="(image, imageIndex)
                    in selectedBook.galleryImages"
                  :key="imageIndex"
                  :src="image"
                  alt="Book Gallery"
                />

              </div>

            </div>


            <!-- EDIT -->
            <ion-button
              expand="block"
              class="edit-button"
              @click="editSelectedBook"
            >
              Edit Book
            </ion-button>

          </section>

        </div>

      </ion-content>

    </ion-modal>

  </div>
</template>


<script setup lang="ts">

import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon
} from '@ionic/vue';

import {
  ref,
  reactive,
  computed,
  watch
} from 'vue';

import {
  calendarOutline,
  documentsOutline,
  chevronBackOutline
} from 'ionicons/icons';


interface Book {
  id?: string;

  title: string;
  author: string;

  isbn?: string;
  publisher?: string;

  category: string;

  publicationYear: string;
  publishDate?: string;

  pages: string;
  edition?: string;

  format?: string;

  language?: string;

  status: string;

  description?: string;

  coverPreview: string;

  galleryImages?: string[];

  startedReading?: string;
  finishedReading?: string;

  pagesRead?: number;
}


const props = defineProps<{
  books: Book[];
}>();


const emit = defineEmits<{
  (e: 'edit-book', index: number): void;

  (e: 'delete-book', index: number): void;

  (
    e: 'save-notes',
    data: {
      index: number;
      startedReading: string;
      finishedReading: string;
      pagesRead: number;
    }
  ): void;
}>();


const selectedBook =
  ref<Book | null>(null);

const selectedIndex =
  ref<number | null>(null);

const activeTab =
  ref<'notes' | 'info'>('info');


const notes = reactive({
  startedReading: '',
  finishedReading: '',
  pagesRead: 0
});


/* OPEN BOOK */

const openBook = (
  book: Book,
  index: number
) => {

  if (longPressTriggered.value) {

    longPressTriggered.value =
      false;

    return;

  }

  selectedBook.value =
    book;

  selectedIndex.value =
    index;

  activeTab.value =
    'info';

};


/* CLOSE */

const closeBook = () => {

  selectedBook.value =
    null;

  selectedIndex.value =
    null;

};


/* LOAD NOTES */

watch(
  selectedBook,
  book => {

    if (!book) {
      return;
    }

    notes.startedReading =
      book.startedReading || '';

    notes.finishedReading =
      book.finishedReading || '';

    notes.pagesRead =
      Number(book.pagesRead) || 0;

  }
);


/* PROGRESS */

const calculateProgress = (
  pagesRead: number,
  totalPages: string
) => {

  const total =
    Number(totalPages);

  if (
    !total ||
    total <= 0
  ) {
    return 0;
  }

  const progress =
    Math.round(
      (
        Number(pagesRead || 0) /
        total
      ) * 100
    );

  return Math.min(
    100,
    Math.max(
      0,
      progress
    )
  );

};


const getProgress = (
  book: Book
) => {

  return calculateProgress(
    Number(book.pagesRead) || 0,
    book.pages
  );

};


const currentProgress =
  computed(() => {

    if (!selectedBook.value) {
      return 0;
    }

    return calculateProgress(
      notes.pagesRead,
      selectedBook.value.pages
    );

  });


/* VALIDATE PAGES */

const validatePagesRead = () => {

  if (!selectedBook.value) {
    return;
  }

  const total =
    Number(
      selectedBook.value.pages
    ) || 0;


  if (notes.pagesRead < 0) {

    notes.pagesRead = 0;

  }


  if (
    total > 0 &&
    notes.pagesRead > total
  ) {

    notes.pagesRead =
      total;

  }

};


/* SAVE NOTES */

const saveNotes = () => {

  if (
    selectedIndex.value === null
  ) {
    return;
  }


  validatePagesRead();


  emit(
    'save-notes',
    {
      index:
        selectedIndex.value,

      startedReading:
        notes.startedReading,

      finishedReading:
        notes.finishedReading,

      pagesRead:
        notes.pagesRead
    }
  );


  alert(
    'Reading progress saved successfully!'
  );

};


/* EDIT */

const editSelectedBook = () => {

  if (
    selectedIndex.value === null
  ) {
    return;
  }


  const index =
    selectedIndex.value;


  closeBook();


  emit(
    'edit-book',
    index
  );

};


/* LONG PRESS DELETE */

let longPressTimer:
  ReturnType<typeof setTimeout> |
  null = null;


const longPressTriggered =
  ref(false);


const startLongPress = (
  index: number
) => {

  longPressTriggered.value =
    false;


  longPressTimer =
    setTimeout(
      () => {

        longPressTriggered.value =
          true;

        emit(
          'delete-book',
          index
        );

      },
      700
    );

};


const cancelLongPress = () => {

  if (longPressTimer) {

    clearTimeout(
      longPressTimer
    );

    longPressTimer =
      null;

  }

};

</script>


<style scoped>

.book-list {
  width: 100%;
}


/* EMPTY */

.empty-state {
  padding: 50px 20px;

  text-align: center;

  color: #8b817a;
}

.empty-state h3 {
  margin-bottom: 5px;

  color: #403a36;
}


/* BOOK ROW */

.book-row {
  display: flex;

  gap: 25px;

  padding: 26px 0;

  border-bottom:
    1px solid #e8e4e0;

  cursor: pointer;

  user-select: none;

  -webkit-user-select: none;
}

.cover-wrapper {
  flex-shrink: 0;
}


/* COVER */

.book-cover,
.no-cover {
  width: 145px;
  height: 205px;

  border-radius: 6px;

  box-shadow:
    0 5px 14px
    rgba(0, 0, 0, 0.18);
}

.book-cover {
  object-fit: cover;
}

.no-cover {
  display: flex;

  align-items: center;
  justify-content: center;

  background: #e9e7e4;

  color: #99928d;

  font-size: 12px;
}


/* SUMMARY */

.book-summary {
  flex: 1;

  padding-top: 12px;

  min-width: 0;
}

.book-summary h2 {
  margin: 0;

  color: #192439;

  font-size: 23px;

  font-weight: 750;
}

.author {
  margin:
    12px 0 30px;

  color: #525252;

  font-size: 17px;
}


/* PROGRESS */

.progress-area {
  display: flex;

  align-items: center;

  gap: 12px;

  margin-bottom: 30px;
}

.progress-track {
  flex: 1;

  height: 7px;

  overflow: hidden;

  background: #e6e6e6;

  border-radius: 20px;
}

.progress-fill {
  height: 100%;

  background: #5c4030;

  border-radius: 20px;

  transition:
    width 0.25s ease;
}

.progress-area span {
  min-width: 35px;

  color: #666;

  font-size: 14px;
}


/* META */

.book-meta {
  display: flex;

  align-items: center;

  gap: 35px;

  color: #666;
}

.meta-item {
  display: flex;

  align-items: center;

  gap: 8px;

  font-size: 15px;
}

.meta-item ion-icon {
  font-size: 27px;

  color: #8d8d8d;
}


/* DETAILS */

.details-content {
  --background: #ffffff;
}

.detail-toolbar {
  --background: #ffffff;
}

.details-container {
  max-width: 650px;

  margin: auto;

  padding:
    25px 28px 60px;
}


/* HERO */

.book-hero {
  display: flex;

  align-items: center;

  gap: 28px;

  padding:
    15px 0 28px;
}

.detail-cover {
  width: 145px;
  height: 205px;

  flex-shrink: 0;

  overflow: hidden;

  border-radius: 5px;

  box-shadow:
    0 5px 15px
    rgba(0, 0, 0, 0.18);
}

.detail-cover img {
  width: 100%;
  height: 100%;

  object-fit: cover;
}

.detail-no-cover {
  width: 100%;
  height: 100%;

  display: flex;

  align-items: center;
  justify-content: center;

  background: #eeeeee;

  color: #888;
}

.hero-info h1 {
  margin:
    0 0 9px;

  font-size: 24px;

  color: #182237;
}

.hero-info p {
  margin:
    0 0 18px;

  color: #626262;

  font-size: 16px;
}

.category-badge {
  display: inline-block;

  padding:
    5px 10px;

  border:
    1px solid #d8d8d8;

  border-radius: 6px;

  font-size: 11px;

  color: #555;
}


/* TABS */

.tabs {
  display: grid;

  grid-template-columns:
    1fr 1fr;

  margin-top: 10px;

  border-bottom:
    1px solid #e5e5e5;
}

.tabs button {
  padding:
    15px 5px;

  border: none;

  border-bottom:
    2px solid transparent;

  background: transparent;

  color: #929292;

  font-size: 15px;

  cursor: pointer;
}

.tabs button.active {
  border-bottom-color:
    #1d2a3d;

  color: #1d2a3d;

  font-weight: 600;
}


/* TAB CONTENT */

.tab-content {
  padding-top: 28px;
}

.tab-content h2 {
  margin:
    0 0 25px;

  font-size: 18px;

  color: #222c3d;
}


/* NOTES */

.note-field {
  margin-bottom: 23px;
}

.note-field label {
  display: block;

  margin-bottom: 8px;

  color: #1d283a;

  font-size: 12px;

  font-weight: 700;

  letter-spacing: 1px;

  text-transform: uppercase;
}

.note-field label span {
  margin-left: 5px;

  color: #aaa;

  font-size: 10px;

  font-weight: 400;

  letter-spacing: 0;

  text-transform: none;
}

.date-input,
.pages-read input {
  width: 100%;

  box-sizing: border-box;

  padding: 13px;

  border:
    1px solid #ddd;

  border-radius: 8px;

  background: #fafafa;

  font-size: 14px;

  outline: none;
}

.pages-read {
  display: flex;

  align-items: center;

  gap: 12px;
}

.pages-read input {
  max-width: 130px;
}

.pages-read span {
  color: #777;

  font-size: 13px;
}


/* DETAIL PROGRESS */

.detail-progress {
  margin:
    32px 0;
}

.progress-heading {
  display: flex;

  justify-content: space-between;

  margin-bottom: 10px;

  color: #333;

  font-size: 13px;
}

.large-progress-track {
  height: 9px;

  overflow: hidden;

  background: #e7e7e7;

  border-radius: 20px;
}

.large-progress-fill {
  height: 100%;

  background: #5c4030;

  border-radius: 20px;

  transition:
    width 0.25s ease;
}

.save-notes-button {
  --background: #5c4030;

  --border-radius: 9px;
}


/* INFO */

.info-item {
  margin-bottom: 27px;
}

.info-item label {
  display: block;

  margin-bottom: 10px;

  color: #182237;

  font-size: 11px;

  font-weight: 800;

  letter-spacing: 1.4px;

  text-transform: uppercase;
}

.info-item p {
  margin: 0;

  color: #777;

  font-size: 15px;

  line-height: 1.6;
}


/* GALLERY */

.gallery-grid {
  display: grid;

  grid-template-columns:
    repeat(2, 1fr);

  gap: 10px;

  margin-top: 12px;
}

.gallery-grid img {
  width: 100%;

  aspect-ratio: 4 / 3;

  object-fit: cover;

  border-radius: 8px;
}


/* EDIT */

.edit-button {
  margin-top: 40px;

  --background: #5c4030;

  --border-radius: 0;

  height: 52px;
}


/* MOBILE */

@media (
  max-width: 500px
) {

  .book-row {
    gap: 18px;

    padding:
      22px 0;
  }

  .book-cover,
  .no-cover {
    width: 110px;
    height: 160px;
  }

  .book-summary {
    padding-top: 4px;
  }

  .book-summary h2 {
    font-size: 18px;
  }

  .author {
    margin:
      8px 0 22px;

    font-size: 14px;
  }

  .progress-area {
    margin-bottom: 22px;
  }

  .book-meta {
    gap: 18px;

    font-size: 12px;
  }

  .meta-item {
    font-size: 12px;
  }

  .meta-item ion-icon {
    font-size: 22px;
  }

  .details-container {
    padding:
      18px 22px 50px;
  }

  .book-hero {
    gap: 22px;
  }

  .detail-cover {
    width: 115px;
    height: 165px;
  }

  .hero-info h1 {
    font-size: 19px;
  }

}

</style>