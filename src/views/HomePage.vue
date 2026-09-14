<template>
  <ion-page>

    <!-- =========================
         HEADER
    ========================== -->
    <ion-header class="ion-no-border">

      <ion-toolbar class="main-toolbar">

        <ion-title>
          Book Collection
        </ion-title>

      </ion-toolbar>

    </ion-header>


    <ion-content class="library-content">

      <!-- =========================
           BOOKSHELF VIEW
      ========================== -->
      <div
        v-if="activeView === 'bookshelf'"
        class="page-container"
      >

        <!-- INTRO -->
        <section class="library-header">

          <div>

            <p class="eyebrow">
              MY COLLECTION
            </p>

            <h1>
              My Library
            </h1>

            <p class="subtitle">
              Browse and manage your books.
            </p>

          </div>


          <!-- BOOK COUNT -->
          <div class="book-count">

            <strong>
              {{ filteredBooks.length }}
            </strong>

            <span>
              {{
                filteredBooks.length === 1
                  ? 'Book'
                  : 'Books'
              }}
            </span>

          </div>

        </section>


        <!-- =========================
             CATEGORY FILTER
        ========================== -->
        <section class="category-section">

          <h2>
            Categories
          </h2>

          <div class="category-scroll">

            <!-- ALL -->
            <ion-chip
              :class="{
                active:
                  selectedCategory === 'All'
              }"
              @click="selectedCategory = 'All'"
            >

              <ion-label>
                All
              </ion-label>

            </ion-chip>


            <!-- CATEGORIES -->
            <ion-chip
              v-for="category in categories"
              :key="category"
              :class="{
                active:
                  selectedCategory === category
              }"
              @click="
                selectedCategory = category
              "
            >

              <ion-label>
                {{ category }}
              </ion-label>

            </ion-chip>

          </div>

        </section>


        <!-- =========================
             BOOK SECTION
        ========================== -->
        <section class="book-section">

          <div class="section-header">

            <div>

              <h2>
                {{
                  selectedCategory === 'All'
                    ? 'All Books'
                    : selectedCategory
                }}
              </h2>

              <p>
                {{
                  filteredBooks.length === 0
                    ? 'No books in this category.'
                    : `${filteredBooks.length} book${filteredBooks.length > 1 ? 's' : ''} found`
                }}
              </p>

            </div>

          </div>


          <BookList
            :books="filteredBooks"
            @edit-book="handleEditBook"
            @delete-book="handleDeleteBook"
            @save-notes="handleSaveNotes"
          />

        </section>

      </div>


      <!-- =========================
           ALL BOOKS VIEW
      ========================== -->
      <AllBooks
        v-if="activeView === 'allBooks'"
        :books="books"
      />


      <!-- =========================
           ADD BOOK MODAL
      ========================== -->
      <ion-modal
        :is-open="showAddBook"
        @didDismiss="
          showAddBook = false
        "
      >

        <ion-header class="ion-no-border">

          <ion-toolbar>

            <ion-title>
              Add New Book
            </ion-title>

            <ion-buttons slot="end">

              <ion-button
                @click="
                  showAddBook = false
                "
              >
                Close
              </ion-button>

            </ion-buttons>

          </ion-toolbar>

        </ion-header>


        <ion-content
          class="modal-content ion-padding"
        >

          <AddBook
            @add-book="handleAddBook"
          />

        </ion-content>

      </ion-modal>


      <!-- =========================
           EDIT BOOK MODAL
      ========================== -->
      <ion-modal
        :is-open="
          selectedBook !== null
        "
        @didDismiss="
          handleCancelEdit
        "
      >

        <ion-header class="ion-no-border">

          <ion-toolbar>

            <ion-title>
              Edit Book
            </ion-title>

            <ion-buttons slot="end">

              <ion-button
                @click="
                  handleCancelEdit
                "
              >
                Close
              </ion-button>

            </ion-buttons>

          </ion-toolbar>

        </ion-header>


        <ion-content
          class="modal-content ion-padding"
        >

          <EditBook
            v-if="selectedBook"
            :book="selectedBook"
            @save-edit="handleSaveEdit"
            @cancel-edit="handleCancelEdit"
          />

        </ion-content>

      </ion-modal>


      <!-- =========================
           DELETE CONFIRMATION
      ========================== -->
      <DeleteBook
        :is-open="
          showDeleteConfirm
        "
        :book="
          bookToDelete
        "
        @confirm-delete="
          confirmDeleteBook
        "
        @cancel-delete="
          cancelDeleteBook
        "
      />


      <!-- =========================
           BOTTOM NAVIGATION
      ========================== -->
      <div class="bottom-navigation">

        <!-- BOOKSHELF -->
        <button
          type="button"
          class="nav-item"
          :class="{
            active:
              activeView === 'bookshelf'
          }"
          @click="
            activeView = 'bookshelf'
          "
        >

          <ion-icon
            :icon="libraryOutline"
          />

          <span>
            Bookshelf
          </span>

        </button>


        <!-- ADD BOOK -->
        <button
          type="button"
          class="add-nav-button"
          aria-label="Add Book"
          @click="
            showAddBook = true
          "
        >

          <ion-icon
            :icon="addOutline"
          />

        </button>


        <!-- ALL BOOKS -->
        <button
          type="button"
          class="nav-item"
          :class="{
            active:
              activeView === 'allBooks'
          }"
          @click="
            activeView = 'allBooks'
          "
        >

          <ion-icon
            :icon="gridOutline"
          />

          <span>
            All Books
          </span>

        </button>

      </div>


      <!-- =========================
           TOAST
      ========================== -->
      <ion-toast
        :is-open="showToast"
        :message="toastMessage"
        :color="toastColor"
        :duration="2000"
        position="top"
        @didDismiss="
          showToast = false
        "
      />

    </ion-content>

  </ion-page>
