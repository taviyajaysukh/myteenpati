<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primary">
        <ion-title>
          <ion-icon :icon="arrowBack" @click="() => router.go(-1)" /> <span class="ion-margin-start">Login</span>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid class="ion-padding">
        <ion-row>
          <ion-col>
            <div class="input_box">
              <!-- Input with value -->
              <ion-label>
                <ion-img :src="mobileIcon" style="width:25px;height:25px;"></ion-img>
              </ion-label>
              <ion-input type="tel" placeholder="Mobile Number" v-model="mobile"></ion-input>
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div class="input_box">
              <!-- Input with value -->
              <ion-label>
                <ion-img :src="passwordIcon" style="width:25px;height:25px;"></ion-img>
              </ion-label>
              <ion-input type="password" placeholder="Password" v-model="password">
              </ion-input>
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="4"></ion-col>
          <ion-col size="4">
            <ion-button class="gocode" @click="login()">
              Login
            </ion-button>
          </ion-col>
          <ion-col size="4"></ion-col>
        </ion-row>
        <ion-row>
          <ion-col size-xs="12" size-sm="12" size-md="4" size-lg="4"></ion-col>
          <ion-col size-xs="12" size-sm="12" size-md="2" size-lg="2">
            <ion-button class="gocode" @click="() => router.push('/my/register')">
              Register
            </ion-button>
          </ion-col>
          <ion-col size-xs="12" size-sm="12" size-md="2" size-lg="2">
            <ion-button class="gocode" @click="() => router.push('/my/forgotpass')">
              Forgot Password?
            </ion-button>
          </ion-col>
          <ion-col size-xs="12" size-sm="12" size-md="" size-lg="4"></ion-col>
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
import axios from 'axios'
import { IonContent, IonHeader,IonFooter, IonPage,IonGrid,IonRow,IonCol,IonIcon,IonImg,IonButton, IonTitle, IonToolbar, IonLabel, IonInput, toastController } from '@ionic/vue';
import { defineComponent, computed } from 'vue';
import FooterPage from '../include/FooterPage.vue'
import { arrowBack } from 'ionicons/icons';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'LoginPage',
  components: {
    IonContent,
    IonHeader,IonFooter,
    IonPage,IonGrid,IonRow,IonCol,IonIcon,IonImg,IonButton,
    IonTitle,
    IonToolbar,
    FooterPage,
    IonLabel,
    IonInput
  },
  setup() {
    const router = useRouter();
    const mobileIcon = computed(() => '/assets/images/phone.png')
    const verifycodeIcon = computed(() => '/assets/images/verifycode.png')
    const passwordIcon = computed(() => '/assets/images/password.png')
    const recomdIcon = computed(() => '/assets/images/recomd.png')
    return {
      arrowBack,
      mobileIcon,
      verifycodeIcon,
      passwordIcon,
      recomdIcon,
      router
    }
  },
  data() {
    return {
      mobile: '',
      password: '',
      isvalid: true,
      code: 201,
      currentUser: '',
      info: null,
    }
  },
  methods: {
    async login() {
      if (this.mobile === '') {
        this.toastfunction('Please enter mobile number', 3000)
        this.isvalid = false
      } else if (this.password === '') {
        this.toastfunction('Please valid password', 3000)
        this.isvalid = false
      } else {
        this.isvalid = true
      }
      if (this.isvalid === true) {
        let redireact = ''
        await axios
          .post('http://localhost:5000/login', { "mobile": this.mobile, "password": this.password })
          .then(async function (res) {
            if (res.data.code == 201) {
              localStorage.clear();
              localStorage.setItem("session_user", JSON.stringify(res.data.data[0].mobile));
              localStorage.setItem("session_userid", JSON.stringify(res.data.data[0].userid));
              localStorage.setItem("promotioncode", JSON.stringify(res.data.data[0].promotioncode));
              //localStorage.setItem("session_user", res.data.data[0].mobile)
              const toast = await toastController.create({
                message: 'login successfully',
                duration: 3000,
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
              redireact = '1'
            } else {
              const toast = await toastController.create({
                message: 'Please enter valid field',
                duration: 3000,
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
              redireact = '2'
            }
          })
        if (redireact == '1') {
          this.router.push('/my')
        }

      }
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

.danger {
  color: red;
}

.padding-top20 {
  padding-top: 20px;
}

ion-toast.custom-toast {
  --background: #F4F4FA;
  --box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.2);
  --color: #4b4a50;
}

ion-toast.custom-toast::part(message) {
  font-style: italic;
}

ion-toast.custom-toast::part(button) {
  border-left: 1px solid #d2d2d2;
  color: #030207;
  font-size: 15px;
}

.gocode {
  width: 100%;
  height: 46px;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
  line-height: 46px;
  border-radius: 2px;
  border: 0;
  text-align: center;
  --background: #f5f5f5;
  font-size: 16px;
  color: rgba(0, 0, 0, .87);
}

.input_box {
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
  padding: 0 12px;
  box-sizing: border-box;
  line-height: 48px;
  background: #fff;
  border-radius: 2px;
  margin-bottom: 35px;
  position: relative;
}
</style>
