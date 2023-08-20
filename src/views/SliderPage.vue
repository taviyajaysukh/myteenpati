<template>
  <ion-content>

    <!-- Fixed Floating Action Button that does not scroll with the content -->
    <ion-fab slot="fixed">
      <ion-fab-button>Button</ion-fab-button>
    </ion-fab>

    <!-- Default Floating Action Button that scrolls with the content.-->
    <ion-fab-button>Default</ion-fab-button>

    <!-- Mini -->
    <ion-fab-button size="small">Mini</ion-fab-button>

    <!-- Colors -->
    <ion-fab-button color="primary">Primary</ion-fab-button>
    <ion-fab-button color="secondary">Secondary</ion-fab-button>
    <ion-fab-button color="danger">Danger</ion-fab-button>
    <ion-fab-button color="light">Light</ion-fab-button>
    <ion-fab-button color="dark">Dark</ion-fab-button>
    <ion-fab-button color="dark">Dark</ion-fab-button>

    <div id="countdown-id">test</div>
  </ion-content>
</template>

<script>
import { IonContent, IonFab, IonFabButton } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SliderPage',
  components: { IonContent, IonFab, IonFabButton },
  data() {
    return {
      count: 0
    }
  },
  mounted() {
    console.log();
  },
  beforeMount() {
    this.countdown(1, 0);
  },
  methods: {
    countdown: function (minutes, seconds) {
      // set time for the particular countdown
      var time = minutes * 60 + seconds;
      var interval = setInterval(function () {
        var el = document.getElementById('countdown-id');
        // if the time is 0 then end the counter
        if (time == 0) {
          clearInterval(interval);
          setTimeout(function () {
            this.countdown(1, 0);
          }.bind(this), 1000);
        }
        var minutes = Math.floor(time / 60);
        if (minutes < 10) minutes = "0" + minutes;
        var seconds = time % 60;
        if (seconds < 10) seconds = "0" + seconds;
        var text = minutes + ':' + seconds;
        el.innerHTML = text;
        time--;
      }.bind(this), 1000);
    },
  }

});
</script>