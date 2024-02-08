import { StyleSheet, View } from 'react-native'
import Header from './Header'
import BusinessCard from '../Components/BusinessCard'
import Businesses from '../Data/businesses'

export default () => {
    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.cardContainer}>
                {Businesses.map(business => <BusinessCard
                    key={business.id}
                    id={business.id}
                    title={business.name}
                />)}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cardContainer: {
        padding: 15
    }
})