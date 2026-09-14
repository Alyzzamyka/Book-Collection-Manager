<template>
  <div class="add-wrapper">

    <div class="add-card">

      <!-- HEADER -->
      <div class="add-header">
        <p class="eyebrow">NEW BOOK</p>

        <h2>Add Book</h2>

        <p class="subtitle">
          Add a new book to your collection.
        </p>
      </div>


      <!-- BOOK COVER -->
      <div class="cover-section">

        <label class="section-label">
          Book Cover
        </label>

        <div class="cover-area">

          <div class="cover-preview">

            <img
              v-if="coverPreview"
              :src="coverPreview"
              alt="Book Cover Preview"
            />

            <div
              v-else
              class="no-cover"
            >
              No Cover
            </div>

          </div>


          <div class="cover-actions">

            <label
              for="add-cover-input"
              class="upload-button"
            >
              Choose Cover
            </label>

            <input
              id="add-cover-input"
              type="file"
              accept="image/*"
              @change="handleCoverUpload"
            />

            <p class="cover-note">
              JPG, PNG, or WEBP
            </p>

          </div>

        </div>

      </div>


      <!-- FORM -->
      <div class="form-section">

        <!-- TITLE -->
        <div class="field-group">

          <label class="field-label">
            Book Title
          </label>


          <ion-item
            lines="none"
            class="input-item"
          >
            <ion-input
              v-model="book.title"
              placeholder="Enter book title"
            />
          </ion-item>

        </div>

        

        <!-- AUTHOR -->
        <div class="field-group">

          <label class="field-label">
            Author
          </label>

          <ion-item
            lines="none"
            class="input-item"
          >
            <ion-input
              v-model="book.author"
              placeholder="Enter author name"
            />
          </ion-item>

        </div>

        <!-- LANGUAGE -->
<div class="field-group">

  <label class="field-label">
    Language
  </label>

  <ion-item
    lines="none"
    class="input-item"
  >
    <ion-input
      v-model="book.language"
      placeholder="Enter language"
    />
  </ion-item>

