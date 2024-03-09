import { useEffect, useRef } from 'react'
import { View, Text, Animated } from 'react-native'
import styles from '../../styles/businessCardStyles'
import { UPS } from '../../globals'
import formulateNumber from '../../functions/formulateNumber'
import { moneyStore } from '../../store'

export default ({ manager, duration, endTime, updateEndTime, payout, btnChange }) => {
    const updateMoney = moneyStore(state => state.updateMoney)
    const progress = useRef(new Animated.Value(0)).current

    // this should run when a user presses the button to start the payout timer
    useEffect(() => {
        if(!manager) runAnimation()
    }, [btnChange])

    const runAnimation = (): void => {
        updateEndTime(Date.now() + (duration * 1000))

        Animated.timing(progress, {
            toValue: 100,
            duration: duration * 1000,
            useNativeDriver: false
        }).start(({ finished }) => {
            if(finished){
                progress.setValue(0)
                updateMoney(payout)
                updateEndTime(null)

                // if we have a manager, restart the timer/animation
                if(manager) runAnimation()
            }
        })
    }
  
    // start the animation automatically if the user has a manager for this business
    useEffect(() => {
        if(duration && manager){
            if(duration < (1 / UPS)){
                progress.setValue(100)
                
                const interval = setInterval(() => {
                    updateMoney(((1 / UPS) / duration) * payout)
                }, (1 / UPS) * 1000)
        
                return () => clearInterval(interval)
            } else {
                // check if the animation is in progress, if it is, add a delay to the runAnimation()
                if(!endTime){
                    runAnimation()
                } else {
                    setTimeout(() => runAnimation(), endTime - Date.now())
                }
            }
        }
    }, [duration, manager])

    // convert progress into % width
    const progressWidth = progress.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%']
    })

    return (
        <View style={styles.timeBox}>
            <Animated.View style={[styles.timeProgress, { width: progressWidth}]}></Animated.View>
            <Text style={styles.timeText}>${formulateNumber(payout)}</Text>
        </View>
    )
}