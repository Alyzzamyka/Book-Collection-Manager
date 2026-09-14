<template>
  <div class="all-books-page">

    <!-- =========================
         SEARCH + SORT
    ========================== -->
    <div class="search-row">

      <!-- SEARCH -->
      <div class="search-box">

        <ion-icon
          :icon="searchOutline"
          class="search-icon"
        />

        <input
          v-model="searchText"
          type="text"
          placeholder="Search by keyword or ISBN"
        />

      </div>


      <!-- SMALL SORT BUTTON -->
      <button
        id="sort-trigger"
        type="button"
        class="sort-icon-button"
        aria-label="Sort books"
      >

        <ion-icon
          :icon="swapVerticalOutline"
        />

      </button>


      <!-- SORT DROPDOWN -->
      <ion-popover
        trigger="sort-trigger"
        trigger-action="click"
        side="bottom"
        alignment="end"
        class="sort-popover"
      >

        <div class="sort-menu">

          <p class="sort-menu-title">
            Sort Books
          </p>


          <button
            type="button"
            class="sort-option"
            :class="{
              active:
                sortOption === 'latest'
            }"
            @click="
              setSortOption('latest')
            "
          >
            Latest Added
          </button>


          <button
            type="button"
            class="sort-option"
            :class="{
              active:
                sortOption === 'title-asc'
            }"
            @click="
              setSortOption('title-asc')
            "
          >
            Title A–Z
          </button>


          <button
            type="button"
            class="sort-option"
            :class="{
              active:
                sortOption === 'title-desc'
            }"
            @click="
              setSortOption('title-desc')
            "
          >
            Title Z–A
          </button>


          <button
            type="button"
            class="sort-option"
            :class="{
              active:
                sortOption === 'year-newest'
            }"
            @click="
              setSortOption('year-newest')
            "
          >
            Publication Year: Newest
          </button>


          <button
            type="button"
            class="sort-option"
            :class="{
              active:
                sortOption === 'year-oldest'
            }"
            @click="
              setSortOption('year-oldest')
            "
          >
            Publication Year: Oldest
          </button>

        </div>

      </ion-popover>

    </div>


    <!-- =========================
         CATEGORIES
    ========================== -->
    <section
      v-if="categoryItems.length > 0"
      class="categories-section"
    >

      <div class="categories-heading">

        <h2>
          Categories
        </h2>

        <button
          v-if="selectedCategory !== 'All'"
          type="button"
          class="show-all-button"
          @click="
            selectedCategory = 'All'
          "
        >
          All
        </button>

      </div>


      <div class="categories-scroll">

        <!-- ALL -->
        <button
          type="button"
          class="category-item"
          :class="{
            active:
              selectedCategory === 'All'
          }"
          @click="
            selectedCategory = 'All'
          "
        >

          <div
            class="category-circle all-category"
          >

            <div class="all-books-icon">

              <ion-icon
                :icon="libraryOutline"
              />

            </div>

          </div>

          <span>
            All
          </span>

        </button>


        <!-- DYNAMIC CATEGORIES -->
        <button
          v-for="category in categoryItems"
          :key="category.name"
          type="button"
          class="category-item"
          :class="{
            active:
              selectedCategory === category.name
          }"
          @click="
            selectedCategory = category.name
          "
        >

          <div class="category-circle">

            <img
              v-if="category.cover"
              :src="category.cover"
              :alt="category.name"
            />

            <div
              v-else
              class="category-no-cover"
            >

              <ion-icon
                :icon="bookOutline"
              />

            </div>

          </div>

          <span>
            {{ category.name }}
          </span>

        </button>

      </div>

    </section>


    <!-- =========================
         BOOK SECTION HEADING
    ========================== -->
    <div class="books-heading">

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
            filteredBooks.length === 1
              ? '1 book'
              : `${filteredBooks.length} books`
          }}
        </p>

      </div>

    </div>


    <!-- =========================
         EMPTY
    ========================== -->
    <div
      v-if="filteredBooks.length === 0"
      class="empty-state"
    >

      <ion-icon
        :icon="bookOutline"
      />

      <h3>
        No books found
      </h3>

      <p>
        Try another search or category.
      </p>

    </div>


    <!-- =========================
         BOOK GRID
    ========================== -->
    <div
      v-else
      class="books-grid"
    >

      <div
        v-for="book in filteredBooks"
        :key="book.id"
        class="book-item"
        @click="openBook(book)"
      >

        <div class="cover-box">

          <img
            v-if="book.coverPreview"
            :src="book.coverPreview"
            :alt="book.title"
          />

          <div
            v-else
            class="no-cover"
          >
            No Cover
          </div>

        </div>


        <p class="book-title">
          {{ book.title }}
        </p>

      </div>

    </div>


    <!-- =========================
         BOOK INFO MODAL
    ========================== -->
    <ion-modal
      :is-open="selectedBook !== null"
      @didDismiss="closeBook"
    >

      <ion-header class="ion-no-border">

        <ion-toolbar>

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
            Book Info
          </ion-title>

        </ion-toolbar>

      </ion-header>


      <ion-content
        v-if="selectedBook"
        class="details-content"
      >

        <div class="details-container">

          <!-- HERO -->
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


          <!-- INFO -->
          <section class="info-section">

            <div class="info-item">
              <label>Title</label>
              <p>
                {{ selectedBook.title }}
              </p>
            </div>


            <div class="info-item">
              <label>Authors</label>
              <p>
                {{ selectedBook.author }}
              </p>
            </div>


            <div class="info-item">
              <label>Language</label>

              <p>
                {{
                  selectedBook.language ||
                  'Not specified'
                }}
              </p>

            </div>


            <div class="info-item">
              <label>Description</label>

              <p>
                {{
                  selectedBook.description ||
                  'No description.'
                }}
              </p>

            </div>


            <div class="info-item">
              <label>Categories</label>

              <p>
                {{
                  selectedBook.category ||
                  'Not specified'
                }}
              </p>

            </div>


            <div class="info-item">
              <label>Publisher</label>

              <p>
                {{
                  selectedBook.publisher ||
                  'Not specified'
                }}
              </p>

            </div>


            <div class="info-item">
              <label>Edition</label>

              <p>
                {{
                  selectedBook.edition ||
                  'Not specified'
                }}
              </p>

            </div>


            <div class="info-item">
              <label>
                Publish Date
              </label>

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
                {{
                  selectedBook.pages ||
                  'Not specified'
                }}
              </p>

            </div>


            <div class="info-item">
              <label>Format</label>

              <p>
                {{
                  selectedBook.format ||
                  'Not specified'
                }}
              </p>

            </div>


            <div
              v-if="selectedBook.isbn"
              class="info-item"
            >

              <label>ISBN</label>

              <p>
                {{ selectedBook.isbn }}
              </p>

            </div>


            <!-- GALLERY -->
            <div
              v-if="
                selectedBook.galleryImages &&
                selectedBook.galleryImages.length > 0
              "
              class="info-item"
            >

              <label>
                Gallery
              </label>

              <div class="gallery-grid">

                <img
                  v-for="(
                    image,
                    index
                  ) in selectedBook.galleryImages"
                  :key="index"
                  :src="image"
                  alt="Book Gallery"
                  @click="
                    openGallery(index)
                  "
                />

              </div>

            </div>

          </section>

        </div>

      </ion-content>

    </ion-modal>


    <!-- =========================
         FULLSCREEN GALLERY
    ========================== -->
    <ion-modal
      :is-open="showGallery"
      @didDismiss="closeGallery"
    >

      <ion-header class="ion-no-border">

        <ion-toolbar class="gallery-toolbar">

          <ion-buttons slot="start">

            <ion-button
              @click="closeGallery"
            >

              <ion-icon
                :icon="closeOutline"
              />

            </ion-button>

          </ion-buttons>


          <ion-title>
            Gallery
          </ion-title>

        </ion-toolbar>

      </ion-header>


      <ion-content class="gallery-viewer">

        <div
          ref="sliderRef"
          class="page-slider"
        >

          <div
            v-for="(
              image,
              index
            ) in selectedBook?.galleryImages || []"
            :key="index"
            class="page-slide"
          >

            <div class="page-frame">

              <img
                :src="image"
                alt="Gallery Image"
              />

            </div>

          </div>

        </div>

      </ion-content>

    </ion-modal>

  </div>