</template>


<script setup lang="ts">

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonChip,
  IonLabel,
  IonModal,
  IonButtons,
  IonButton,
  IonIcon,
  IonToast
} from '@ionic/vue';


import {
  ref,
  computed,
  onMounted
} from 'vue';


import {
  ref as databaseRef,
  push,
  onValue,
  update,
  remove
} from 'firebase/database';


import {
  libraryOutline,
  addOutline,
  gridOutline
} from 'ionicons/icons';


import {
  db
} from '@/firebase';


import AllBooks
  from '@/components/AllBooks.vue';

import AddBook
  from '@/components/AddBook.vue';

import BookList
  from '@/components/BookList.vue';

import EditBook
  from '@/components/EditBook.vue';

import DeleteBook
  from '@/components/DeleteBook.vue';


/* =========================
   BOOK TYPE
========================= */

interface Book {

  id?: string;

  title: string;

  author: string;

  language: string;

  isbn: string;

  publisher: string;

  category: string;

  publicationYear: string;

  publishDate?: string;

  pages: string;

  edition: string;

  format: string;

  status: string;

  description: string;

  coverPreview: string;

  galleryImages: string[];

  startedReading?: string;

  finishedReading?: string;

  pagesRead?: number;

}


/* =========================
   BOOK DATA
========================= */

const books =
  ref<Book[]>([]);


/* =========================
   BOTTOM NAVIGATION
========================= */

const activeView =
  ref<
    'bookshelf' |
    'allBooks'
  >(
    'bookshelf'
  );


/* =========================
   ADD MODAL
========================= */

const showAddBook =
  ref(false);


/* =========================
   TOAST
========================= */

const showToast =
  ref(false);


const toastMessage =
  ref('');


const toastColor =
  ref<
    'success' |
    'danger'
  >(
    'success'
  );


const presentToast = (
  message: string,
  color:
    'success' |
    'danger'
    = 'success'
) => {

  /*
    Reset first so repeated
    messages can still appear.
  */
  showToast.value =
    false;


  toastMessage.value =
    message;


  toastColor.value =
    color;


  setTimeout(
    () => {

      showToast.value =
        true;

    },
    50
  );

};


/* =========================
   CATEGORY
========================= */

const selectedCategory =
  ref('All');


const categories = [

  'Fiction',

  'Non-Fiction',

  'Fantasy',

  'Mystery',

  'Romance',

  'Science Fiction',

  'Educational',

  'Biography',

  'Other'

];