</div>


        <!-- ISBN -->
        <div class="field-group">

          <label class="field-label">
            ISBN
            <span class="optional">
              Optional
            </span>
          </label>

          <ion-item
            lines="none"
            class="input-item"
          >
            <ion-input
              v-model="book.isbn"
              placeholder="Enter ISBN"
            />
          </ion-item>

        </div>


        <!-- PUBLISHER -->
        <div class="field-group">

          <label class="field-label">
            Publisher
          </label>

          <ion-item
            lines="none"
            class="input-item"
          >
            <ion-input
              v-model="book.publisher"
              placeholder="Enter publisher"
            />
          </ion-item>

        </div>


        <!-- CATEGORY -->
        <div class="field-group">

          <label class="field-label">
            Category
          </label>

          <ion-item
            lines="none"
            class="input-item"
          >

            <ion-select
              v-model="book.category"
              placeholder="Select category"
              interface="popover"
            >

              <ion-select-option value="Fiction">
                Fiction
              </ion-select-option>

              <ion-select-option value="Non-Fiction">
                Non-Fiction
              </ion-select-option>

              <ion-select-option value="Fantasy">
                Fantasy
              </ion-select-option>

              <ion-select-option value="Mystery">
                Mystery
              </ion-select-option>

              <ion-select-option value="Romance">
                Romance
              </ion-select-option>

              <ion-select-option value="Science Fiction">
                Science Fiction
              </ion-select-option>

              <ion-select-option value="Educational">
                Educational
              </ion-select-option>

              <ion-select-option value="Biography">
                Biography
              </ion-select-option>

              <ion-select-option value="Other">
                Other
              </ion-select-option>

            </ion-select>

          </ion-item>

        </div>


        <!-- PUBLICATION YEAR -->
        <div class="field-group">

          <label class="field-label">
            Publication Year
          </label>

          <ion-item
            lines="none"
            class="input-item"
          >
            <ion-input
              v-model="book.publicationYear"
              type="number"
              placeholder="Enter publication year"
            />
          </ion-item>

        </div>


        <!-- PAGES -->
        <div class="field-group">

          <label class="field-label">
            Pages
          </label>

          <ion-item
            lines="none"
            class="input-item"
          >
            <ion-input
              v-model="book.pages"
              type="number"
              placeholder="Enter number of pages"
            />
          </ion-item>

        </div>


        <!-- EDITION -->
        <div class="field-group">

          <label class="field-label">
            Edition
            <span class="optional">
              Optional
            </span>
          </label>

          <ion-item
            lines="none"
            class="input-item"
          >
            <ion-input
              v-model="book.edition"
              placeholder="Example: 2nd Edition"
            />
          </ion-item>

        </div>


        <!-- FORMAT -->
        <div class="field-group">

          <label class="field-label">
            Format
          </label>

          <ion-item
            lines="none"
            class="input-item"
          >

            <ion-select
              v-model="book.format"
              placeholder="Select format"
              interface="popover"
            >

              <ion-select-option value="Audiobook">
                Audiobook
              </ion-select-option>

              <ion-select-option value="Board">
                Board
              </ion-select-option>

              <ion-select-option value="Boxed Set">
                Boxed Set
              </ion-select-option>

              <ion-select-option value="Compact Disc">
                Compact Disc
              </ion-select-option>

              <ion-select-option value="Ebook">
                Ebook
              </ion-select-option>

              <ion-select-option value="Hardcover">
                Hardcover
              </ion-select-option>

              <ion-select-option value="Leatherbound">
                Leatherbound
              </ion-select-option>

              <ion-select-option value="Nontraditional">
                Nontraditional
              </ion-select-option>

              <ion-select-option value="Notebook">
                Notebook
              </ion-select-option>

              <ion-select-option value="Package">
                Package
              </ion-select-option>

              <ion-select-option value="Video">
                Video
              </ion-select-option>

            </ion-select>

          </ion-item>

        </div>


        <!-- STATUS -->
        <div class="field-group">

          <label class="field-label">
            Availability Status
          </label>

          <ion-item
            lines="none"
            class="input-item"
          >

            <ion-select
              v-model="book.status"
              placeholder="Select status"
              interface="popover"
            >

              <ion-select-option value="Available">
                Available
              </ion-select-option>

              <ion-select-option value="Borrowed">
                Borrowed
              </ion-select-option>

              <ion-select-option value="Unavailable">
                Unavailable
              </ion-select-option>

            </ion-select>

          </ion-item>

        </div>


        <!-- DESCRIPTION -->
        <div class="field-group">

          <label class="field-label">
            Description
          </label>

          <ion-item
            lines="none"
            class="input-item description-item"
          >

            <ion-textarea
              v-model="book.description"
              placeholder="Write a short description of the book..."
              :auto-grow="true"
              :rows="5"
            />

          </ion-item>

        </div>

      </div>


      <!-- GALLERY -->
      <div class="gallery-section">

        <div class="gallery-heading">

          <div>
            <label class="section-label">
              Gallery
            </label>

            <p class="gallery-note">
              Add up to 4 additional pictures.
            </p>
          </div>

          <span class="gallery-count">
            {{ galleryImages.length }}/4
          </span>

        </div>


        <label
          v-if="galleryImages.length < 4"
          for="gallery-input"
          class="gallery-upload"
        >
          + Add Gallery Photos
        </label>

        <input
          id="gallery-input"
          type="file"
          accept="image/*"
          multiple
          @change="handleGalleryUpload"
        />


        <!-- GALLERY PREVIEW -->
        <div
          v-if="galleryImages.length > 0"
          class="gallery-grid"
        >

          <div
            v-for="(image, index) in galleryImages"
            :key="index"
            class="gallery-item"
          >

            <img
              :src="image"
              alt="Gallery Image"
            />

            <button
              type="button"
              class="remove-gallery"
              @click="removeGalleryImage(index)"
            >
              ×
            </button>

          </div>

        </div>

      </div>


      <!-- ADD BUTTON -->
      <div class="button-group">

        <ion-button
          expand="block"
          class="add-button"
          @click="addBook"
        >
          Add Book
        </ion-button>

      </div>

    </div>

  </div>
</template>


<script setup lang="ts">

import {
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton
} from '@ionic/vue';

import {
  reactive,
  ref
} from 'vue';


interface BookForm {
  title: string;
  author: string;
  language: string;
  isbn: string;
  publisher: string;
  category: string;
  publicationYear: string;
  pages: string;
  edition: string;
  format: string;
  status: string;
  description: string;
}


/* =========================
   FORM DATA
========================= */

const book = reactive<BookForm>({
  title: '',
  author: '',
  language: '',
  isbn: '',
  publisher: '',
  category: '',
  publicationYear: '',
  pages: '',
  edition: '',
  format: '',
  status: '',
  description: ''
});


const coverPreview =
  ref<string>('');