</template>


<script setup lang="ts">

import {
  IonIcon,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonPopover
} from '@ionic/vue';


import {
  computed,
  ref,
  nextTick
} from 'vue';


import {
  searchOutline,
  chevronBackOutline,
  closeOutline,
  libraryOutline,
  bookOutline,
  swapVerticalOutline
} from 'ionicons/icons';


interface Book {

  id?: string;

  title: string;

  author: string;

  language?: string;

  isbn?: string;

  publisher?: string;

  category: string;

  publicationYear: string;

  publishDate?: string;

  pages: string;

  edition?: string;

  format?: string;

  description?: string;

  coverPreview: string;

  galleryImages?: string[];

}


interface CategoryItem {

  name: string;

  cover: string;

}


type SortOption =
  | 'latest'
  | 'title-asc'
  | 'title-desc'
  | 'year-newest'
  | 'year-oldest';


const props =
  defineProps<{
    books: Book[];
  }>();


/* =========================
   SEARCH
========================= */

const searchText =
  ref('');


/* =========================
   SORT
========================= */

const sortOption =
  ref<SortOption>(
    'latest'
  );


const setSortOption = (
  option: SortOption
) => {

  sortOption.value =
    option;


  /*
    Click outside automatically
    closes Ionic popover.
    We also click trigger focus away.
  */
  (
    document.activeElement as
      HTMLElement | null
  )?.blur();

};


