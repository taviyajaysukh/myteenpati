<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar class="bgcolord">
        <ion-thumbnail class="ion-margin-start">
          <ion-img :src="sitelogo" style="width:120px;height:50px;"></ion-img>
        </ion-thumbnail>
        <ion-label class="app-title-cls">
          <h2>
            Open with an app
          </h2>
        </ion-label>
        <button class="ion-float-right cut-dbtn">
          <ion-thumbnail>
            <ion-img :src="download" style="width:30px;height:22px;"></ion-img>
          </ion-thumbnail>
        </button>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-slides :options="slideOpts">
        <ion-slide>
          <ion-img :src="slide1" style="width:1200px;height:500px;"></ion-img>
        </ion-slide>
        <ion-slide>
          <ion-img :src="slide2" style="width:1200px;height:500px;"></ion-img>
        </ion-slide>
        <ion-slide>
          <ion-img :src="slide3" style="width:1200px;height:500px;"></ion-img>
        </ion-slide>
        <ion-slide>
          <ion-img :src="slide3" style="width:1200px;height:500px;"></ion-img>
        </ion-slide>
        <ion-slide>
          <ion-img :src="slide2" style="width:1200px;height:500px;"></ion-img>
        </ion-slide>
      </ion-slides>
      <ion-grid>
        <ion-row>
          <ion-col>
            <div class="product-card">
              <div class="product-image">
                <ion-img :src="slide1" class="pimg"></ion-img>
                <ion-label class="prd-label">
                  <h4>Guchi</h4>
                </ion-label>
              </div>
              <div class="product-content">
                <p>$5000</p>
              </div>
            </div>
          </ion-col>
          <ion-col>
            <div class="product-card">
              <div class="product-image">
                <ion-img :src="slide2" class="pimg"></ion-img>
                <ion-label class="prd-label">
                  <h4>Guchi</h4>
                </ion-label>
              </div>
              <div class="product-content">
                <p>$5000</p>
              </div>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ion-footer>
      <h1>Footer</h1>
      <FooterPage />
    </ion-footer>
  </ion-page>
</template>
<script lang="ts">
import { IonContent, IonHeader, IonFooter, IonPage, IonToolbar, IonThumbnail, IonImg, IonLabel, IonGrid, IonRow, IonCol, IonSlides, IonSlide } from '@ionic/vue';
import { defineComponent, computed } from 'vue';
import FooterPage from './include/FooterPage.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonThumbnail,
    IonImg,
    IonLabel,
    IonContent,
    IonHeader,
    IonFooter,
    IonPage,
    IonToolbar,
    FooterPage,
    IonSlides, IonSlide,
    IonCol, IonGrid, IonRow
  },
  setup() {
    const sitelogo = computed(() => '/assets/images/crlogo.png')
    const download = computed(() => '/assets/images/download.png')
    const slide1 = computed(() => '/assets/slider/slider1.webp')
    const slide2 = computed(() => '/assets/slider/slider2.jpg')
    const slide3 = computed(() => '/assets/slider/slider3.jpg')
    const slideOpts = {
      initialSlide: 0,
      spaceBetween: 50,
      speed: 3000,
      autoplay: true,
      loop: true,
      slidesPerView: 1,
      loopedSlidesLimit: 3,
      preloadImages: true
    }
    return {
      slideOpts,
      sitelogo,
      download,
      slide1,
      slide2,
      slide3,
    }
  },
  data() {
    return {
      user: 'test',
    }
  },
});


</script>

<style scoped>
.app-title-cls {
  position: relative;
  display: inline-flex;
  left: 250px;
  bottom: 35px;
  color: #4c4545;
}

#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}

.bgcolord {
  --background: #eeeeee;
  height: 50px;
}

.ripple-parent {
  position: relative;
  overflow: hidden;
}

ion-header {
  height: 50px;
}

.cut-dbtn {
  position: relative;
  bottom: 30px;
}

.product-card {
  border: 2px solid gray;
  padding: 30px;
}

.product-image .pimg {
  height: 60vh !important;
  width: 70vh !important;
  position: relative;
  left: 10%;
  align-items: center;
}

.prd-label {
  text-align: center;
}

.prd-label h4 {
  font-size: 24px;
}

/* Smartphones (portrait and landscape) ----------- */
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {

  /* Styles */
  .product-image .pimg {
    height: 40vh !important;
    width: 30vh !important;
    position: relative;
    left: 0;
    align-items: center;
  }
}

/* Smartphones (landscape) ----------- */
@media only screen and (max-width : 321px) {

  /* Styles */
  .product-image .pimg {
    height: 40vh !important;
    width: 30vh !important;
    position: relative;
    left: 0;
    align-items: center;
  }
}

/* Smartphones (portrait) ----------- */
@media only screen and (max-width : 320px) {

  /* Styles */
  .product-image .pimg {
    height: 40vh !important;
    width: 30vh !important;
    position: relative;
    left: 0;
    align-items: center;
  }
}

/* iPads (portrait and landscape) ----------- */
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) {

  /* Styles */
  .product-image .pimg {
    height: 40vh !important;
    width: 60vh !important;
    position: relative;
    left: 0;
    align-items: center;
  }
}

/* iPads (landscape) ----------- */
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape) {

  /* Styles */
  .product-image .pimg {
    height: 40vh !important;
    width: 60vh !important;
    position: relative;
    left: 0;
    align-items: center;
  }
}

