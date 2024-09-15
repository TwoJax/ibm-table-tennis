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

interface RegistrationTimestamp {
  nanoseconds: number,
  seconds: number
}

interface Registration {
  id: string,
  assigned_to_table: number,
  first_name: string,
  last_name: string,
  has_played: boolean,
  order?: number,
  created_at: Timestamp|RegistrationTimestamp
}

export const useTableTennisRegistrationStore = defineStore('tableTennisRegistration', () => {
  const initialStateLoading = ref(true)

  const unassignedPlayers = ref<Registration[]>()
  const table1Queue = ref<Registration[]>()
  const table2Queue = ref<Registration[]>()

  async function initializeState() {
    const registrations = await getAllRegistrations()
    unassignedPlayers.value = registrations.filter(registration => registration.assigned_to_table === 0)
    table1Queue.value = registrations.filter(registration => registration.assigned_to_table === 1)
    table2Queue.value = registrations.filter(registration => registration.assigned_to_table === 2)

    initialStateLoading.value = false
  }

  async function addPlayer(firstName: string, lastName: string) {
    const registrationsRef = collection(getFirestore(), 'table_tennis_registrations')
    const order = (unassignedPlayers.value?.length ?? 0) + 1

    const newPlayer = {
      first_name: firstName,
      last_name: lastName,
      order,
      has_played: false,
      assigned_to_table: 0,
      created_at: Timestamp.fromDate(new Date())
    }

    await addDoc(registrationsRef, newPlayer)
    unassignedPlayers.value?.push(newPlayer as Registration)
  }

  async function getAllRegistrations() {
    const results: any[] = []
    const registrationsRef = collection(getFirestore(), 'table_tennis_registrations')
    const q = query(registrationsRef, orderBy('order'))
    
    const snapshot = await getDocs(q)

    snapshot.forEach(document => results.push({ id: document.id, ...document.data() }))

    return results
  }

  async function move(fromTableNumber: number, toTableNumber: number, id: string, newIndex: number) {
    const fromQueueName = fromTableNumber === 0 ? 'unassignedPlayers': `table${fromTableNumber}Queue`
    const toQueueName = toTableNumber === 0 ? 'unassignedPlayers': `table${toTableNumber}Queue`

    const fromTable = JSON.parse(JSON.stringify(this[fromQueueName]))
    const fromTableIndex = fromTable.findIndex(registration => registration.id === id)
    const movedRegistration = fromTable.splice(fromTableIndex, 1)
    fromTable.map((registration, index) => registration.order = index + 1)
    
    const toTable = JSON.parse(JSON.stringify(this[toQueueName]))
    movedRegistration[0].assigned_to_table = toTableNumber
    toTable.splice(newIndex, 0, movedRegistration[0])
    toTable.map((registration, index) => {
      console.log(index, ':', registration)  
      registration.order = index + 1
    })

    await writeReorderToDb([...fromTable, ...toTable])

    this.$patch({
      [fromQueueName]: fromTable,
      [toQueueName]: toTable
    })
  }

  async function reorder(tableNumber: number, id: string, oldIndex: number, newIndex: number) {
    const queueName = tableNumber === 0 ? 'unassignedPlayers': `table${tableNumber}Queue`

    const registrations = JSON.parse(JSON.stringify(this[queueName]))
    const registrationIndex = registrations.findIndex(registration => registration.id === id)
    const registration = registrations.splice(registrationIndex, 1)
    registrations.splice(newIndex, 0, registration[0])
    registrations.map((registration, index) => registration.order = index + 1)

    await writeReorderToDb(registrations)

    this.$patch({
      [queueName]: registrations,
    })
  }

  async function writeReorderToDb(registrations) {
    const db = getFirestore()

    const batch = writeBatch(db)

    registrations.forEach(registration => {
      batch.update(doc(db, 'table_tennis_registrations', registration.id), registration)
    });

    await batch.commit()
  }

  return {
    addPlayer,
    initializeState,
    initialStateLoading,
    move,
    reorder,
    table1Queue,
    table2Queue,
    unassignedPlayers
  }
})
