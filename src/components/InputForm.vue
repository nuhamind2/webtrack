<template>
  <div :class="$style.page" v-on:keyup.enter="onClick">
      <div :class="$style.innerform">
        <h3>Hello</h3>
        <h4>Enter your event code and start tracking</h4>

        <input id="eventcode" v-model="eventcode" placeholder="Your event code" type="text" autofocus>

        <button type="submit" id="contact-submit" v-on:click="onClick" >Submit</button>
        <p :class="$style.note">
          Do not have event code ? Download mobile app
          <a href="https://github.com/nuhamind2/android-gps-beacon/raw/master/project/app/release/app-release.apk">here</a> 
          or try demo event <b>"DEMO1"</b> and <b>"DEMO2"</b> <br></p>
        
        <p>
          Some of of the source code is  also avalaible 
          <a href="https://github.com/nuhamind2">here</a></p>
  
        <p :class="$style.copyright">
          Designed by
          <a href="https://colorlib.com" target="_blank" title="Colorlib">Colorlib</a>
        </p>
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

<style module>
  @import url(https://fonts.googleapis.com/css?family=Roboto:400,300,600,400italic);

.innerform {
  background: #f9f9f9;
  padding: 25px;
  margin: 0 0;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  display: flex;
  flex-direction: column;
  flex-basis : 25%;
}

.page {
  height: 100vh;
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  font-weight: 100;
  font-size: 12px;
  line-height: 30px;
  color: #777;
  background: #4caf50;
  display: flex;
  justify-content: center;
  align-items: center;
}

.innerform input,
.innerform textarea,
.innerform button {
  font: 400 12px/16px "Roboto", Helvetica, Arial, sans-serif;
}

.innerform h3 {
  font-size: 30px;
  font-weight: 300;
  margin-bottom: 10px;
}

.innerform h4 {
  margin: 5px 0 15px;
  font-size: 13px;
  font-weight: 400;
}

.innerform input {
  border: 1px solid #aaa;
  margin: 0px 0px 15px 0px;
  padding: 10px;
  background: #fff;
}

.innerform input:hover {
  transition: border-color 0.3s ease-in-out;
  border: 1px solid #aaa;
}

.innerform input:focus {
  outline: 0;
  border: 1px solid #aaa;
}

.innerform button {
  cursor: pointer;
  border: none;
  background: #4caf50;
  color: #fff;
  margin: 0px;
  padding: 10px;
  font-size: 15px;
}

.innerform button:hover {
  background: #43a047;
  transition: background-color 0.3s ease-in-out;
}

.innerform button:active {
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
}

.copyright {
  text-align: center;
  font-size: xx-small;
}

.note{
  margin-bottom: 0px;
  line-height: normal;
}
</style>