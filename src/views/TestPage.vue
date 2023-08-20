<template>
  <ion-page>
    <ion-content>
      <swiper :modules="modules" :autoplay="true" :keyboard="true" :loop="true" :pagination="true" :scrollbar="true"
        :zoom="true">
        <swiper-slide>
          <ion-img :src="slide1" style="width:600px;height:400px;"></ion-img>
        </swiper-slide>
        <swiper-slide>
          <ion-img :src="slide2" style="width:600px;height:400px;"></ion-img>
        </swiper-slide>
        <swiper-slide>
          <ion-img :src="slide3" style="width:600px;height:400px;"></ion-img>
        </swiper-slide>
      </swiper>
      <ion-grid>
      <ion-row>
      <ion-col>
      <h4>LIZZIE MANDLER</h4>
      <h4>₹ 26024.00</h4>
      <ion-button>Soltout</ion-button>
      </ion-col>
      </ion-row>
      </ion-grid>
       
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { IonContent, IonPage,IonGrid,IonRow,IonCol, IonicSlides, IonImg,IonButton } from '@ionic/vue';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import '@ionic/vue/css/ionic-swiper.css';

export default defineComponent({
  components: { Swiper, SwiperSlide, IonContent, IonPage,IonGrid,IonRow,IonCol, IonImg,IonButton },
  setup() {
    const slide1 = computed(() => '/assets/products/product3.jpg')
    const slide2 = computed(() => '/assets/products/product1.jpg')
    const slide3 = computed(() => '/assets/products/product2.jpg')
    return {
      modules: [Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides],
      slide1, slide2, slide3
    };
  },
});
</script>