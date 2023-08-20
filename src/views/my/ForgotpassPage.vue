<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar color="primary">
                <ion-title>
                    <ion-icon :icon="arrowBack" @click="() => router.go(-1)" /> <span class="ion-margin-start">Reset Password</span>
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
                    <ion-col size="8">
                        <div class="input_box">
                            <!-- Input with value -->
                            <ion-label>
                                <ion-img :src="verifycodeIcon" style="width:25px;height:25px;"></ion-img>
                            </ion-label>
                            <ion-input type="text" placeholder="Verification Code" v-model="verification_code">
                            </ion-input>
                        </div>
                    </ion-col>
                    <ion-col size="4">
                        <ion-button class="gocode" @click="sendOtp()">Otp</ion-button>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>
                        <div class="input_box">
                            <!-- Input with value -->
                            <ion-label>
                                <ion-img :src="passwordIcon" style="width:25px;height:25px;"></ion-img>
                            </ion-label>
                            <ion-input type="password" v-model="password" placeholder="New Password">
                            </ion-input>
                        </div>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="2"></ion-col>
                    <ion-col size="8">
                        <ion-button class="gocode" @click="resetPassword()">
                            Continue
                        </ion-button>
                    </ion-col>
                    <ion-col size="2"></ion-col>
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
import { IonContent, IonHeader, IonPage, IonTitle,IonIcon,IonImg,IonGrid,IonRow,IonCol,IonButton,IonFooter, IonToolbar, IonLabel, IonInput, toastController } from '@ionic/vue';
import { defineComponent, computed } from 'vue';
import FooterPage from '../include/FooterPage.vue'
import { arrowBack } from 'ionicons/icons';
import { useRouter } from 'vue-router';
export default defineComponent({
    name: 'ForgotpassPage',
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonIcon,IonImg,IonGrid,IonRow,IonCol,IonButton,IonFooter,
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
        return {
            arrowBack,
            mobileIcon,
            verifycodeIcon,
            passwordIcon,
            router
        }
    },
    data() {
        return {
            mobile: '',
            password: '',
            verification_code: '',
            isvalid: true,
            currentUser: '',
            info: null,
        }
    },
    methods: {
        async resetPassword() {
            let mobilepattern = this.mobile.search(/^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/);
            if (this.mobile === '' || mobilepattern !== 0) {
                this.toastfunction('Please enter mobile number', 3000)
                this.isvalid = false
            } else if (this.verification_code === '') {
                this.toastfunction('Please enter verification code', 3000)
                this.isvalid = false
            } else if (this.password === '') {
                this.toastfunction('Please enter password', 3000)
                this.isvalid = false
            } else {
                this.isvalid = true
            }

            if (this.isvalid === true) {
                let opt = localStorage.getItem("mobile_otp");
                if (opt == this.verification_code) {
                    await axios
                        .post('http://localhost:5000/forgotpass', { "mobile": this.mobile, "newpassword": this.password })
                        .then((res) => {
                            if (res.data.code == 200) {
                                this.toastfunction(res.data.message, 3000)
                                this.mobile = ''
                                this.verification_code = ''
                                this.password = ''
                                this.router.push('/my/login')
                            } else {
                                this.toastfunction(res.data.message, 3000)
                            }
                        })
                } else {
                    this.toastfunction('please enter valid verfication code', 3000)
                }

            }
        },
        async sendOtp() {
            let mobilepattern = this.mobile.search(/^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/);
            if (this.mobile === ''  || mobilepattern !== 0) {
                this.toastfunction('please enter valid mobile', 3000)
                this.isvalid = false
            } else {
                this.isvalid = true
            }
            if (this.isvalid) {
                await axios
                    .post('http://localhost:5000/sentOpt', { "mobile": this.mobile })
                    .then(async function (this: any, res) {
                        if (res.data.status == 200) {
                            localStorage.setItem("mobile_otp", res.data.otpCode);
                            const toast = await toastController.create({
                                message: 'Sent otp on your mobile number successfully....',
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
                            
                        } else {
                            // await this.toastfunction('Cant sent otp on your mobile number....', 1000)
                            const toast = await toastController.create({
                                message: 'Cant sent otp on your mobile number....',
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
                        }
                    })
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
    ionViewDidEnter() {
        this.currentUser = localStorage.getItem('session_user') || '';
        if (Object.keys(this.currentUser).length > 0) {
            this.router.push('/my')
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
