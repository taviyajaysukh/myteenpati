<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar color="primary">
                <ion-title style="display:inline-block">
                    <ion-icon :icon="arrowBack" @click="() => router.go(-1)" /><span class="ion-margin-start">Bonus Record</span>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row class="border-bottom-ctm">
                    <ion-col>
                        <ion-text>
                           Record not found
                        </ion-text>
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
import {
    IonContent, IonPage, IonHeader, IonToolbar, IonGrid, IonRow, IonCol,IonIcon,IonTitle,IonText,IonFooter
} from '@ionic/vue';
import { defineComponent } from 'vue';
import FooterPage from '../include/FooterPage.vue'
import { arrowBack,helpCircle } from 'ionicons/icons';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'BonusrecordPage',
    components: {
        IonContent, IonPage, IonHeader, IonToolbar, IonGrid, IonRow, IonCol,IonIcon,IonTitle,IonText,IonFooter, FooterPage
    },
    setup() {
        const router = useRouter();
        return {
            arrowBack, helpCircle,router
        }
    },
    data(){
        return{
            currentUser:''
        }
    },
    ionViewDidEnter() {
    this.currentUser = localStorage.getItem('session_user') || '';
    if (Object.keys(this.currentUser).length == 0) {
      this.router.push('/my/login')
    }
  },
    methods: {
    test(){
        console.log('test')
    }
  }
});
</script>
<style scoped>
.border-bottom-ctm{
    border-bottom:2px solid gray;
    padding:5px;
}
</style>