<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primary">
        <ion-title>
          <ion-icon :icon="arrowBack" @click="() => router.go(-1)" /><span class="ion-margin-start">Complaints &
            Suggestions</span>
        </ion-title>
        <ion-button slot="end" @click="() => router.push('/my/addcomplaints')">
          <ion-icon :icon="add" />
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <!-- Segment with default selection -->
    <ion-segment class="segment-class" @ionChange="segmentChanged($event)" value="completed">
      <ion-segment-button value="completed">
        <ion-label>COMPLETED</ion-label>
      </ion-segment-button>
      <ion-segment-button value="wait">
        <ion-label>WAIT</ion-label>
      </ion-segment-button>
    </ion-segment>
    <ion-content>
      <ion-card v-if="segmentModel === 'completed'">
        <ion-card-content>
          <ion-grid>
            <ion-row class="border-bottom-ctm" v-for="item in completedData" :key="item.outid"
              @click="openModal(item._id)">
              <ion-col>
                <ion-text>
                  <p>{{item.outid}}</p>
                </ion-text>
                <ion-text>
                  <p>{{item.type}}</p>
                </ion-text>
                <ion-text>
                  <p>{{item.whatsapp}}</p>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>
      <ion-card v-if="segmentModel === 'wait'">
        <ion-card-content>
          <ion-grid>
            <ion-row class="border-bottom-ctm" v-for="item in waitData" :key="item.outid" @click="openModal(item._id)">
              <ion-col>
                <ion-text>
                  <p>{{item.description}}</p>
                </ion-text>
                <ion-text>
                  <p>WhatsApp: {{item.whatsapp}}</p>
                </ion-text>
                <ion-text>
                  <p>{{item.outid}}</p>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-grid>
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
import axios from 'axios'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonIcon, IonButton, IonText, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonFooter, IonSegment, IonSegmentButton, toastController, modalController } from '@ionic/vue';
import { defineComponent } from 'vue';
import FooterPage from '../include/FooterPage.vue'
import { useRouter } from 'vue-router';
import ModalComplaint from '../components/ModalComplaint.vue'
import { arrowBack, add } from 'ionicons/icons';
export default defineComponent({
  name: 'ComplaintsPage',
  components: { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonIcon, IonButton, IonText, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonFooter, IonSegment, IonSegmentButton, FooterPage },
  setup() {
    const router = useRouter()
    return {
      router, arrowBack, add
    }
  },
  data() {
    return {
      segmentModel: "completed",
      currentUser: '',
      waitData: [{ "_id": '', "type": '', "outid": 0, "whatsapp": 0, "description": '' }],
      completedData: [{ "_id": '', "type": '', "outid": 0, "whatsapp": 0, "description": '' }],
    }
  },
  mounted() {

    this.getWaitComplaint()
    this.getCompletedComplaint()
  },
  ionViewDidEnter() {
    this.currentUser = localStorage.getItem('session_user') || '';
    if (Object.keys(this.currentUser).length == 0) {
      this.router.push('/my/login')
    }
  },
  methods: {
    async openModal(id: string) {
      const modal = await modalController.create({
        component: ModalComplaint,
        componentProps: { value: id }
      });
      modal.present();
      console.log(id)
    },
    segmentChanged(ev: CustomEvent) {
      this.segmentModel = ev.detail.value;
    },
    async getWaitComplaint() {
      await axios
        .post('http://localhost:5000/getWaitComplaints', { "userid": this.currentUser })
        .then(res => this.waitData = res.data.data)
    },
    async getCompletedComplaint() {
      await axios
        .post('http://localhost:5000/getComplatedComplaints', { "userid": this.currentUser })
        .then(res => this.completedData = res.data.data)
    },
    async toastfunction(message: string, duration?: number) {
      const toast = await toastController.create({
        message: message,
        duration: duration,
        position: 'middle',
        cssClass: 'custom-toast',
        buttons: [
          {
            text: 'Dismiss',
            role: 'cancel'
          }
        ],
      });
      await toast.present();
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
  padding: 10px 10px 0 10px;
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

.border-bottom-ctm {
  border-bottom: 1px solid gray;
}
</style>