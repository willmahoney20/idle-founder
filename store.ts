import { create } from 'zustand'
import { combine, persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import businesses from './Data/businesses'
import managers from './Data/managers'

interface BusinessProps {
    id: number,
    level: number,
    multiplier: number,
    time_divisor: number
}

interface ManagerProps {
    business_id: number,
    cost: number,
    owned: boolean
}

const initialState = {
    money: 0,
    gems: 0,
    mega_bucks: 0,
    global_multiplier: 1,
    global_divisor: 1,
    businesses: Array.from({ length: 10 }, (_, index) => ({
        id: index,
        level: index === 0 ? 1 : 0, // set the level of the hotdog stand to 1, but all other businesses should be set to 0, as the user doesn't own them
        multiplier: 1,
        time_divisor: 1
    })) as BusinessProps[],
    managers: [...managers] as ManagerProps[]
}

export default create(
    persist(
        combine(initialState, set => ({
            updateBusiness: (id: number, type: string, value: number): void => set(state => {
                let business_data = state.businesses
                if(type === 'level'){
                    business_data[id][type] += value
                } else if(type === 'multiplier' || type === 'time_divisor'){
                    business_data[id][type] = business_data[id][type] * value
                }

                return { businesses: business_data }
            }),
        })),
        {
            name: 'app-storage',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
)