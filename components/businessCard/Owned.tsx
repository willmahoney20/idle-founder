import { useState, useRef, useEffect } from 'react'
import { Animated, Pressable, View, Text, Image } from 'react-native'
import formulateNumber from '../../functions/formulateNumber'
import formatTimer from '../../functions/formatTimer'
import milestones from '../../data/milestones'
import calculatePercentage from '../../functions/calculatePercentage'
import styles from '../../styles/businessCardStyles'
import icons from './BusinessCardIcons'
import { UPS } from '../../globals'
import Upgrades from './Upgrades'
import { moneyStore } from '../../store'

type BusinessCardProps = {
    reload: boolean,
    buyQuantity: string,
    manager: boolean,
    workers: { manager_id?: number, worker_id?: number, owned: boolean }[],
    id: number,
    title: string,
    level: number,
    init_cost: number,
    init_payout: number,
    init_timer: number,
    coefficient: number,
    multiplier: number,
    time_divisor: number,
    global_multiplier: number,
    global_divisor: number
}

export default ({ reload, buyQuantity, manager, workers, id, title, level, init_cost, init_payout, init_timer, coefficient, multiplier, time_divisor, global_multiplier, global_divisor }: BusinessCardProps) => {
    const { updateMoney } = moneyStore()
    const [levelProgress, setLevelProgress] = useState<number>(0)
    const [payout, setPayout] = useState<number>(0)
    const [duration, setDuration] = useState<number | null>(null)
    const [endTime, setEndTime] = useState<number | null>(null)
    const [timeLeft, setTimeLeft] = useState(null)
    const progress = useRef(new Animated.Value(0)).current
    
    useEffect(() => {
        setLevelProgress(calculatePercentage(milestones, level)) // calculate the % progress of the levels (in relation to the next milestone)
        setPayout(init_payout * level * multiplier * global_multiplier)
        setDuration(init_timer / time_divisor / global_divisor)
    }, [level, multiplier, time_divisor, global_divisor])

    const runAnimation = (): void => {
        setEndTime(Date.now() + (duration * 1000))
        setTimeLeft(duration)

        Animated.timing(progress, {
            toValue: 100,
            duration: duration * 1000,
            useNativeDriver: false
        }).start(({ finished }) => {
            if(finished){
                progress.setValue(0)
                updateMoney(payout)
                setEndTime(null)

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

    // set the time remaining
    useEffect(() => {
        // check we are displaying a timer
        if(duration > (1 / UPS)){
            const interval = setInterval(() => {
                const currentTime = Date.now()
                const timeRemaining = Math.max(0, Math.floor((endTime - currentTime) / 1000))
                setTimeLeft(timeRemaining);
                if (timeRemaining <= 0) clearInterval(interval)
            }, 500)
    
            return () => clearInterval(interval)
        }
    }, [endTime])

    const handlePress = () => !manager && !endTime ? runAnimation() : null

    // convert progress into % width
    const progressWidth = progress.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%']
    })
    
    return (
        <View style={[styles.card, { marginBottom: id === 9 ? 30 : 20 }]}>
            <View style={[styles.layer, { marginBottom: 12 }]}>
                <View style={styles.imageBox}>
                    <Pressable onPress={handlePress} style={styles.imageBtn}>
                        <Image source={icons[id].icon} style={[styles.image, icons[id].style]} />
                    </Pressable>
                </View>
                <View style={styles.detailsBox}>
                    <View style={styles.titleBox}>
                        <Text style={styles.title} numberOfLines={1}>{title.toUpperCase()}</Text>
                        <View style={styles.levelBox}>
                            <View style={[styles.levelProgress, { width: levelProgress * 45 }]}></View>
                            <Text style={styles.levelText}>{level}</Text>
                        </View>
                    </View>

                    <Upgrades
                        id={id}
                        workers={workers}
                        manager={manager}
                        buyQuantity={buyQuantity}
                        init_cost={init_cost}
                        level={level}
                        coefficient={coefficient}
                        reload={reload}
                    />
                </View>
            </View>
            <View style={styles.layer}>
                <View style={styles.timeBox}>
                    <Animated.View style={[styles.timeProgress, { width: progressWidth}]}></Animated.View>
                    <Text style={styles.timeText}>${formulateNumber(payout)}</Text>
                </View>
                <View style={[styles.infoBox, { justifyContent: 'center' }]}>
                    <Text style={styles.timeText}>{formatTimer(timeLeft)}</Text>
                </View>
            </View>
        </View>
    )
}