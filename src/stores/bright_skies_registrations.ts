import { computed, ref, toRaw } from 'vue'
import { defineStore } from 'pinia'

import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  Timestamp,
  writeBatch
} from 'firebase/firestore'
import { add } from 'date-fns'

interface RegistrationTimestamp {
  nanoseconds: number,
  seconds: number
}

interface Registration {
  id?: string,
  called: boolean,
  called_at?: Timestamp | RegistrationTimestamp,
  created_at: Timestamp | RegistrationTimestamp,
  wristband_id: string
}

export const useBrightSkiesRegistrationStore = defineStore('brightSkiesRegistration', () => {
  const allRegistrations = ref<Registration[]>()
  const initialStateLoading = ref(true)

  const currentlyCalledRegistrations = computed(() => previouslyCalledRegistrations.value?.slice(0, 2))

  const previouslyCalledRegistrations = computed(() => {
    return allRegistrations.
      value?.
      filter(registration => registration.called).
      sort((a, b) => { return b.called_at?.seconds - a.called_at?.seconds })
  })

  const previousWithoutCurrent = computed(() => previouslyCalledRegistrations.value?.slice(2))
  const uncalledRegistrations = computed(() => allRegistrations.value?.filter(registration => !registration.called))

  async function initializeState() {
    allRegistrations.value = await getAllRegistrations()

    initialStateLoading.value = false
  }

  async function getAllRegistrations() {
    const results: any[] = []
    const registrationsRef = collection(getFirestore(), 'bright_skies_registrations')
    const q = query(registrationsRef, orderBy('created_at', 'asc'))

    const snapshot = await getDocs(q)

    snapshot.forEach(document => results.push({ id: document.id, ...document.data() }))

    return results
  }

  async function addRegistration(wristbandId: string) {
    const registrationsRef = collection(getFirestore(), 'bright_skies_registrations')

    const newRegistration: Registration = {
      called: false,
      created_at: Timestamp.fromDate(new Date()),
      wristband_id: wristbandId
    }

    const registrationRef = await addDoc(registrationsRef, newRegistration)
    newRegistration.id = registrationRef.id

    allRegistrations.value?.push(newRegistration as Registration)
  }

  async function nextGroup() {
    const db = getFirestore()

    const updatedRegistrations = uncalledRegistrations.value?.slice(0, 2)

    updatedRegistrations?.map((registration) => {
      registration.called = true
      registration.called_at = Timestamp.fromDate(new Date())
    })

    const batch = writeBatch(db)

    updatedRegistrations?.forEach(registration => {
      batch.update(doc(db, 'bright_skies_registrations', registration.id), registration)
    })

    await batch.commit()
  }

  async function refreshData() {
    allRegistrations.value = await getAllRegistrations()
  }

  return {
    addRegistration,
    currentlyCalledRegistrations,
    initializeState,
    initialStateLoading,
    nextGroup,
    previouslyCalledRegistrations,
    previousWithoutCurrent,
    refreshData,
    uncalledRegistrations,
  }
})