/* =========================
   CATEGORY
========================= */

const selectedCategory =
  ref('All');


const categoryItems =
  computed<CategoryItem[]>(
    () => {

      const categories =
        new Map<
          string,
          string
        >();


      props.books.forEach(
        book => {

          const category =
            book.category
              ?.trim();


          if (!category) {

            return;

          }


          /*
            Newer book replaces
            previous category cover.
          */
          categories.set(
            category,
            book.coverPreview || ''
          );

        }
      );


      return Array.from(
        categories.entries()
      ).map(
        (
          [
            name,
            cover
          ]
        ) => ({

          name,

          cover

        })
      );

    }
  );


/* =========================
   FILTER + SORT
========================= */

const filteredBooks =
  computed(() => {

    const keyword =
      searchText.value
        .trim()
        .toLowerCase();


    let result =
      props.books.filter(
        book => {

          const categoryMatch =

            selectedCategory.value ===
              'All' ||

            book.category ===
              selectedCategory.value;


          if (!categoryMatch) {

            return false;

          }


          if (!keyword) {

            return true;

          }


          return (

            book.title
              .toLowerCase()
              .includes(keyword) ||

            book.author
              .toLowerCase()
              .includes(keyword) ||

            Boolean(
              book.isbn &&
              book.isbn
                .toLowerCase()
                .includes(keyword)
            )

          );

        }
      );


    /*
      Never directly sort props.
    */
    result =
      [...result];


    switch (
      sortOption.value
    ) {

      /* LATEST ADDED */
      case 'latest':

        result.reverse();

        break;


      /* TITLE A-Z */
      case 'title-asc':

        result.sort(
          (
            a,
            b
          ) =>

            a.title.localeCompare(
              b.title
            )
        );

        break;


      /* TITLE Z-A */
      case 'title-desc':

        result.sort(
          (
            a,
            b
          ) =>

            b.title.localeCompare(
              a.title
            )
        );

        break;


      /* NEWEST PUBLICATION YEAR */
      case 'year-newest':

        result.sort(
          (
            a,
            b
          ) =>

            Number(
              b.publicationYear
            ) -

            Number(
              a.publicationYear
            )
        );

        break;


      /* OLDEST PUBLICATION YEAR */
      case 'year-oldest':

        result.sort(
          (
            a,
            b
          ) =>

            Number(
              a.publicationYear
            ) -

            Number(
              b.publicationYear
            )
        );

        break;

    }


    return result;

  });


/* =========================
   SELECTED BOOK
========================= */

const selectedBook =
  ref<Book | null>(
    null
  );


const openBook = (
  book: Book
) => {

  selectedBook.value =
    book;

};


const closeBook = () => {

  selectedBook.value =
    null;

};


/* =========================
   GALLERY
========================= */

