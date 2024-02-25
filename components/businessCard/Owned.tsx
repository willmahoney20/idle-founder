import { useState, useRef, useEffect } from 'react'
import { Animated, Pressable, View, Text, Image, Dimensions } from 'react-native'
import HotdogManager from '../../assets/workers/hotdog_stand_manager.png'
import colors from '../../assets/ColorPalette'
import formulateNumber from '../../functions/formulateNumber'
import formatTimer from '../../functions/formatTimer'
import milestones from '../../data/milestones'
import calculatePercentage from '../../functions/calculatePercentage'
import styles from '../../styles/businessCardStyles'
import icons from './BusinessCardIcons'
import useStore from '../../store'
import calculateLevelUpgrades from '../../functions/calculateLevelUpgrades'
import { UPS } from '../../globals'

const { GREEN, GREY } = colors

type BusinessCardProps = {
    // updateMoney: (value: number) => void,
    buyQuantity: string,
    money: number,
    manager: boolean,
    updateMoneyState: (value: number) => void,
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

export default ({ buyQuantity, money, updateMoneyState, manager, id, title, level, init_cost, init_payout, init_timer, coefficient, multiplier, time_divisor, global_multiplier, global_divisor }: BusinessCardProps) => {
    const { updateBusinessLevel } = useStore()
    const [levelProgress, setLevelProgress] = useState<number>(0)
    const [nextUpgradeCost, setNextUpgradeCost] = useState<number>(0)
    const [nextUpgradePossible, setNextUpgradePossible] = useState<boolean>(false)
    const [nextUpgradeFormulated, setNextUpgradeFormulated] = useState<string[]>([''])
    const [levelCount, setLevelCount] = useState<number>(1)
    const [nextWorker, setNextWorker] = useState<number>(0)
    const [payout, setPayout] = useState<number>(0)
    const [duration, setDuration] = useState<number | null>(null)
    const [endTime, setEndTime] = useState<number | null>(null)
    const [timeLeft, setTimeLeft] = useState(null)
    const progress = useRef(new Animated.Value(0)).current

    // get the next upgrade data for this business
    useEffect(() => {
        const { next_upgrade, upgrade_to } = calculateLevelUpgrades(money, buyQuantity, init_cost, level, coefficient)
        
        setNextUpgradeCost(next_upgrade)
        setNextUpgradePossible(money >= next_upgrade)
        setNextUpgradeFormulated(formulateNumber(next_upgrade).split(" "))
        setLevelCount(upgrade_to - level)
    }, [buyQuantity, level])

    if(nextUpgradePossible && money < nextUpgradeCost) setNextUpgradePossible(false)
    if(!nextUpgradePossible && money >= nextUpgradeCost) setNextUpgradePossible(true)

    useEffect(() => {
        setLevelProgress(calculatePercentage(milestones, level)) // calculate the % progress of the levels (in relation to the next milestone)
        setNextWorker(0) // calculate the cost of the next worker, and get their image (if all hired, then display the manager and 'HIRED')
        setPayout(init_payout * level * multiplier * global_multiplier)
        setDuration(init_timer / time_divisor / global_divisor)
    }, [level])

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
                updateMoneyState(payout)
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
                    updateMoneyState(((1 / UPS) / duration) * payout)
                }, (1 / UPS) * 1000)
        
                return () => clearInterval(interval)
            } else {
                runAnimation()
            }
        }
    }, [duration])

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

    const handleUpgrade = () => {
        // check user has sufficient funds for upgrade
        if(nextUpgradePossible){
            // we need to upgrade the business in zustand
            updateBusinessLevel(money, id, levelCount, nextUpgradeCost)
            
            // we then need to update the money
            // we might be better making an updateLevel, updateMultiplier, updateDivisor, etc. functions in zustand to prevent running 2 functions
        }
    }
    
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
                    <View style={styles.info}>
                        <Pressable onPress={handleUpgrade}>
                            <View style={[styles.infoBox, { backgroundColor: nextUpgradePossible ? GREEN : GREY, justifyContent: nextUpgradeFormulated[1] ? 'space-between' : 'center' }]}>
                                <View style={styles.levelCount}>
                                    <Text style={styles.levelCountText}>x{levelCount}</Text>
                                </View>
                                <Text style={styles.infoText}>${nextUpgradeFormulated[1] ? nextUpgradeFormulated[0] : nextUpgradeFormulated[0]}</Text>
                                {nextUpgradeFormulated[1] &&
                                <Text style={[styles.infoText, styles.infoMinor]} numberOfLines={1}>{nextUpgradeFormulated[1]}</Text>}
                            </View>
                        </Pressable>
                        <View style={[styles.infoBox, { backgroundColor: GREEN }]}>
                            <View style={styles.worker}>
                                <View style={styles.workerCon}>
                                    <Image source={HotdogManager} style={styles.hotdogManager} />
                                </View>
                            </View>
                            <Text style={[styles.infoText, styles.infoMinor]}>HIRED</Text>
                        </View>
                    </View>
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