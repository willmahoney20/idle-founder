import { create } from 'zustand'
import { combine, persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import workers from './data/workers'
import managers from './data/managers'
import milestones from './data/milestones'

interface BusinessProps {
    id: number,
    level: number,
    multiplier: number,
    time_divisor: number
}

interface ManagerProps {
    business_id: number,
    owned: boolean
}

interface WorkerProps {
    worker_id: number,
    owned: boolean
}

const initialMoney = {
    money: 228000
}

export const moneyStore = create(
    combine(initialMoney, set => ({
        updateMoney: (value: number): void => set(state => ({ money: state.money += value }))
    }))
)

const initialState = {
    gems: 0,
    mega_bucks: 0,
    global_multiplier: 1,
    global_divisor: 1,
    businesses: Array.from({ length: 10 }, (_, index) => ({
        id: index,
        level: index < 1 ? 25 : index < 11 ? 1 : 0, // set the level of the hotdog stand to 1, but all other businesses should be set to 0, as the user doesn't own them
        multiplier: 1,
        time_divisor: 1
    })) as BusinessProps[],
    managers: [...managers] as ManagerProps[],
    workers: [...workers] as WorkerProps[],
    last_update: Date.now()
}

export const useStore = create(
    persist(
        combine(initialState, set => ({
            updateBusinessLevel: (money: number, id: number, levels: number, cost: number): void => set(state => {
                let businesses = state.businesses

                const updated_money = money - cost
                const current_level = businesses[id]['level']
                const new_level = current_level + levels
                businesses[id]['level'] = new_level

                // check for milestones (for this business and all businesses)
                for(let i = 0; i < milestones.length; i++){
                    // check if milestone has been surpassed
                    if(current_level < milestones[i] && new_level >= milestones[i]){
                        businesses[id]['time_divisor'] *= 2

                        // check if all businesses have now passed this milestone
                        if(businesses.every(x => x.level >= milestones[i])){
                            businesses.forEach(x => x['time_divisor'] *= 2)
                        }
                    }
                }

                return { money: updated_money, businesses, last_update: Date.now() }
            }),
            // - update managers
            updateManager: (money: number, id: number, cost: number): void => set(state => {
                let managers = state.managers

                const updated_money = money - cost
                managers[id]['owned'] = true

                return { money: updated_money, managers, last_update: Date.now() }
            }),
            // - update workers
            updateWorker: (money: number, id: number, worker_id: number, cost: number): void => set(state => {
                let workers = state.workers
                let businesses = state.businesses

                const updated_money = money - cost
                workers[worker_id]['owned'] = true
                businesses[id]['multiplier'] *= 2

                return { money: updated_money, workers, businesses, last_update: Date.now() }
            }),

            resetInitialState: () => set(initialState)
        })),
        {
            name: 'app-storage',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
) 