<template>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="Home" href="/home">
          <ion-icon :icon="home" />
          <ion-label>Home</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="search" href="/search">
          <ion-icon :icon="search" />
          <ion-label>Search</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="win" href="/win" v-if="isLogin">
          <ion-icon :icon="trophyOutline" />
          <ion-label>Win</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="my"  @click="goMypage">
          <ion-icon :icon="person" />
          <ion-label>My</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
      <ion-router-outlet></ion-router-outlet>
    </ion-tabs>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonRouterOutlet } from '@ionic/vue';
import { home, search,trophyOutline, person } from 'ionicons/icons';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'FooterPage',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonRouterOutlet },
  setup() {
    const router = useRouter();
    return {
      home, 
      search,trophyOutline, 
      person,router
    }
  },
  data(){
    return{
      currentUser:'',
      isLogin:false
    }
  },
  mounted() {
      this.currentUser = localStorage.getItem('session_user') || '';
      if(Object.keys(this.currentUser).length == 0){
        this.isLogin = false
      }else{
        this.isLogin = true
      } 
    },
  methods:{
    goMypage(){
      this.router.push('/my')
    }
  }

});
</script>
