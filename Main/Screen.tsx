import { useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import Header from './Header'
import BusinessCard from '../Components/BusinessCard'
import Businesses from '../Data/businesses'
import Tabs from './Tabs'
import useStore from '../store'

const buy_quantities = ['1', '10', '100', 'NEXT', 'MAX'] // the possible values for the tags icon in the header

export default () => {
    const { money, gems, mega_bucks, businesses, updateBusiness } = useStore()
    const [buyQuantity, setBuyQuantity] = useState<string>('1')

    const handleBuyQuantity = () => setBuyQuantity(prev => prev === 'MAX' ? '1' : buy_quantities[buy_quantities.indexOf(prev) + 1])

    return (
        <View style={styles.container}>
            <Header money={money} gems={gems} mega_bucks={mega_bucks} buyQuantity={buyQuantity} handleBuyQuantity={handleBuyQuantity} />

            <ScrollView style={styles.cardContainer} showsVerticalScrollIndicator={false}>
                {Businesses.map((business, index) => <BusinessCard
                    key={business.id}
                    money={money}
                    id={business.id}
                    title={business.name}
                    level={businesses[index].level}
                    init_cost={business.init_cost}
                    coefficient={business.coefficient}
                />)}
            </ScrollView>

            <Tabs />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    cardContainer: {
        flex: 1,
        padding: 15,
        zIndex: 1
    }
})