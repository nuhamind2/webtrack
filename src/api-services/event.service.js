import axios from 'axios'

const isProd = process.env.NODE_ENV === 'production'

axios.defaults.baseURL = isProd ? 'https://api.pirantiempuk.com' : 'http://127.0.0.1:10002'
console.log(axios.defaults.baseURL)

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