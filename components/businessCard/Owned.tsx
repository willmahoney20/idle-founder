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
import workers_data from '../../data/workers'
import managers_data from '../../data/managers'

const { GREEN, GREY } = colors

type BusinessCardProps = {
    reload: boolean,
    buyQuantity: string,
    money: number,
    manager: boolean,
    workers: { manager_id?: number, worker_id?: number, owned: boolean }[],
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

export default ({ reload, buyQuantity, money, updateMoneyState, manager, workers, id, title, level, init_cost, init_payout, init_timer, coefficient, multiplier, time_divisor, global_multiplier, global_divisor }: BusinessCardProps) => {
    const { updateBusinessLevel, updateManager, updateWorker } = useStore()
    const [levelProgress, setLevelProgress] = useState<number>(0)
    const [nextUpgradeCost, setNextUpgradeCost] = useState<number>(0)
    const [nextUpgradePossible, setNextUpgradePossible] = useState<boolean>(false)
    const [nextUpgradeFormulated, setNextUpgradeFormulated] = useState<string[]>([''])
    const [nextMaxCost, setNextMaxCost] = useState<number>(0)
    const [levelCount, setLevelCount] = useState<number>(1)
    const [nextWorkerType, setNextWorkerType] = useState<string>('manager')
    const [nextWorkerCost, setNextWorkerCost] = useState<number>(0)
    const [nextWorkerFormulated, setNextWorkerFormulated] = useState<string>('HIRED')
    const [nextWorkerPossible, setNextWorkerPossible] = useState<boolean>(false)
    const [payout, setPayout] = useState<number>(0)
    const [duration, setDuration] = useState<number | null>(null)
    const [endTime, setEndTime] = useState<number | null>(null)
    const [timeLeft, setTimeLeft] = useState(null)
    const progress = useRef(new Animated.Value(0)).current

    const updateLevelDetails = () => {
        const { next_upgrade, upgrade_to } = calculateLevelUpgrades(money, buyQuantity, init_cost, level, coefficient)

        setNextUpgradeCost(next_upgrade)
        setNextUpgradePossible(money >= next_upgrade)
        setNextUpgradeFormulated(formulateNumber(next_upgrade).split(" "))
        setLevelCount(upgrade_to - level)
        if(buyQuantity === 'MAX'){
            setNextMaxCost(next_upgrade + (init_cost * (coefficient ** upgrade_to)))
        }
    }

    // get the next upgrade data for this business
    useEffect(() => {
        updateLevelDetails()
    }, [buyQuantity, reload])

    // check if the user's funds have surpassed the cost of another level upgrade
    if(buyQuantity === 'MAX' && money >= nextMaxCost) updateLevelDetails()

    if(nextUpgradePossible && money < nextUpgradeCost) setNextUpgradePossible(false)
    if(!nextUpgradePossible && money >= nextUpgradeCost) setNextUpgradePossible(true)

    // function for getting the next worker upgrade details
    const handleWorkerDetails = () => {
        for(let i = 0; i < workers.length; i++){
            if(!workers[i].owned){
                setNextWorkerType(i < 1 ? 'manager' : `worker ${i - 1}`)
                setNextWorkerCost(workers_data[i].cost)
                setNextWorkerFormulated(formulateNumber(workers_data[i].cost))
                setNextWorkerPossible(money >= workers_data[i].cost)
                break
            }

            if(i === 2){
                setNextWorkerFormulated('HIRED')
                setNextWorkerPossible(true)
            }
        }
    }

    useEffect(() => {
        handleWorkerDetails()
    }, [manager])

    if(nextWorkerFormulated !== 'HIRED'){
        if(nextWorkerPossible && money < nextWorkerCost) setNextWorkerPossible(false)
        if(!nextWorkerPossible && money >= nextWorkerCost) setNextWorkerPossible(true)
    }

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

    const handleLevelUpgrade = () => {
        // check user has sufficient funds for upgrade
        if(nextUpgradePossible){
            updateBusinessLevel(money, id, levelCount, nextUpgradeCost)
        }
    }

    const handleWorker = () => {
        // check user has sufficient funds for buying this worker
        if(nextWorkerPossible && nextWorkerFormulated !== 'HIRED'){
            if(nextWorkerType === 'manager'){
                updateManager(money, id, nextWorkerCost)
            } else if(nextWorkerType.includes('worker')){
                const worker_id = id * 2 + parseInt(nextWorkerType.split(' ')[1])
                updateWorker(money, id, worker_id, nextWorkerCost)
                handleWorkerDetails()
            }
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
                        <Pressable onPress={handleLevelUpgrade}>
                            <View style={[styles.infoBox, { backgroundColor: nextUpgradePossible ? GREEN : GREY, justifyContent: nextUpgradeFormulated[1] ? 'space-between' : 'center' }]}>
                                <View style={styles.levelCount}>
                                    <Text style={styles.levelCountText}>x{levelCount}</Text>
                                </View>
                                <Text style={styles.infoText}>${nextUpgradeFormulated[1] ? nextUpgradeFormulated[0] : nextUpgradeFormulated[0]}</Text>
                                {nextUpgradeFormulated[1] &&
                                <Text style={[styles.infoText, styles.infoMinor]} numberOfLines={1}>{nextUpgradeFormulated[1]}</Text>}
                            </View>
                        </Pressable>
                        <Pressable onPress={handleWorker}>
                            <View style={[styles.infoBox, { backgroundColor: nextWorkerPossible ? GREEN : GREY }]}>
                                <View style={styles.worker}>
                                    <View style={styles.workerCon}>
                                        <Image source={HotdogManager} style={styles.hotdogManager} />
                                    </View>
                                </View>
                                <Text style={[styles.infoText, styles.infoMinor]}>{nextWorkerFormulated === 'HIRED' ? '' : '$'}{nextWorkerFormulated}</Text>
                            </View>
                        </Pressable>
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