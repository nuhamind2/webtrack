(function(t){function e(e){for(var o,a,i=e[0],s=e[1],l=e[2],d=0,p=[];d<i.length;d++)a=i[d],c[a]&&p.push(c[a][0]),c[a]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(t[o]=s[o]);u&&u(e);while(p.length)p.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],o=!0,i=1;i<n.length;i++){var s=n[i];0!==c[s]&&(o=!1)}o&&(r.splice(e--,1),t=a(a.s=n[0]))}return t}var o={},c={app:0},r=[];function a(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=o,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)a.d(n,o,function(e){return t[e]}.bind(null,o));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],s=i.push.bind(i);i.push=e,i=i.slice();for(var l=0;l<i.length;l++)e(i[l]);var u=s;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("1d50")},1:function(t,e){},"1d50":function(t,e,n){"use strict";n.r(e);n("5621"),n("b0b4"),n("f368"),n("8f7a");var o=n("e832"),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},r=[],a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.ready?n("div",[n("l-map",{ref:"myMap",staticStyle:{height:"100vh",width:"100vp"},attrs:{zoom:t.zoom,center:t.center}},[n("l-tile-layer",{attrs:{url:t.url,attribution:t.attribution}}),t._l(t.markers,function(e,o){return n("l-marker",{key:o,attrs:{icon:t.icon,"lat-lng":[e.lat,e.lon]}},[n("l-popup",[t._v("Asset Id : "+t._s(o))])],1)}),n("l-control",{attrs:{position:"bottomleft"}},[n("div",{attrs:{id:"status"}},[n("p",{attrs:{id:"event-code"}},[t._v("eventcode : "+t._s(t.eventcode))]),t.connected?n("p",{attrs:{id:"id"}},[t._v("id : "+t._s(t.id))]):t._e(),n("p",{attrs:{id:"connect-status"}},[t._v("status : "+t._s(t.connect_status))]),n("p",{attrs:{id:"stat"}},[t._v("msg : "+t._s(t.stat))])])])],2)],1):t._e()},i=[],s=n("3719"),l=n.n(s),u=(n("0375"),n("308a")),d=n("3cc4"),p=n("481c"),f=n("b0c7"),v=n("6523"),h=n("8c92"),m=n.n(h),_=n("e0d6"),b=n.n(_),g=n("7338"),y=n.n(g),k=!0;y.a.defaults.baseURL=k?"https://api.gpsinstant.id/registration":"http://127.0.0.1:10002",console.log(y.a.defaults.baseURL);var w={check:function(t){return new b.a(function(e,n){y.a.get("checkEventCode/"+t).then(function(t){console.log(t.data),"1"==t.data?e(!0):e(!1)}).catch(function(){n()})})}},x={name:"TrackingMap",components:{LMap:u["a"],LTileLayer:d["a"],LControl:p["a"],LMarker:f["a"],LPopup:v["a"]},mixins:[L],data:function(){return{msg:"Welcome to Your Vue.js App!",zoom:13,center:L.latLng(-7.7894,110.3798),url:"https://{s}.tile.osm.org/{z}/{x}/{y}.png",attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',icon:L.divIcon({className:"div-icon"}),id:"",stat:0,connect_status:"disconnected",connected:!1,markers:{},eventcode:"",ready:!0}},created:function(){var t=this,e=t.$route.query.eventcode;void 0==e&&t.$router.push("/input"),t.eventcode=e;var n=w.check(e);function c(){var t=this;console.log("eventcode : "+e);var n="wss://api.gpsinstant.id/dashboard_conn";t._client=m.a.connect(n,{keepalive:1e3,clientId:"webtrc.".concat(Math.random().toString(16).substr(2,8))}),t._client.handleMessage=function(n,c){try{if(n.topic===e){t.stat++;var r=JSON.parse(n.payload);console.log(l()(r.payload)),o["a"].set(t.markers,r.clientId,r.payload)}}catch(a){a instanceof SyntaxError?console.error("invalid packet format"):console.err(a)}c()},t._client.subscribe(e,{},function(t,e){t?console.log("err:"+t):console.log("granted:"+l()(e))}),t._client.on("connect",function(){t.id="".concat(t._client.options.clientId),t.connect_status="connected",t.connected=!0}),t._client.on("close",function(){t.status="".concat(t._client.options.clientId),t.connect_status="disconnected",t.connected=!1}),t._client.on("reconnect",function(){t.status="".concat(t._client.options.clientId),t.connect_status="reconnecting..."})}n.then(function(e){e?(console.log("verified"),c.call(t),t.ready=!0):(console.log("error verified"),t.$router.push("/input"))}).catch(function(){console.log("success handler failed")}),n.catch(function(){console.log("event code check failed")})}},O=x,S=(n("4b80"),n("a6c2")),j=Object(S["a"])(O,a,i,!1,null,null,null),C=j.exports,M=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"body-container",on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onClick(e)}}},[n("div",{staticClass:"container"},[n("div",{attrs:{id:"event"}},[n("h3",[t._v("Hello")]),n("h4",[t._v("Enter your event code and start tracking")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.eventcode,expression:"eventcode"}],attrs:{id:"eventcode",placeholder:"Your event code",type:"text",autofocus:""},domProps:{value:t.eventcode},on:{input:function(e){e.target.composing||(t.eventcode=e.target.value)}}}),n("button",{attrs:{type:"submit",id:"contact-submit"},on:{click:t.onClick}},[t._v("Submit")]),t._m(0),t._m(1),t._m(2)])])])},$=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"note"},[t._v("\n        Do not have event code ? Download mobile app\n        "),n("a",{attrs:{href:"https://github.com/nuhamind2/android-gps-beacon/raw/master/project/app/release/app-release.apk"}},[t._v("here")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"note"},[t._v("\n        Some of the component used to build this website is avalaible \n        "),n("a",{attrs:{href:"https://github.com/nuhamind2"}},[t._v("here")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"copyright"},[t._v("\n        Designed by\n        "),n("a",{attrs:{href:"https://colorlib.com",target:"_blank",title:"Colorlib"}},[t._v("Colorlib")])])}],E={name:"InputForm",data:function(){return{eventcode:""}},created:function(){var t=localStorage.getItem("eventcode");void 0!=t&&(console.log("auto set with "+t),this.eventcode=t)},methods:{onClick:function(){console.log("eventcode : "+this.eventcode),localStorage.setItem("eventcode",this.eventcode),this.$router.push("/track?eventcode="+this.eventcode)}}},I=E,P=(n("dd20"),Object(S["a"])(I,M,$,!1,null,"677cb443",null)),T=P.exports,z={name:"app"},D=z,J=(n("e5cd"),Object(S["a"])(D,c,r,!1,null,null,null)),N=J.exports,A=(n("0357"),n("4af9"));o["a"].use(A["a"]);var R=[{path:"/",redirect:"/input"},{path:"/input",component:T},{path:"/track",component:C}],U=new A["a"]({routes:R});o["a"].config.productionTip=!1,document.title="Lacak GPS",new o["a"]({router:U,render:function(t){return t(N)}}).$mount("#app")},2:function(t,e){},3:function(t,e){},4:function(t,e){},"404b":function(t,e,n){},"4b80":function(t,e,n){"use strict";var o=n("ad9e"),c=n.n(o);c.a},ad9e:function(t,e,n){},dd20:function(t,e,n){"use strict";var o=n("404b"),c=n.n(o);c.a},e5cd:function(t,e,n){"use strict";var o=n("f04a"),c=n.n(o);c.a},f04a:function(t,e,n){}});
//# sourceMappingURL=app.c6cad7d2.js.map