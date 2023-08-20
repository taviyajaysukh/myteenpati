<template>
    
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="Admin" href="/admin">
          <ion-icon :icon="home" />
          <ion-label>dashboard</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
      <ion-router-outlet></ion-router-outlet>
    </ion-tabs>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonRouterOutlet } from '@ionic/vue';
import { home } from 'ionicons/icons';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'FooteradminPage',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonRouterOutlet  },
  setup() {
    const router = useRouter();
    return {
      home,router
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
