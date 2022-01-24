import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getStorage, ref } from 'firebase/storage'
const firebaseConfig = {
	apiKey: 'AIzaSyCCTT2yWWS33Ki4eoMCSOiehSPY7sZX-Kk',
	authDomain: 'socialmediaimages-3a93d.firebaseapp.com',
	projectId: 'socialmediaimages-3a93d',
	storageBucket: 'socialmediaimages-3a93d.appspot.com',
	messagingSenderId: '964176027388',
	appId: '1:964176027388:web:75e1d3c3d182dd7ee48179',
	measurementId: 'G-V057TMYMNC',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const storage = getStorage()

export { storage, ref, firebase as default }
