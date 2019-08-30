import { mapGetters } from 'vuex';


export default function ({ $axios, app, store } ) {
  // const tok = mapGetters([
  //   'authenticated'
  // ]);

  let token;
  if(localStorage.getItem('anscims')) {
  let appStorage = JSON.parse(localStorage.getItem('anscims'));
    if(appStorage.auth.user) {
      const { Token } = appStorage.auth.user;
      token = Token;
      //alert(token);
    }
  }

  // console.log(store.state);

  // this.$axios.setToken('123', 'Authetication')

  $axios.setToken(`${token}`, 'Bearer')

  $axios.setHeader('Content-Type', 'application/json', [
    'post'
  ])

  $axios.setHeader('Authorization',`Bearer ${token}`)

  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      // app.$toast.error(error.response.data)
      // return response
    } else {
      app.$toast.error(error.status)
    }
  })
}
