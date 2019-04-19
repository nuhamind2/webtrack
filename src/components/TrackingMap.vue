<template>
  <div v-if="ready" :class="$style.page">
    <!-- <sidebar></sidebar> -->
    <l-map :zoom="zoom" :center="center" ref="myMap">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker
        :icon="icon"
        v-for="(payload,key) in markers"
        :lat-lng="[payload.lat,payload.lon]"
        :key="key"
      >
        <l-popup>
          Asset Id : {{payload.clientId}}
          <br>
          Name : {{payload.username}}
        </l-popup>
      </l-marker>
      <!-- <l-marker :lat-lng="demo1" ></l-marker>
      <l-marker :lat-lng="demo2" :icon="icon"></l-marker> -->
      <l-control position="topleft">
        <button @click="clickHandler">...</button>
      </l-control>
      <l-control position="bottomleft">
        <div :class="$style.status">
          <p>eventcode : {{eventcode}}</p>
          <p v-if="connected" >id : {{id}}</p>
          <p >status : {{connect_status}}</p>
          <p >msg : {{stat}}</p>
        </div>
      </l-control>
    </l-map>
  </div>
</template>

<script>
import Vue from "vue";
import { LMap, LTileLayer, LMarker, LPopup, LControl } from "vue2-leaflet";
import Sidebar from "./Sidebar.vue";
import mqtt from "mqtt";
import EventService from "../api-services/event.service.js";
export default {
  name: "TrackingMap",
  components: {
    LMap,
    LTileLayer,
    LControl,
    LMarker,
    LPopup,
    Sidebar
  },
  mixins: [L],
  data() {
    return {
      msg: "Welcome to Your Vue.js App!",
      zoom: 13,
      center: L.latLng(-7.7894, 110.3798),
      // demo1: L.latLng(-7.7894, 110.3798),
      // demo2: L.latLng(-7.7894, 110.4000),
      url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      icon: L.divIcon({ className: "div-icon" }),
      id: "",
      stat: 0,
      connect_status: "disconnected",
      connected: false,
      markers: {},
      eventcode: "",
      ready: true
    };
  },
  methods: {
    clickHandler() {
      window.alert("and mischievous");
    }
  },
  created() {
    let self = this;
    let eventcode = self.$route.query.eventcode;
    if (eventcode == undefined) {
      self.$router.push("/input");
    }
    self.eventcode = eventcode;
    let check = EventService.check(eventcode);
    check
      .then(res => {
        if (res) {
          console.log("verified");
          initMqtt.call(self);
          self.ready = true;
        } else {
          console.log("error verified");
          self.$router.push("/input");
        }
      })
      .catch(function() {
        console.log("success handler failed");
      });
    check.catch(function() {
      console.log("event code check failed");
    });

    function initMqtt() {
      let self = this;
      console.log("eventcode : " + eventcode);
      let mqtt_address =
        process.env.NODE_ENV === "production"
          ? "wss://api.gpsinstant.id/dashboard_conn"
          : "ws://localhost:9002/";
      self._client = mqtt.connect(mqtt_address, {
        keepalive: 1000,
        clientId: `webtrc.${Math.random()
          .toString(16)
          .substr(2, 8)}`
      });
      self._client.handleMessage = (packet, done) => {
        try {
          if (packet.topic === eventcode) {
            self.stat++;
            let payload = JSON.parse(packet.payload);
            console.log(JSON.stringify(payload.payload));
            let data = {
              ...payload.payload,
              clientId: payload.clientId,
              username: payload.username
            };
            Vue.set(self.markers, payload.clientId, data);
          }
        } catch (e) {
          if (e instanceof SyntaxError) {
            console.error("invalid packet format");
          } else {
            console.err(e);
          }
        }
        done();
      };
      self._client.subscribe(eventcode, {}, (err, granted) => {
        if (err) {
          console.log("err:" + err);
        } else {
          console.log("granted:" + JSON.stringify(granted));
        }
      });
      self._client.on("connect", () => {
        self.id = `${self._client.options.clientId}`;
        self.connect_status = `connected`;
        self.connected = true;
      });
      self._client.on("close", () => {
        self.status = `${self._client.options.clientId}`;
        self.connect_status = `disconnected`;
        self.connected = false;
      });

      self._client.on("reconnect", () => {
        self.status = `${self._client.options.clientId}`;
        self.connect_status = `reconnecting...`;
      });
    }
  }
};
</script>

<style>
.div-icon {
  border-radius: 50%;
  width: 50px;
  height: 50px;

  background-image: radial-gradient(darkblue 80%, lightblue 20%);
  border: 4px solid lightblue;
  box-shadow: 0 0 2px 2px lightblue;
}
</style>


<style lang="css" module>
.page {
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vp;
}

.status > p {
  color: black;
  font-size: medium;
  opacity: 1;
  margin: 0;
}

.status {
  background-color: rgba(255, 255, 255, 0.5);
  padding: 0 10px 0 10px;
}
</style>