const filteredBooks =
  computed(() => {

    if (
      selectedCategory.value ===
      'All'
    ) {

      return books.value;

    }


    return books.value.filter(
      book =>

        book.category ===
        selectedCategory.value

    );

  });


/* =========================
   EDIT
========================= */

const selectedBook =
  ref<Book | null>(
    null
  );


const selectedBookId =
  ref<string | null>(
    null
  );


/* =========================
   DELETE
========================= */

const showDeleteConfirm =
  ref(false);


const bookToDelete =
  ref<Book | null>(
    null
  );


/* =========================
   CREATE
========================= */

const handleAddBook =
  async (
    book: Book
  ) => {

    try {

      const booksRef =
        databaseRef(
          db,
          'books'
        );


      await push(
        booksRef,
        {

          title:
            book.title,

          author:
            book.author,

          language:
            book.language,

          isbn:
            book.isbn,

          publisher:
            book.publisher,

          category:
            book.category,

          publicationYear:
            book.publicationYear,

          publishDate:
            book.publishDate ||
            '',

          pages:
            book.pages,

          edition:
            book.edition,

          format:
            book.format,

          status:
            book.status,

          description:
            book.description,

          coverPreview:
            book.coverPreview,

          galleryImages:
            book.galleryImages,

          startedReading:
            '',

          finishedReading:
            '',

          pagesRead:
            0

        }
      );


      showAddBook.value =
        false;


      activeView.value =
        'bookshelf';


      presentToast(
        'Book added successfully.'
      );


    } catch (error) {

      console.error(
        'Error adding book:',
        error
      );


      presentToast(
        'Failed to add book.',
        'danger'
      );

    }

  };


/* =========================
   READ
========================= */

onMounted(() => {

  const booksRef =
    databaseRef(
      db,
      'books'
    );


  onValue(
    booksRef,
    snapshot => {

      const data =
        snapshot.val();


      const loadedBooks:
        Book[] = [];


      if (data) {

        Object
          .keys(data)
          .forEach(
            key => {

              loadedBooks.push({

                id:
                  key,

                title:
                  data[key].title ||
                  '',

                author:
                  data[key].author ||
                  '',

                language:
                  data[key].language ||
                  '',

                isbn:
                  data[key].isbn ||
                  '',

                publisher:
                  data[key].publisher ||
                  '',

                category:
                  data[key].category ||
                  '',

                publicationYear:
                  data[key].publicationYear ||
                  '',

                publishDate:
                  data[key].publishDate ||
                  '',

                pages:
                  data[key].pages ||
                  '',

                edition:
                  data[key].edition ||
                  '',

                format:
                  data[key].format ||
                  '',

                status:
                  data[key].status ||
                  '',

                description:
                  data[key].description ||
                  '',

                coverPreview:
                  data[key].coverPreview ||
                  '',

                galleryImages:
                  data[key]
                    .galleryImages
                    ? Object.values(
                        data[key]
                          .galleryImages
                      ) as string[]
                    : [],

                startedReading:
                  data[key]
                    .startedReading ||
                  '',

                finishedReading:
                  data[key]
                    .finishedReading ||
                  '',

                pagesRead:
                  Number(
                    data[key]
                      .pagesRead
                  ) || 0

              });

            }
          );

      }


      books.value =
        loadedBooks;

    }
  );

});


/* =========================
   SAVE READING PROGRESS
========================= */

const handleSaveNotes =
  async (
    data: {

      index: number;

      startedReading:
        string;

      finishedReading:
        string;

      pagesRead:
        number;

    }
  ) => {

    const book =
      filteredBooks.value[
        data.index
      ];


    if (!book?.id) {

      presentToast(
        'Unable to save reading progress.',
        'danger'
      );

      return;

    }


    try {

      const bookRef =
        databaseRef(
          db,
          `books/${book.id}`
        );


      await update(
        bookRef,
        {

          startedReading:
            data.startedReading,

          finishedReading:
            data.finishedReading,

          pagesRead:
            data.pagesRead

        }
      );


      presentToast(
        'Reading progress saved.'
      );


    } catch (error) {

      console.error(
        'Error saving reading progress:',
        error
      );


      presentToast(
        'Failed to save reading progress.',
        'danger'
      );

    }

  };