const showGallery =
  ref(false);


const selectedGalleryIndex =
  ref(0);


const sliderRef =
  ref<HTMLElement | null>(
    null
  );


const openGallery =
  async (
    index: number
  ) => {

    selectedGalleryIndex.value =
      index;


    showGallery.value =
      true;


    await nextTick();


    setTimeout(
      () => {

        if (
          !sliderRef.value
        ) {

          return;

        }


        sliderRef.value.scrollTo({

          left:

            sliderRef.value
              .clientWidth *

            index,

          behavior:
            'auto'

        });

      },
      100
    );

  };


const closeGallery =
  () => {

    showGallery.value =
      false;

  };

</script>


<style scoped>

/* =========================
   PAGE
========================= */

.all-books-page {
  padding:
    20px 18px 105px;
}


/* =========================
   SEARCH + SORT ROW
========================= */

.search-row {
  width: 100%;

  display: flex;

  align-items: center;

  gap: 9px;

  margin-bottom: 22px;
}


/* SEARCH */

.search-box {
  flex: 1;

  min-width: 0;

  height: 52px;

  display: flex;

  align-items: center;

  gap: 12px;

  padding:
    0 16px;

  background:
    #ffffff;

  border-radius:
    8px;

  box-shadow:
    0 3px 12px
    rgba(
      0,
      0,
      0,
      0.08
    );
}


.search-icon {
  flex-shrink:
    0;

  font-size:
    25px;

  color:
    #3f2d20;
}


.search-box input {
  width: 100%;

  min-width: 0;

  border:
    none;

  outline:
    none;

  background:
    transparent;

  font-size:
    14px;

  color:
    #333333;
}


.search-box input::placeholder {
  color:
    #999999;
}


/* =========================
   SMALL SORT ICON
========================= */

.sort-icon-button {
  width: 44px;
  height: 44px;

  flex-shrink: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 0;

  border:
    1px solid #e4dbd4;

  border-radius:
    10px;

  background:
    #ffffff;

  color:
    #5c4030;

  cursor:
    pointer;

  box-shadow:
    0 2px 9px
    rgba(
      0,
      0,
      0,
      0.06
    );

  transition:
    transform 0.15s ease,
    background 0.15s ease;
}


.sort-icon-button ion-icon {
  font-size:
    21px;
}


.sort-icon-button:active {
  transform:
    scale(0.94);

  background:
    #f5efea;
}


/* =========================
   SORT DROPDOWN
========================= */

.sort-menu {
  min-width:
    230px;

  padding:
    8px;
}


.sort-menu-title {
  margin:
    6px 10px 8px;

  color:
    #91857d;

  font-size:
    10px;

  font-weight:
    700;

  letter-spacing:
    1px;

  text-transform:
    uppercase;
}


.sort-option {
  width:
    100%;

  padding:
    11px 12px;

  border:
    none;

  border-radius:
    7px;

  background:
    transparent;

  color:
    #564b44;

  font-size:
    13px;

  text-align:
    left;

  cursor:
    pointer;
}


.sort-option:hover {
  background:
    #f6f1ed;
}


.sort-option.active {
  background:
    #eee5de;

  color:
    #5c4030;

  font-weight:
    700;
}


/* =========================
   CATEGORIES
========================= */

.categories-section {
  margin-bottom:
    27px;
}


.categories-heading {
  display:
    flex;

  align-items:
    center;

  justify-content:
    space-between;

  margin-bottom:
    14px;
}


.categories-heading h2 {
  margin:
    0;

  font-size:
    22px;

  font-weight:
    750;

  color:
    #3f2d20;
}


.show-all-button {
  padding:
    5px 8px;

  border:
    none;

  background:
    transparent;

  color:
    #77675d;

  font-size:
    11px;

  cursor:
    pointer;
}


.categories-scroll {
  display:
    flex;

  gap:
    18px;

  overflow-x:
    auto;

  padding:
    3px 2px 10px;

  scrollbar-width:
    none;
}


.categories-scroll::-webkit-scrollbar {
  display:
    none;
}


/* CATEGORY ITEM */

