<template>
  <div class="body-container" v-on:keyup.enter="onClick">
    <div class="container">
      <div id="event">
        <h3>Hello</h3>
        <h4>Enter your event code and start tracking</h4>

        <input id="eventcode" v-model="eventcode" placeholder="Your event code" type="text" autofocus>

        <button type="submit" id="contact-submit" v-on:click="onClick" >Submit</button>
        <p class="note">
          Do not have event code ? Download mobile app
          <a href="https://github.com/nuhamind2/android-gps-beacon/raw/master/project/app/release/app-release.apk">here</a>
        </p>
        <p class="note">
          Some of the component used to build this website is avalaible 
          <a href="https://github.com/nuhamind2">here</a>
        </p>
        <p class="copyright">
          Designed by
          <a href="https://colorlib.com" target="_blank" title="Colorlib">Colorlib</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "InputForm",
  data() {
    return {
      eventcode :""
    };
  },
  created() {
    let eventcode = localStorage.getItem("eventcode");
    if (eventcode != undefined) {
      console.log("auto set with " + eventcode)
      this.eventcode = eventcode
    }
  },
  methods: {
    onClick: function() {
      console.log("eventcode : " + this.eventcode);
      localStorage.setItem("eventcode", this.eventcode);
      this.$router.push("/track?eventcode=" + this.eventcode);
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  padding: 10vh 0 0 0;
}

.body-container {
  height: 100vh;
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  font-weight: 100;
  font-size: 12px;
  line-height: 30px;
  color: #777;
  background: #4caf50;
}

#event input,
#event textarea,
#event button {
  font: 400 12px/16px "Roboto", Helvetica, Arial, sans-serif;
}

#event {
  background: #f9f9f9;
  padding: 25px;
  margin: 0 0;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  display: flex;
  flex-direction: column;
}

#event h3 {
  display: block;
  font-size: 30px;
  font-weight: 300;
  margin-bottom: 10px;
}

#event h4 {
  margin: 5px 0 15px;
  display: block;
  font-size: 13px;
  font-weight: 400;
}

#event input {
  border: 1px solid #aaa;
  margin: 0px 0px 15px 0px;
  padding: 10px;
  background: #fff;
}

#event input:hover {
  transition: border-color 0.3s ease-in-out;
  border: 1px solid #aaa;
}

#event input:focus {
  outline: 0;
  border: 1px solid #aaa;
}

#event button {
  cursor: pointer;
  border: none;
  background: #4caf50;
  color: #fff;
  margin: 0px;
  padding: 10px;
  font-size: 15px;
}

#event button:hover {
  background: #43a047;
  transition: background-color 0.3s ease-in-out;
}

#event button:active {
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
}

.copyright {
  text-align: center;
  font-size: xx-small;
}

.note{
  margin-bottom: 0px;
}
</style>