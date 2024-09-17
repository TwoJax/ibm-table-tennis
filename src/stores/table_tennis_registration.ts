import { ref } from 'vue'
import { defineStore } from 'pinia'

import {
  addDoc,
  collection,
  deleteDoc,
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
  id?: string,
  assigned_to_table: number,
  first_name: string,
  last_name: string,
  has_played: boolean,
  order?: number,
  created_at: Timestamp | RegistrationTimestamp
}

interface Game {
  table_number: number,
  players: string[],
  started_at: Timestamp | RegistrationTimestamp
}

export const useTableTennisRegistrationStore = defineStore('tableTennisRegistration', () => {
  const initialStateLoading = ref(true)

  const games = ref<Game[]>()
  const table1Queue = ref<Registration[]>()
  const table2Queue = ref<Registration[]>()
  const unassignedPlayers = ref<Registration[]>()

  async function initializeState() {
    const registrations = await getAllRegistrations()

    table1Queue.value = registrations.filter(registration => registration.assigned_to_table === 1 && registration.has_played === false)
    table2Queue.value = registrations.filter(registration => registration.assigned_to_table === 2 && registration.has_played === false)
    unassignedPlayers.value = registrations.filter(registration => registration.assigned_to_table === 0 && registration.has_played === false)

    games.value = await getGames()

    initialStateLoading.value = false
  }

  async function addPlayer(firstName: string, lastName: string) {
    const registrationsRef = collection(getFirestore(), 'table_tennis_registrations')
    const order = (unassignedPlayers.value?.length ?? 0) + 1

    const newPlayer: Registration = {
      first_name: firstName,
      last_name: lastName,
      order,
      has_played: false,
      assigned_to_table: 0,
      created_at: Timestamp.fromDate(new Date())
    }

    const playerRef = await addDoc(registrationsRef, newPlayer)
    newPlayer.id = playerRef.id

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

  async function getGames() {
    const results: any[] = []
    const registrationsRef = collection(getFirestore(), 'table_tennis_games')

    const snapshot = await getDocs(registrationsRef)

    snapshot.forEach(document => results.push({ id: document.id, ...document.data() }))

    return results
  }

  async function move(fromTableNumber: number, toTableNumber: number, id: string, newIndex: number) {
    const fromQueueName = fromTableNumber === 0 ? 'unassignedPlayers' : `table${fromTableNumber}Queue`
    const toQueueName = toTableNumber === 0 ? 'unassignedPlayers' : `table${toTableNumber}Queue`

    const fromTable = JSON.parse(JSON.stringify(this[fromQueueName]))
    const fromTableIndex = fromTable.findIndex(registration => registration.id === id)
    const movedRegistration = fromTable.splice(fromTableIndex, 1)
    fromTable.map((registration, index) => registration.order = index + 1)

    const toTable = JSON.parse(JSON.stringify(this[toQueueName]))
    movedRegistration[0].assigned_to_table = toTableNumber
    toTable.splice(newIndex, 0, movedRegistration[0])
    toTable.map((registration, index) => {
      registration.order = index + 1
    })

    await writeReorderToDb(toTable)

    this.$patch({
      [fromQueueName]: fromTable,
      [toQueueName]: toTable
    })
  }

  async function reorder(tableNumber: number, id: string, oldIndex: number, newIndex: number) {
    const queueName = tableNumber === 0 ? 'unassignedPlayers' : `table${tableNumber}Queue`

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

  async function startGame(tableNumber: number) {
    const db = getFirestore()

    const queue = tableNumber === 1 ? table1Queue : table2Queue
    const players: string[] = []

    queue.value?.slice(0, 2).map((player, index) => {
      if (index > 1) return

      player.has_played = true
      players.push(`${player.first_name} ${player.last_name[0]}`)
    })

    const newGame = {
      table_number: tableNumber,
      players,
      started_at: Timestamp.fromDate(new Date())
    }

    const batch = writeBatch(db)

    batch.update(doc(db, 'table_tennis_registrations', queue.value![0].id), queue.value![0])
    batch.update(doc(db, 'table_tennis_registrations', queue.value![1].id), queue.value![1])
    batch.set(doc(db, 'table_tennis_games', `table${tableNumber}`), newGame, { merge: true })

    await batch.commit()

    const existingGame = games.value?.findIndex(game => game.table_number === tableNumber)

    if (existingGame !== -1) {
      games.value?.splice(existingGame!, 1, newGame)
    } else {
      games.value?.push(newGame)
    }

    queue.value = queue.value?.splice(2)
  }

  async function refreshData() {
    const registrations = await getAllRegistrations()

    table1Queue.value = registrations.filter(registration => registration.assigned_to_table === 1 && registration.has_played === false)
    table2Queue.value = registrations.filter(registration => registration.assigned_to_table === 2 && registration.has_played === false)
    unassignedPlayers.value = registrations.filter(registration => registration.assigned_to_table === 0 && registration.has_played === false)

    games.value = await getGames()
  }

  async function removePlayer(id: string) {
    const player = unassignedPlayers.value?.findIndex(player => player.id === id)

    await deleteDoc(doc(getFirestore(), 'table_tennis_registrations', id))

    unassignedPlayers.value?.splice(player!, 1)
  }

  async function writeReorderToDb(registrations) {
    const db = getFirestore()

    const batch = writeBatch(db)

    registrations.forEach(registration => {
      batch.set(doc(db, 'table_tennis_registrations', registration.id), registration, { merge: true })
    });

    await batch.commit()
  }

  return {
    addPlayer,
    games,
    initializeState,
    initialStateLoading,
    move,
    refreshData,
    removePlayer,
    reorder,
    startGame,
    table1Queue,
    table2Queue,
    unassignedPlayers
  }
})
