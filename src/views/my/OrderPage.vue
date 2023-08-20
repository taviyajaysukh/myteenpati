<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primary">
        <ion-title>
        <ion-icon :icon="arrowBack" @click="() => router.go(-1)" /> <span class="ion-margin-start">Orders</span>
      </ion-title>
      </ion-toolbar>
    </ion-header>
    <!-- Segment with default selection -->
    <ion-segment class="segment-class" @ionChange="segmentChanged($event)" value="all">
      
      <ion-segment-button value="all">
        <ion-label>All</ion-label>
      </ion-segment-button>
      <ion-segment-button value="undeliver">
        <ion-label>Undeliver</ion-label>
      </ion-segment-button>
      <ion-segment-button value="unreceive">
        <ion-label>Unreceive</ion-label>
      </ion-segment-button>
      <ion-segment-button value="success">
        <ion-label>Success</ion-label>
      </ion-segment-button>
    </ion-segment>
    <ion-content>
      <ion-card v-if="segmentModel === 'all'">
        <ion-card-header>
          <ion-card-subtitle>All orders</ion-card-subtitle>
          <ion-card-title>Settings</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          Keep close to Nature's heart... and break clear away, once in awhile,
          and climb a mountain or spend a week in the woods. Wash your spirit clean.
        </ion-card-content>
      </ion-card>
      <ion-card v-if="segmentModel === 'undeliver'">
        <ion-card-header>
          <ion-card-subtitle>Undeliver order</ion-card-subtitle>
          <ion-card-title>Just</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          Keep close to Nature's heart... and break clear away, once in awhile,
          and climb a mountain or spend a week in the woods. Wash your spirit clean.
        </ion-card-content>
      </ion-card>
      <ion-card v-if="segmentModel === 'unreceive'">
        <ion-card-header>
          <ion-card-subtitle>Unreceive Order</ion-card-subtitle>
          <ion-card-title>One More</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          Keep close to Nature's heart... and break clear away, once in awhile,
          and climb a mountain or spend a week in the woods. Wash your spirit clean.
        </ion-card-content>
      </ion-card>
      <ion-card v-if="segmentModel === 'success'">
        <ion-card-header>
          <ion-card-subtitle>Success Order</ion-card-subtitle>
          <ion-card-title>To Fill</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          Keep close to Nature's heart... and break clear away, once in awhile,
          and climb a mountain or spend a week in the woods. Wash your spirit clean.
        </ion-card-content>
      </ion-card>
    </ion-content>
    <ion-footer>
      <h1>Footer</h1>
      <FooterPage />
    </ion-footer>
  </ion-page>
</template>
  
<script lang="ts">
import { IonContent, IonPage, IonTitle, IonLabel, IonSegment, IonSegmentButton,IonIcon,IonCardSubtitle,IonCardTitle,IonCardHeader,IonCardContent,IonCard,IonFooter } from '@ionic/vue';
import { defineComponent } from 'vue';
import FooterPage from '../include/FooterPage.vue'
import { useRouter } from 'vue-router';
import { arrowBack } from 'ionicons/icons';
export default defineComponent({
  components: { IonContent, IonPage, IonTitle, IonLabel, IonSegment, IonSegmentButton,IonIcon,IonCardSubtitle,IonCardTitle,IonCardHeader,IonCardContent,IonCard,IonFooter, FooterPage },
  setup() {
    const router = useRouter()
    return {
      router, arrowBack
    }
  },
  data() {
    return {
      segmentModel: "all",
      currentUser: ''
    }
  },
  methods: {
    segmentChanged(ev: CustomEvent) {
      this.segmentModel = ev.detail.value;
    }
  }
});
</script>
<style>
.segment-class {
  background: #009688;
  color: #fff;
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
  transition: .2s cubic-bezier(.4, 0, .2, 1);

}

.segment-button-has-label {
  padding: 10px 5px 0 50px;
  color: #cee0de
}

.segment-button-checked {
  color: #fff;
  --color-checked: #fff;
  --indicator-height: 5px;
}

.segment-button-checked:hover {
  background: #009688;
  color: #fff;
  --color-checked: #fff;
}
</style>