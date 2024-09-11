import { defineStore } from 'pinia'
import { collection, getDocs, getFirestore } from 'firebase/firestore'

export const usePlayerRegistrationStore = defineStore('playerRegistration', () => {
  async function getAllRegistrations() {
    const results: any[] = []
    const snapshot = await getDocs(collection(getFirestore(), 'player_registrations'))

    snapshot.forEach((document) => {
      results.push({ id: document.id, ...document.data() })
    })

    return results
  }

  return { getAllRegistrations }
})
