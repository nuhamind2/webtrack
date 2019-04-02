import axios from 'axios'
axios.defaults.baseURL = "http://localhost:3000/"

export default{
    check(eventcode){
        return new Promise(function(resolve,reject){
            axios.get("checkEventCode/"+eventcode)
            .then(function(res) {
                console.log(res.data)
                if (res.data == "1") {
                  resolve(true)
                }
                else{
                  resolve(false)
                }
              })
            .catch(function(){
                reject()
            })  
        })
        
    }
}