.category-item {
  width:
    74px;

  flex-shrink:
    0;

  display:
    flex;

  flex-direction:
    column;

  align-items:
    center;

  gap:
    8px;

  padding:
    0;

  border:
    none;

  background:
    transparent;

  cursor:
    pointer;
}


/* CATEGORY CIRCLE */

.category-circle {
  width:
    68px;

  height:
    68px;

  overflow:
    hidden;

  border-radius:
    50%;

  background:
    #eee9e5;

  border:
    3px solid
    transparent;

  box-shadow:
    0 3px 9px
    rgba(
      0,
      0,
      0,
      0.14
    );

  transition:
    transform 0.2s ease,
    border-color 0.2s ease;
}


.category-circle img {
  width:
    100%;

  height:
    100%;

  object-fit:
    cover;
}


.category-no-cover {
  width:
    100%;

  height:
    100%;

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  color:
    #8c7c72;

  font-size:
    25px;
}


.all-category {
  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  background:
    linear-gradient(
      145deg,
      #f6f0ea,
      #ded1c7
    );
}


.all-books-icon {
  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  color:
    #5c4030;

  font-size:
    27px;
}


/* ACTIVE CATEGORY */

.category-item.active
.category-circle {
  border-color:
    #5c4030;

  transform:
    translateY(-2px);
}


.category-item span {
  width:
    100%;

  overflow:
    hidden;

  color:
    #625850;

  font-size:
    11px;

  line-height:
    1.2;

  text-align:
    center;

  white-space:
    nowrap;

  text-overflow:
    ellipsis;
}


.category-item.active span {
  color:
    #5c4030;

  font-weight:
    700;
}


/* =========================
   BOOK HEADING
========================= */

.books-heading {
  display:
    flex;

  justify-content:
    space-between;

  align-items:
    end;

  margin:
    8px 0 16px;
}


.books-heading h2 {
  margin:
    0;

  color:
    #3f2d20;

  font-size:
    21px;

  font-weight:
    750;
}


.books-heading p {
  margin:
    3px 0 0;

  color:
    #9a8d84;

  font-size:
    11px;
}


/* =========================
   BOOK GRID
========================= */

.books-grid {
  display:
    grid;

  grid-template-columns:
    repeat(
      3,
      minmax(
        0,
        1fr
      )
    );

  gap:
    26px 20px;
}


.book-item {
  min-width:
    0;

  cursor:
    pointer;
}


/* COVER */

.cover-box {
  width:
    100%;

  aspect-ratio:
    2 / 3;

  overflow:
    hidden;

  background:
    #ededed;

  border-radius:
    5px;

  box-shadow:
    0 4px 10px
    rgba(
      0,
      0,
      0,
      0.18
    );
}


.cover-box img {
  width:
    100%;

  height:
    100%;

  display:
    block;

  object-fit:
    cover;
}


.no-cover {
  width:
    100%;

  height:
    100%;

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  color:
    #999999;

  font-size:
    11px;
}


/* TITLE */

.book-title {
  margin:
    8px 3px 0;

  overflow:
    hidden;

  color:
    #595959;

  font-size:
    12px;

  line-height:
    1.3;

  white-space:
    nowrap;

  text-align:
    center;

  text-overflow:
    ellipsis;
}


/* =========================
   EMPTY
========================= */

.empty-state {
  padding:
    55px 20px;

  text-align:
    center;

  color:
    #8e837c;
}


.empty-state ion-icon {
  margin-bottom:
    8px;

  font-size:
    38px;
}


.empty-state h3 {
  margin:
    0 0 6px;

  color:
    #4d3c31;

  font-size:
    17px;
}


.empty-state p {
  margin:
    0;

  font-size:
    12px;
}


/* =========================
   DETAILS
========================= */

.details-content {
  --background:
    #ffffff;
}


.details-container {
  max-width:
    650px;

  margin:
    auto;

  padding:
    25px 28px 60px;
}


.book-hero {
  display:
    flex;

  align-items:
    center;

  gap:
    28px;

  padding:
    15px 0 30px;

  border-bottom:
    1px solid #eeeeee;
}


.detail-cover {
  width:
    145px;

  height:
    205px;

  flex-shrink:
    0;

  overflow:
    hidden;

  border-radius:
    5px;

  box-shadow:
    0 5px 15px
    rgba(
      0,
      0,
      0,
      0.18
    );
}


