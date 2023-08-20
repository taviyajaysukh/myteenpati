<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primary">
        <ion-title>Not Found</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      
      <ion-label>
        <h1>Not Found...</h1>
      </ion-label>
       
      <FooterPage />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel } from '@ionic/vue';
import { defineComponent } from 'vue';
import FooterPage from './include/FooterPage.vue'
export default defineComponent({
  name: 'PathNotFound',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    FooterPage,
    IonLabel
  },
  setup() {
    return {
    
    }
  }
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
</style>