/* =========================
   OPEN EDIT
========================= */

const handleEditBook =
  (
    index: number
  ) => {

    const book =
      filteredBooks.value[
        index
      ];


    if (!book) {

      return;

    }


    selectedBook.value = {

      ...book,

      galleryImages:
        [
          ...book
            .galleryImages
        ]

    };


    selectedBookId.value =
      book.id ??
      null;

  };


/* =========================
   UPDATE
========================= */

const handleSaveEdit =
  async (
    updatedBook: Book
  ) => {

    if (
      !selectedBookId.value
    ) {

      presentToast(
        'Unable to update book.',
        'danger'
      );

      return;

    }


    try {

      const bookRef =
        databaseRef(
          db,
          `books/${selectedBookId.value}`
        );


      await update(
        bookRef,
        {

          title:
            updatedBook.title,

          author:
            updatedBook.author,

          language:
            updatedBook.language,

          isbn:
            updatedBook.isbn,

          publisher:
            updatedBook.publisher,

          category:
            updatedBook.category,

          publicationYear:
            updatedBook
              .publicationYear,

          publishDate:
            updatedBook
              .publishDate ||
            '',

          pages:
            updatedBook.pages,

          edition:
            updatedBook.edition,

          format:
            updatedBook.format,

          status:
            updatedBook.status,

          description:
            updatedBook
              .description,

          coverPreview:
            updatedBook
              .coverPreview,

          galleryImages:
            updatedBook
              .galleryImages

        }
      );


      selectedBook.value =
        null;


      selectedBookId.value =
        null;


      presentToast(
        'Book updated successfully.'
      );


    } catch (error) {

      console.error(
        'Error updating book:',
        error
      );


      presentToast(
        'Failed to update book.',
        'danger'
      );

    }

  };


/* =========================
   CANCEL EDIT
========================= */

const handleCancelEdit =
  () => {

    selectedBook.value =
      null;


    selectedBookId.value =
      null;

  };


/* =========================
   OPEN DELETE
========================= */

const handleDeleteBook =
  (
    index: number
  ) => {

    const book =
      filteredBooks.value[
        index
      ];


    if (!book) {

      return;

    }


    bookToDelete.value = {

      ...book,

      galleryImages:
        [
          ...book
            .galleryImages
        ]

    };


    showDeleteConfirm.value =
      true;

  };


/* =========================
   DELETE
========================= */

const confirmDeleteBook =
  async () => {

    if (
      !bookToDelete.value?.id
    ) {

      presentToast(
        'Unable to delete book.',
        'danger'
      );

      return;

    }


    try {

      const bookRef =
        databaseRef(
          db,
          `books/${bookToDelete.value.id}`
        );


      await remove(
        bookRef
      );


      showDeleteConfirm.value =
        false;


      bookToDelete.value =
        null;


      presentToast(
        'Book deleted successfully.'
      );


    } catch (error) {

      console.error(
        'Error deleting book:',
        error
      );


      presentToast(
        'Failed to delete book.',
        'danger'
      );

    }

  };


/* =========================
   CANCEL DELETE
========================= */

const cancelDeleteBook =
  () => {

    showDeleteConfirm.value =
      false;


    bookToDelete.value =
      null;

  };

</script>


<style scoped>

/* =========================
   PAGE
========================= */

.library-content {
  --background:
    #f4f1eb;
}


/* =========================
   BOOKSHELF CONTAINER
========================= */

.page-container {
  max-width: 1100px;

  margin:
    0 auto;

  padding:
    24px 18px 115px;
}


/* =========================
   HEADER
========================= */

.main-toolbar {
  --background:
    #ffffff;

  --border-color:
    transparent;
}


.main-toolbar ion-title {
  font-size: 19px;

  font-weight: 700;

  color:
    #3f2d20;
}


/* =========================
   LIBRARY INTRO
========================= */

.library-header {
  display: flex;

  align-items:
    center;

  justify-content:
    space-between;

  gap: 16px;

  margin-bottom:
    28px;
}


.eyebrow {
  margin:
    0 0 4px;

  font-size:
    11px;

  font-weight:
    700;

  letter-spacing:
    1.6px;

  color:
    #9a7658;
}


