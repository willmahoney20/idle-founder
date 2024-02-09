import { useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import Header from './Header'
import BusinessCard from '../Components/BusinessCard'
import Businesses from '../Data/businesses'
import Tabs from './Tabs'

const buy_quantities = ['1', '10', '100', 'next', 'max']

export default () => {
    const [buyQuantity, setBuyQuantity] = useState<string>('next')

    const handleBuyQuantity = () => setBuyQuantity(prev => prev === 'max' ? '1' : buy_quantities[buy_quantities.indexOf(prev) + 1])

    return (
        <View style={styles.container}>
            <Header buyQuantity={buyQuantity} handleBuyQuantity={handleBuyQuantity} />

            <ScrollView style={styles.cardContainer} showsVerticalScrollIndicator={false}>
                {Businesses.map(business => <BusinessCard
                    key={business.id}
                    id={business.id}
                    title={business.name}
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