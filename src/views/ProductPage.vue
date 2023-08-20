<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primary">
        <ion-title style="display: inline-block">
          <ion-icon :icon="arrowBack" @click="() => router.go(-1)" />Product
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <swiper
        :modules="modules"
        :autoplay="true"
        :keyboard="true"
        :loop="true"
        :pagination="true"
        :scrollbar="true"
        :zoom="true"
      >
        <swiper-slide>
          <ion-img :src="slide1" style="width: 600px; height: 400px"></ion-img>
        </swiper-slide>
        <swiper-slide>
          <ion-img :src="slide2" style="width: 600px; height: 400px"></ion-img>
        </swiper-slide>
        <swiper-slide>
          <ion-img :src="slide3" style="width: 600px; height: 400px"></ion-img>
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
      <ion-grid>
        <ion-row>
          <div class="table_info">
            <table>
              <thead>
                <tr>
                  <th>Product Specifications</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Brand</td>
                  <td>Ananth Jewels</td>
                </tr>
                <tr>
                  <td>Collection</td>
                  <td>Ananth Jewels 925 Silver BIS Hallmark Collection</td>
                </tr>
                <tr>
                  <td>Stone</td>
                  <td>Cubic Zirconia</td>
                </tr>
                <tr>
                  <td>Resizable?</td>
                  <td>Y</td>
                </tr>

                <tr>
                  <td>Material</td>
                  <td>sterling-silver</td>
                </tr>

                <tr>
                  <td>Metal</td>
                  <td>Stamp&#xFEFF; 925-Sterling</td>
                </tr>
                <tr>
                  <td>Metal</td>
                  <td>Silver</td>
                </tr>
                <tr>
                  <td>Model Number</td>
                  <td>SLB069</td>
                </tr>
                <tr>
                  <td>Packaging</td>
                  <td>Comes with a Case for Gifting</td>
                </tr>
                <tr>
                  <td>Stone Shape&#xFEFF;</td>
                  <td>Round</td>
                </tr>
                <tr>
                  <td>Stone Colour&#xFEFF;</td>
                  <td>Clear</td>
                </tr>
                <tr>
                  <td>Stone Clarity&#xFEFF;</td>
                  <td>FL</td>
                </tr>
                <tr>
                  <td>Stone Cut&#xFEFF;</td>
                  <td>deal</td>
                </tr>
                <tr>
                  <td>Inscription</td>
                  <td>925</td>
                </tr>
                <tr>
                  <td>Stone Creation Method&#xFEFF;</td>
                  <td>simulated</td>
                </tr>
              </tbody>
            </table>
          </div>
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
import axios from "axios";
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonicSlides,
  IonImg,
  IonButton,
} from "@ionic/vue";
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { defineComponent, computed } from "vue";
import FooterPage from "./include/FooterPage.vue";
import { arrowBack, helpCircle } from "ionicons/icons";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ApplyrecordPage",
  components: {
    IonContent,
    IonPage,
    IonHeader,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    Swiper,
    SwiperSlide,
    IonImg,
    IonButton,
    FooterPage,
  },
  setup() {
    const router = useRouter();
    const slide1 = computed(() => "/assets/products/product3.jpg");
    const slide2 = computed(() => "/assets/products/product1.jpg");
    const slide3 = computed(() => "/assets/products/product2.jpg");
    return {
      modules: [Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides],
      arrowBack,
      helpCircle,
      router,
      slide1,
      slide2,
      slide3,
    };
  },
  data(){
    return{
        products:null
    }
  },
  methods: {
    async getProduct() {
      await axios
        .get("http://localhost:5000/getProduct")
        .then((res) => (this.products = res.data.data));
    },
  },
});
</script>
<style scoped>
.border-bottom-ctm {
  border-bottom: 2px solid gray;
  padding: 5px;
}
.table_info {
  width: 100%;
}
.table_info table {
  width: 100%;
  border-collapse: collapse;
}

.table_info table tr {
  height: 56px;
  line-height: 56px;
  border-bottom: 1px solid #e0e0e0;
  font-size: 12px;
}

.table_info table tr td,
.table_info table tr th {
  width: 50%;
  padding: 0 15px 0 8%;
  box-sizing: border-box;
  text-align: left;
  line-height: 1.5;
}
</style>
