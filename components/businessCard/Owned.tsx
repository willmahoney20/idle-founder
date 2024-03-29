import { useState, useRef, useEffect } from 'react'
import { Animated, Pressable, View, Text, Image } from 'react-native'
import formulateNumber from '../../functions/formulateNumber'
import formatTimer from '../../functions/formatTimer'
import milestones from '../../data/milestones'
import calculatePercentage from '../../functions/calculatePercentage'
import styles from '../../styles/businessCardStyles'
import icons from './BusinessCardIcons'
import Upgrades from './Upgrades'
import { useStore } from '../../store'
import Countdown from './Countdown'
import ProgressBar from './ProgressBar'

type BusinessCardProps = {
    buyQuantity: string,
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

export default ({ buyQuantity, id, title, level, init_cost, init_payout, init_timer, coefficient, multiplier, time_divisor, global_multiplier, global_divisor }: BusinessCardProps) => {
    const { managers, workers } = useStore()
    const [levelProgress, setLevelProgress] = useState<number>(0)
    const [payout, setPayout] = useState<number>(0)
    const [duration, setDuration] = useState<number | null>(null)
    const [endTime, setEndTime] = useState<number | null>(null)
    const [btnChange, setBtnChange] = useState<boolean>(false)
    const [manager, setManager] = useState<boolean>(false)
    const [workersArr, setWorkersArr] = useState([])

    useEffect(() => {
        setManager(managers[id].owned)
        setWorkersArr([managers[id], workers[id * 2], workers[id * 2 + 1]])
    }, [managers[id].owned, workers[id * 2].owned, workers[id * 2 + 1].owned])

    useEffect(() => {
        setLevelProgress(calculatePercentage(milestones, level)) // calculate the % progress of the levels (in relation to the next milestone)
        setPayout(init_payout * level * multiplier * global_multiplier)
        setDuration(init_timer / time_divisor / global_divisor)
    }, [level, multiplier, time_divisor, global_divisor])

    const handlePress = () => !manager && !endTime ? setBtnChange(prev => !prev) : null

    if(workersArr.length < 3) return null
    
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
                        workers={workersArr}
                        manager={manager}
                        buyQuantity={buyQuantity}
                        init_cost={init_cost}
                        level={level}
                        coefficient={coefficient}
                    />
                </View>
            </View>
            <View style={styles.layer}>
                <ProgressBar
                    manager={manager}
                    duration={duration}
                    endTime={endTime}
                    updateEndTime={value => setEndTime(value)}
                    payout={payout}
                    btnChange={btnChange}
                />
                {/* <Countdown
                    duration={duration}
                    endTime={endTime}
                /> */}
            </View>
        </View>
    )
}