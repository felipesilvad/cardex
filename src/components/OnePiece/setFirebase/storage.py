import pyrebase

config = {
  'apiKey': "AIzaSyAkBeH1gLT31x-3n6sbG14Dlw9z8BwUxOA",
  'authDomain': "cardex-26f5f.firebaseapp.com",
  'projectId': "cardex-26f5f",
  'storageBucket': "cardex-26f5f.appspot.com",
  'messagingSenderId': "1063367523849",
  'appId': "1:1063367523849:web:82b15d2d9fd76b96b742d8",
  'measurementId': "G-TBFPFHWMSG",
  "databaseURL": "https://cardex.firebaseio.com"
}

firebase = pyrebase.initialize_app(config)
storage = firebase.storage()