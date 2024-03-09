import { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import styles from '../../styles/businessCardStyles'
import formatTimer from '../../functions/formatTimer'
import { UPS } from '../../globals'

export default ({ duration, endTime }) => {
    const [timeLeft, setTimeLeft] = useState(null)

    // set the time remaining
    useEffect(() => {
        // check we are displaying a timer
        if(duration > (1 / UPS)){
            const interval = setInterval(() => {
                const currentTime = Date.now()
                const timeRemaining = Math.max(0, Math.floor((endTime - currentTime) / 1000))
                setTimeLeft(timeRemaining);
                if (timeRemaining <= 0) clearInterval(interval)
            }, 250)
    
            return () => clearInterval(interval)
        }
    }, [endTime])

    return (
        <View style={[styles.infoBox, { justifyContent: 'center' }]}>
            <Text style={styles.timeText}>{formatTimer(timeLeft)}</Text>
        </View>
    )
}