const galleryImages =
  ref<string[]>([]);


/* =========================
   EMIT
========================= */

const emit = defineEmits<{
  (
    e: 'add-book',
    book: {
      title: string;
      author: string;
      language: string;
      isbn: string;
      publisher: string;
      category: string;
      publicationYear: string;
      pages: string;
      edition: string;
      format: string;
      status: string;
      description: string;
      coverPreview: string;
      galleryImages: string[];
    }
  ): void;
}>();


/* =========================
   IMAGE TO BASE64
========================= */

const fileToBase64 = (
  file: File
): Promise<string> => {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      const reader =
        new FileReader();


      reader.onload = () => {

        resolve(
          reader.result as string
        );

      };


      reader.onerror = () => {

        reject(
          new Error(
            'Unable to read image.'
          )
        );

      };


      reader.readAsDataURL(
        file
      );

    }
  );

};


/* =========================
   BOOK COVER
========================= */

const handleCoverUpload =
  async (
    event: Event
  ) => {

    const input =
      event.target as HTMLInputElement;


    if (
      !input.files ||
      !input.files[0]
    ) {

      return;

    }


    try {

      coverPreview.value =
        await fileToBase64(
          input.files[0]
        );

    } catch (error) {

      console.error(
        'Error reading cover:',
        error
      );

      alert(
        'Failed to load book cover.'
      );

    }

  };


/* =========================
   GALLERY
========================= */

const handleGalleryUpload =
  async (
    event: Event
  ) => {

    const input =
      event.target as HTMLInputElement;


    if (!input.files) {

      return;

    }


    const remainingSlots =
      4 -
      galleryImages.value.length;


    if (
      remainingSlots <= 0
    ) {

      alert(
        'Maximum of 4 gallery pictures only.'
      );

      input.value = '';

      return;

    }


    const selectedFiles =
      Array.from(
        input.files
      ).slice(
        0,
        remainingSlots
      );


    try {

      for (
        const file of selectedFiles
      ) {

        const image =
          await fileToBase64(
            file
          );


        galleryImages.value.push(
          image
        );

      }


      if (
        input.files.length >
        remainingSlots
      ) {

        alert(
          'Only 4 gallery pictures are allowed.'
        );

      }

    } catch (error) {

      console.error(
        'Error reading gallery image:',
        error
      );

      alert(
        'Failed to load one of the gallery pictures.'
      );

    }


    input.value = '';

  };


const removeGalleryImage = (
  index: number
) => {

  galleryImages.value.splice(
    index,
    1
  );

};


/* =========================
   ADD BOOK
========================= */

const addBook = () => {

  /* REQUIRED FIELDS */
  if (
    !book.title.trim() ||
    !book.author.trim() ||
    !book.language.trim() ||
    !book.publisher.trim() ||
    !book.category ||
    !book.publicationYear ||
    !book.pages ||
    !book.format ||
    !book.status ||
    !book.description.trim()
  ) {

    alert(
      'Please complete all required book information.'
    );

    return;

  }


  /* VALIDATE PAGES */
  if (
    Number(book.pages) <= 0
  ) {

    alert(
      'Pages must be greater than 0.'
    );

    return;

  }


  /* SEND BOOK TO HOMEPAGE */
  emit(
    'add-book',
    {
      title:
        book.title.trim(),

      author:
        book.author.trim(),

      language:
        book.language.trim(),

      isbn:
        book.isbn.trim(),

      publisher:
        book.publisher.trim(),

      category:
        book.category,

      publicationYear:
        book.publicationYear,

      pages:
        book.pages,

      edition:
        book.edition.trim(),

      format:
        book.format,

      status:
        book.status,

      description:
        book.description.trim(),

      coverPreview:
        coverPreview.value,

      galleryImages:
        [...galleryImages.value]
    }
  );


  /* CLEAR AFTER SUCCESSFUL EMIT */
  clearForm();

};


/* =========================
   CLEAR FORM
========================= */

const clearForm = () => {

  book.title = '';
  book.author = '';
  book.language = '';
  book.isbn = '';
  book.publisher = '';
  book.category = '';
  book.publicationYear = '';
  book.pages = '';
  book.edition = '';
  book.format = '';
  book.status = '';
  book.description = '';

  coverPreview.value = '';

  galleryImages.value = [];

};

</script>


<style scoped>

.add-wrapper {
  width: 100%;
}

