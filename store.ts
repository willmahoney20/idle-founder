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
    businesses: Array.from({ length: 10 }, (_, index) => ({ id: index, level: 1, multiplyer: 1, time_divisor: 1 })) as BusinessProps[]
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