.library-header h1 {
  margin: 0;

  font-size:
    31px;

  font-weight:
    800;

  color:
    #3f2d20;
}


.subtitle {
  margin:
    5px 0 0;

  font-size:
    14px;

  color:
    #84776e;
}


/* =========================
   BOOK COUNT
========================= */

.book-count {
  min-width:
    78px;

  padding:
    12px 14px;

  background:
    #ffffff;

  border-radius:
    16px;

  text-align:
    center;

  box-shadow:
    0 4px 14px
    rgba(
      80,
      56,
      39,
      0.08
    );
}


.book-count strong {
  display:
    block;

  font-size:
    24px;

  color:
    #5d4030;
}


.book-count span {
  display:
    block;

  margin-top:
    2px;

  font-size:
    11px;

  color:
    #8d8179;
}


/* =========================
   CATEGORY
========================= */

.category-section {
  margin-bottom:
    25px;
}


.category-section h2 {
  margin-bottom:
    10px;

  font-size:
    18px;

  color:
    #473429;
}


.category-scroll {
  display: flex;

  gap: 7px;

  overflow-x:
    auto;

  padding-bottom:
    5px;

  scrollbar-width:
    none;
}


.category-scroll::-webkit-scrollbar {
  display: none;
}


ion-chip {
  flex-shrink:
    0;

  cursor:
    pointer;

  --background:
    #ffffff;

  --color:
    #65554b;

  border:
    1px solid
    #e7ddd5;
}


ion-chip.active {
  --background:
    #684a37;

  --color:
    #ffffff;

  border-color:
    #684a37;

  font-weight:
    600;
}


/* =========================
   BOOK SECTION
========================= */

.book-section {
  margin-top:
    8px;
}


.section-header {
  margin-bottom:
    5px;
}


.section-header h2 {
  margin: 0;

  font-size:
    20px;

  color:
    #473429;
}


.section-header p {
  margin:
    4px 0 0;

  font-size:
    13px;

  color:
    #92857d;
}


/* =========================
   MODAL
========================= */

.modal-content {
  --background:
    #f7f4ef;
}


/* =========================
   BOTTOM NAVIGATION
========================= */

.bottom-navigation {
  position:
    fixed;

  left: 0;
  right: 0;
  bottom: 0;

  z-index:
    1000;

  height:
    76px;

  display:
    grid;

  grid-template-columns:
    1fr 82px 1fr;

  align-items:
    center;

  padding:
    0 25px;

  background:
    #ffffff;

  border-top:
    1px solid
    #ece6e1;

  box-shadow:
    0 -3px 15px
    rgba(
      0,
      0,
      0,
      0.06
    );
}


/* NAV ITEM */

.nav-item {
  height:
    100%;

  display:
    flex;

  flex-direction:
    column;

  align-items:
    center;

  justify-content:
    center;

  gap: 4px;

  border:
    none;

  background:
    transparent;

  color:
    #aaa29c;

  cursor:
    pointer;
}


.nav-item ion-icon {
  font-size:
    24px;
}


.nav-item span {
  font-size:
    10px;

  font-weight:
    600;
}


.nav-item.active {
  color:
    #5c4030;
}


/* CENTER ADD */

.add-nav-button {
  position:
    relative;

  top:
    -18px;

  width:
    60px;

  height:
    60px;

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  justify-self:
    center;

  border:
    none;

  border-radius:
    50%;

  background:
    #5c4030;

  color:
    #ffffff;

  cursor:
    pointer;

  box-shadow:
    0 6px 18px
    rgba(
      70,
      45,
      30,
      0.3
    );
}


.add-nav-button ion-icon {
  font-size:
    30px;
}


/* =========================
   MOBILE
========================= */

@media (
  max-width: 430px
) {

  .page-container {
    padding:
      20px 16px
      110px;
  }


  .library-header h1 {
    font-size:
      27px;
  }


  .bottom-navigation {
    height:
      72px;

    padding:
      0 18px;
  }


  .add-nav-button {
    width:
      56px;

    height:
      56px;

    top:
      -16px;
  }

}

</style>