.add-card {
  max-width: 650px;

  margin: 0 auto;

  padding: 22px;

  background: #ffffff;

  border-radius: 20px;

  border: 1px solid #eadfd6;

  box-shadow:
    0 6px 20px
    rgba(75, 53, 39, 0.07);
}


/* HEADER */

.add-header {
  margin-bottom: 24px;
}

.eyebrow {
  margin: 0 0 4px;

  font-size: 11px;

  font-weight: 700;

  letter-spacing: 1.5px;

  color: #9a7658;
}

.add-header h2 {
  margin: 0;

  font-size: 27px;

  font-weight: 800;

  color: #3f2d20;
}

.subtitle {
  margin: 5px 0 0;

  font-size: 13px;

  color: #887b72;
}


/* COVER */

.cover-section {
  margin-bottom: 28px;
}

.section-label {
  display: block;

  margin-bottom: 8px;

  font-size: 13px;

  font-weight: 700;

  color: #4e3a2d;
}

.cover-area {
  display: flex;

  align-items: center;

  gap: 18px;
}

.cover-preview {
  width: 120px;

  height: 165px;

  overflow: hidden;

  border-radius: 14px;

  background: #ece4dd;

  border: 1px solid #dfd3ca;
}

.cover-preview img {
  width: 100%;
  height: 100%;

  object-fit: cover;
}

.no-cover {
  width: 100%;
  height: 100%;

  display: flex;

  align-items: center;
  justify-content: center;

  font-size: 12px;

  color: #9b8b7e;
}

.cover-actions {
  flex: 1;
}

#add-cover-input,
#gallery-input {
  display: none;
}

.upload-button {
  display: inline-block;

  padding: 10px 15px;

  border-radius: 10px;

  background: #6b4b37;

  color: #ffffff;

  font-size: 12px;

  font-weight: 600;

  cursor: pointer;
}

.cover-note {
  margin: 7px 0 0;

  font-size: 11px;

  color: #978b82;
}


/* FORM */

.form-section {
  display: grid;

  gap: 16px;
}

.field-label {
  display: block;

  margin-bottom: 7px;

  font-size: 12px;

  font-weight: 650;

  color: #4f3c30;
}

.optional {
  margin-left: 5px;

  font-size: 10px;

  font-weight: 500;

  color: #a3958c;
}

.input-item {
  --background: #faf8f5;

  --padding-start: 13px;

  --inner-padding-end: 13px;

  min-height: 50px;

  border: 1px solid #e5dbd3;

  border-radius: 11px;
}

.description-item {
  min-height: 120px;
}


/* GALLERY */

.gallery-section {
  margin-top: 28px;

  padding-top: 22px;

  border-top:
    1px solid #eee4dc;
}

.gallery-heading {
  display: flex;

  align-items: flex-start;

  justify-content: space-between;
}

.gallery-note {
  margin: -3px 0 12px;

  font-size: 11px;

  color: #978b82;
}

.gallery-count {
  padding:
    4px 8px;

  border-radius: 20px;

  background: #eee6df;

  color: #655044;

  font-size: 11px;

  font-weight: 700;
}

.gallery-upload {
  display: inline-block;

  margin-bottom: 15px;

  padding:
    10px 14px;

  border:
    1px dashed #8d6c56;

  border-radius: 10px;

  color: #684a37;

  font-size: 12px;

  font-weight: 600;

  cursor: pointer;
}

.gallery-grid {
  display: grid;

  grid-template-columns:
    repeat(2, 1fr);

  gap: 10px;
}

.gallery-item {
  position: relative;

  overflow: hidden;

  aspect-ratio: 4 / 3;

  border-radius: 12px;

  background: #eee6df;
}

.gallery-item img {
  width: 100%;
  height: 100%;

  object-fit: cover;
}

.remove-gallery {
  position: absolute;

  top: 6px;
  right: 6px;

  width: 27px;
  height: 27px;

  padding: 0;

  border: none;

  border-radius: 50%;

  background:
    rgba(0, 0, 0, 0.65);

  color: white;

  font-size: 19px;

  line-height: 1;

  cursor: pointer;
}


/* BUTTON */

.button-group {
  margin-top: 28px;
}

.add-button {
  --background: #5f422f;

  --background-activated: #4e3526;

  --color: #ffffff;

  --border-radius: 11px;

  height: 48px;

  font-weight: 600;
}


@media (
  max-width: 430px
) {

  .add-card {
    padding: 18px;
  }

  .cover-preview {
    width: 105px;
    height: 145px;
  }

}

</style>