.detail-cover img {
  width:
    100%;

  height:
    100%;

  object-fit:
    cover;
}


.detail-no-cover {
  width:
    100%;

  height:
    100%;

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  background:
    #eeeeee;

  color:
    #999999;
}


.hero-info h1 {
  margin:
    0 0 9px;

  font-size:
    24px;

  color:
    #182237;
}


.hero-info p {
  margin:
    0 0 18px;

  color:
    #626262;

  font-size:
    16px;
}


.category-badge {
  display:
    inline-block;

  padding:
    5px 10px;

  border:
    1px solid #d8d8d8;

  border-radius:
    6px;

  color:
    #555555;

  font-size:
    11px;
}


/* =========================
   INFO
========================= */

.info-section {
  padding-top:
    30px;
}


.info-item {
  margin-bottom:
    27px;
}


.info-item label {
  display:
    block;

  margin-bottom:
    10px;

  color:
    #182237;

  font-size:
    11px;

  font-weight:
    800;

  letter-spacing:
    1.4px;

  text-transform:
    uppercase;
}


.info-item p {
  margin:
    0;

  color:
    #777777;

  font-size:
    15px;

  line-height:
    1.6;
}


/* =========================
   GALLERY
========================= */

.gallery-grid {
  display:
    grid;

  grid-template-columns:
    repeat(
      2,
      minmax(
        0,
        1fr
      )
    );

  gap:
    10px;

  margin-top:
    12px;
}


.gallery-grid img {
  width:
    100%;

  aspect-ratio:
    4 / 3;

  object-fit:
    cover;

  border-radius:
    8px;

  cursor:
    pointer;

  transition:
    transform 0.2s ease;
}


.gallery-grid img:active {
  transform:
    scale(0.97);
}


/* =========================
   FULLSCREEN GALLERY
========================= */

.gallery-toolbar {
  --background:
    #111111;

  --color:
    #ffffff;
}


.gallery-viewer {
  --background:
    #111111;
}


.page-slider {
  width:
    100%;

  height:
    100%;

  display:
    flex;

  overflow-x:
    auto;

  scroll-snap-type:
    x mandatory;

  scroll-behavior:
    smooth;

  overscroll-behavior-x:
    contain;

  scrollbar-width:
    none;
}


.page-slider::-webkit-scrollbar {
  display:
    none;
}


.page-slide {
  min-width:
    100%;

  height:
    100%;

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  padding:
    20px;

  box-sizing:
    border-box;

  scroll-snap-align:
    start;

  perspective:
    1200px;
}


.page-frame {
  width:
    88%;

  max-width:
    560px;

  max-height:
    82vh;

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  overflow:
    hidden;

  background:
    #ffffff;

  border-radius:
    6px;

  box-shadow:
    0 15px 40px
    rgba(
      0,
      0,
      0,
      0.5
    );
}


.page-frame img {
  width:
    100%;

  max-height:
    82vh;

  object-fit:
    contain;
}


/* =========================
   DESKTOP
========================= */

@media (
  min-width: 700px
) {

  .books-grid {
    grid-template-columns:
      repeat(
        5,
        minmax(
          0,
          1fr
        )
      );
  }


  .category-item {
    width:
      86px;
  }


  .category-circle {
    width:
      76px;

    height:
      76px;
  }

}


/* =========================
   MOBILE
========================= */

@media (
  max-width: 500px
) {

  .all-books-page {
    padding:
      18px 16px 100px;
  }


  .search-row {
    gap:
      7px;
  }


  .search-box {
    height:
      48px;

    padding:
      0 13px;
  }


  .sort-icon-button {
    width:
      42px;

    height:
      42px;
  }


  .categories-scroll {
    gap:
      14px;
  }


  .category-item {
    width:
      68px;
  }


  .category-circle {
    width:
      62px;

    height:
      62px;
  }


  .details-container {
    padding:
      18px 22px 50px;
  }


  .book-hero {
    gap:
      20px;
  }


  .detail-cover {
    width:
      110px;

    height:
      160px;
  }


  .hero-info h1 {
    font-size:
      19px;
  }


  .hero-info p {
    font-size:
      14px;
  }

}

</style>