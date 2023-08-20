<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col>
            <div class="input_box">
              <!-- Input with value -->
              <ion-input type="text" @input="searchProduct" placeholder="Search for good"></ion-input>
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col :if="isValue"  v-for="value in products" :key="value.productPrice">
            <div class="product-card">
              <div class="product-image">
                <ion-img :src="`/assets/products/${value.productImage}`"   class="pimg"></ion-img>
                <ion-label class="prd-label">
                  <h4>{{ value.productName }}</h4>
                </ion-label>
              </div>
              <div class="product-content">
                <p class="ion-text-red">₹{{ value.productPrice }}</p>
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
import axios from "axios";
import { IonContent, IonPage, IonImg, IonLabel, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { defineComponent, computed } from 'vue';
import FooterPage from './include/FooterPage.vue'
import { useRouter } from "vue-router";
export default defineComponent({
  name: 'SearchPage',
  components: {
    IonContent,
    IonPage,
    FooterPage,
    IonImg,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol
  },
  setup() {
    const router = useRouter();
    const slide1 = computed(() => '/assets/slider/slider1.webp')
    const slide2 = computed(() => '/assets/slider/slider2.jpg')
    const slide3 = computed(() => '/assets/slider/slider3.jpg')
    return {
      slide1,
      slide2,
      slide3,
      router
    }
  },
  data() {
    return {
      products: [{"productName":'',"productImage":'',"productPrice":0}],
      isValue:false
    }
  },
  mounted() {
    this.getProduct()
  },
  methods: {
    async getProduct() {
      await axios
        .get("http://localhost:5000/getProduct")
        .then((res) => (this.products = res.data.data));
    },
    async searchProduct($event:any){
      let searchm = $event.target.value
      this.products = [{"productName":'',"productImage":'',"productPrice":0}]
      await axios
        .post("http://localhost:5000/searchProduct",{"searnm":searchm})
        .then(function(this:any,res:any){
          if(res.data.length > 0){
            this.products = res.data
            this.isValue = true;
          }
        }.bind(this));
    }
  },
});
</script>

<style scoped>
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

.product-card {
  background-color: #fff;
  border-color: #fff;
  color: rgba(0, 0, 0, .87);
  transition: .3s cubic-bezier(.25, .8, .5, 1);
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
  border-radius: 2px;
  padding: 10px;
  overflow: hidden;
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
  font-size: 18px;
}

.ion-text-red {
  color: #f39839;
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
