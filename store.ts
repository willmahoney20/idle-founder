import { create } from 'zustand'
import { combine, persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import businesses from './Data/businesses'

interface BusinessProps {
    id: number,
    level: number,
    multiplyer: number,
    time_divisor: number
}

const initialState = {
    money: 0,
    gems: 0,
    mega_bucks: 0,
    businesses: Array.from({ length: 10 }, (_, index) => ({
        id: index,
        level: index === 0 ? 1 : 0, // set the level of the hotdog stand to 1, but all other businesses should be set to 0, as the user doesn't own them
        multiplyer: 1,
        time_divisor: 1
    })) as BusinessProps[]
}

export default create(
    persist(
        combine(initialState, set => ({
            updateBusiness: (id: number, type: string, value: number): void => set(state => {
                let business_data = state.businesses
                if(type === 'level'){
                    business_data[id][type] += value
                } else if(type === 'multiplyer' || type === 'time_divisor'){
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