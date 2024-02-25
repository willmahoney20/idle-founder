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

interface WorkerProps {
    business_id: number,
    cost: number,
    owned: boolean
}

const initialState = {
    money: 1250000,
    gems: 0,
    mega_bucks: 0,
    global_multiplier: 1,
    global_divisor: 1,
    businesses: Array.from({ length: 10 }, (_, index) => ({
        id: index,
        level: index < 4 ? 1 : 0, // set the level of the hotdog stand to 1, but all other businesses should be set to 0, as the user doesn't own them
        multiplier: 1,
        time_divisor: 1
    })) as BusinessProps[],
    managers: [...managers] as WorkerProps[],
    workers: [...workers] as WorkerProps[],
    last_update: Date.now()
}

export default create(
    persist(
        combine(initialState, set => ({
            // we need to consider the most efficient way to manage the games state, refer to debouncing, batching updates, and deferring updates with AsyncStorage so we only update AsyncStorage when needed...

            // our plan...
            // - we're going to update the AsyncStorage every x seconds (potentially using update batching), we should ideally update the state immediately if upgrades, workers, etc. are bought.
            // - we need to use the AppState API to detect when the app is about to go into the background or be closed, so we can update the game storage before this happens.
            // - all other state changes, we should handle using useState (probably) every y seconds where y is a number that isn't straining the device, and isn't faster than a user can notice anyway. There's no point updating the game state 120x/minute if a user can only notice 16 updates/minute.
            // - build out the restart mechanics
            // - build out the other screens (separate this point into multiple points before we do this)
            // - build the settings page last

            // create functions for the following...
            // - updating business levels & updating businesses (buying them)
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
            // - updating upgrades (also update business multiplier if needed)
            // - updating mb upgrades

            // - updating money, mega_bucks, and gems
            // - updating business payout timers

            // updateMoney: (value: number) => set({ money: value }),
            // updateLevel: (business_id: number, value: number, money: number, cost: number): void => set(state => {
            //     let business_data = state.businesses
            //     business_data[business_id].level += value
            //     return { businesses: business_data, money: money -= cost }
            // }),
            // updateBusiness: (id: number, type: string, value: number): void => set(state => {
            //     let business_data = state.businesses
            //     if(type === 'level'){
            //         business_data[id][type] += value
            //     } else if(type === 'multiplier' || type === 'time_divisor'){
            //         business_data[id][type] = business_data[id][type] * value
            //     }

            //     return { businesses: business_data }
            // }),

            resetInitialState: () => set({...initialState})
        })),
        {
            name: 'app-storage',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
) 