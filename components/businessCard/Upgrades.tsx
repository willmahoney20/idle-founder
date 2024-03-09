import { useState, useEffect } from 'react'
import { Image, View, Pressable, Text } from 'react-native'
import colors from '../../assets/ColorPalette'
import styles from '../../styles/businessCardStyles'
import { moneyStore, useStore } from '../../store'
import workers_data from '../../data/workers'
import managers_data from '../../data/managers'
import calculateLevelUpgrades from '../../functions/calculateLevelUpgrades'
import HotdogManager from '../../assets/workers/hotdog_stand_manager.png'
import formulateNumber from '../../functions/formulateNumber'

const { GREEN, GREY } = colors

export default ({ id, workers, manager, buyQuantity, init_cost, level, coefficient }) => {
    const { money } = moneyStore()
    const { updateBusinessLevel, updateManager, updateWorker } = useStore()
    const [nextUpgradeCost, setNextUpgradeCost] = useState<number>(0)
    const [nextUpgradePossible, setNextUpgradePossible] = useState<boolean>(false)
    const [nextUpgradeFormulated, setNextUpgradeFormulated] = useState<string[]>([''])
    const [nextMaxCost, setNextMaxCost] = useState<number>(0)
    const [levelCount, setLevelCount] = useState<number>(1)
    const [nextWorkerType, setNextWorkerType] = useState<string>('manager')
    const [nextWorkerCost, setNextWorkerCost] = useState<number>(0)
    const [nextWorkerFormulated, setNextWorkerFormulated] = useState<string>('HIRED')
    const [nextWorkerPossible, setNextWorkerPossible] = useState<boolean>(false)

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
    }, [buyQuantity, level])
    
    // check if the user's funds have surpassed the cost of another level upgrade
    if(buyQuantity === 'MAX' && money >= nextMaxCost) updateLevelDetails()

    if(nextUpgradePossible && money < nextUpgradeCost) setNextUpgradePossible(false)
    if(!nextUpgradePossible && money >= nextUpgradeCost) setNextUpgradePossible(true)

    // function for getting the next worker upgrade details
    const handleWorkerDetails = () => {
        for(let i = 0; i < workers.length; i++){
            if(!workers[i].owned){
                setNextWorkerType(i < 1 ? 'manager' : `worker ${i - 1}`)
                setNextWorkerCost(workers[i].cost)
                setNextWorkerFormulated(formulateNumber(workers[i].cost))
                setNextWorkerPossible(money >= workers[i].cost)
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
    }, [workers])

    if(nextWorkerFormulated !== 'HIRED'){
        if(nextWorkerPossible && money < nextWorkerCost) setNextWorkerPossible(false)
        if(!nextWorkerPossible && money >= nextWorkerCost) setNextWorkerPossible(true)
    }

    const handleLevelUpgrade = () => {
        // check user has sufficient funds for upgrade
        if(nextUpgradePossible){
            updateBusinessLevel(id, levelCount, nextUpgradeCost)
        }
    }

    const handleWorker = () => {
        // check user has sufficient funds for buying this worker
        if(nextWorkerPossible && nextWorkerFormulated !== 'HIRED'){
            if(nextWorkerType === 'manager'){
                updateManager(id, nextWorkerCost)
            } else if(nextWorkerType.includes('worker')){
                const worker_id = id * 2 + parseInt(nextWorkerType.split(' ')[1])
                updateWorker(id, worker_id, nextWorkerCost)
                handleWorkerDetails()
            }
        }
    }

    return (
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
    )
}