/* iPads (portrait) ----------- */
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait) {

  /* Styles */
  .product-image .pimg {
    height: 40vh !important;
    width: 60vh !important;
    position: relative;
    left: 0;
    align-items: center;
  }
}

/**********
iPad 3
**********/
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape) and (-webkit-min-device-pixel-ratio : 2) {
  /* Styles */
}

@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait) and (-webkit-min-device-pixel-ratio : 2) {
  /* Styles */
}

/* Desktops and laptops ----------- */
@media only screen and (min-width : 1224px) {
  /* Styles */
}

/* Large screens ----------- */
@media only screen and (min-width : 1824px) {
  /* Styles */
}

/* iPhone 4 ----------- */
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) and (orientation : landscape) and (-webkit-min-device-pixel-ratio : 2) {

  /* Styles */
  .product-image .pimg {
    height: 40vh !important;
    width: 30vh !important;
    position: relative;
    left: 0;
    align-items: center;
  }
}

@media only screen and (min-device-width : 320px) and (max-device-width : 480px) and (orientation : portrait) and (-webkit-min-device-pixel-ratio : 2) {

  /* Styles */
  .product-image .pimg {
    height: 40vh !important;
    width: 30vh !important;
    position: relative;
    left: 0;
    align-items: center;
  }
}

/* iPhone 5 ----------- */
@media only screen and (min-device-width: 320px) and (max-device-height: 568px) and (orientation : landscape) and (-webkit-device-pixel-ratio: 2) {

  /* Styles */
  .product-image .pimg {
    height: 40vh !important;
    width: 30vh !important;
    position: relative;
    left: 0;
    align-items: center;
  }
}

@media only screen and (min-device-width: 320px) and (max-device-height: 568px) and (orientation : portrait) and (-webkit-device-pixel-ratio: 2) {

  /* Styles */
  .product-image .pimg {
    height: 40vh !important;
    width: 30vh !important;
    position: relative;
    left: 0;
    align-items: center;
  }
}

/* iPhone 6 ----------- */
@media only screen and (min-device-width: 375px) and (max-device-height: 667px) and (orientation : landscape) and (-webkit-device-pixel-ratio: 2) {

  /* Styles */
  .product-image .pimg {
    height: 40vh !important;
    width: 30vh !important;
    position: relative;
    left: 0;
    align-items: center;
  }

}

@media only screen and (min-device-width: 375px) and (max-device-height: 667px) and (orientation : portrait) and (-webkit-device-pixel-ratio: 2) {

  /* Styles */
  .product-image .pimg {
    height: 40vh !important;
    width: 30vh !important;
    position: relative;
    left: 0;
    align-items: center;
  }
}

/* iPhone 6+ ----------- */
@media only screen and (min-device-width: 414px) and (max-device-height: 736px) and (orientation : landscape) and (-webkit-device-pixel-ratio: 2) {

  /* Styles */
  .product-image .pimg {
    height: 40vh !important;
    width: 30vh !important;
    position: relative;
    left: 0;
    align-items: center;
  }
}

@media only screen and (min-device-width: 414px) and (max-device-height: 736px) and (orientation : portrait) and (-webkit-device-pixel-ratio: 2) {

  /* Styles */
  .product-image .pimg {
    height: 40vh !important;
    width: 30vh !important;
    position: relative;
    left: 0;
    align-items: center;
  }
}

/* Samsung Galaxy S3 ----------- */
@media only screen and (min-device-width: 320px) and (max-device-height: 640px) and (orientation : landscape) and (-webkit-device-pixel-ratio: 2) {

  /* Styles */
  .product-image .pimg {
    height: 40vh !important;
    width: 30vh !important;
    position: relative;
    left: 0;
    align-items: center;
  }
}

@media only screen and (min-device-width: 320px) and (max-device-height: 640px) and (orientation : portrait) and (-webkit-device-pixel-ratio: 2) {

  /* Styles */
  .product-image .pimg {
    height: 40vh !important;
    width: 30vh !important;
    position: relative;
    left: 0;
    align-items: center;
  }
}

/* Samsung Galaxy S4 ----------- */
@media only screen and (min-device-width: 320px) and (max-device-height: 640px) and (orientation : landscape) and (-webkit-device-pixel-ratio: 3) {

  /* Styles */
  .product-image .pimg {
    height: 40vh !important;
    width: 30vh !important;
    position: relative;
    left: 0;
    align-items: center;
  }
}

@media only screen and (min-device-width: 320px) and (max-device-height: 640px) and (orientation : portrait) and (-webkit-device-pixel-ratio: 3) {

  /* Styles */
  .product-image .pimg {
    height: 40vh !important;
    width: 30vh !important;
    position: relative;
    left: 0;
    align-items: center;
  }
}

/* Samsung Galaxy S5 ----------- */
@media only screen and (min-device-width: 360px) and (max-device-height: 640px) and (orientation : landscape) and (-webkit-device-pixel-ratio: 3) {

  /* Styles */
  .product-image .pimg {
    height: 40vh !important;
    width: 30vh !important;
    position: relative;
    left: 0;
    align-items: center;
  }
}

@media only screen and (min-device-width: 360px) and (max-device-height: 640px) and (orientation : portrait) and (-webkit-device-pixel-ratio: 3) {

  /* Styles */
  .product-image .pimg {
    height: 40vh !important;
    width: 30vh !important;
    position: relative;
    left: 0;
    align-items: center;
  }
}
</style>
