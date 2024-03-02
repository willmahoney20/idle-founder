import { Dimensions, Pressable, Image, StyleSheet, Text, View } from 'react-native'
import LockIcon from '../assets/tab-icons/lock.png'
import WorkerIcon from '../assets/tab-icons/worker.png'
import UpgradeIcon from '../assets/tab-icons/arrow.png'
import PrizeIcon from '../assets/tab-icons/wheel.png'
import FutureIcon from '../assets/tab-icons/time_travel.png'
import colors from '../assets/ColorPalette'

const { DARK_BLUE, GREY, BLACK } = colors
const width = Dimensions.get('window').width

export default ({ openWorkers }) => {
    return (
        <View style={styles.tabs}>
            <View style={styles.tabBoxRestart}>
                <Image source={LockIcon} style={styles.lockIcon} />
                <Text style={styles.lockText}>RESTART</Text>
            </View>
            <Pressable onPress={openWorkers}>
                <View style={styles.tabBox}>
                    <Image source={WorkerIcon} style={styles.workerIcon} />
                </View>
            </Pressable>
            <View style={styles.tabBox}>
                <Image source={UpgradeIcon} style={styles.upgradeIcon} />
            </View>
            <View style={styles.tabBox}>
                <Image source={PrizeIcon} style={styles.prizeIcon} />
            </View>
            <View style={styles.tabBox}>
                <Image source={FutureIcon} style={styles.futureIcon} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: width,
        height: (width / 5.2),
        zIndex: 2,
        backgroundColor: 'yellow'
    },
    tabBoxRestart: {
        justifyContent: 'center',
        alignItems: 'center',
        width: (width / 5.2) * 1.2,
        height: (width / 5.2) * 1.2,
        borderWidth: 4,
        borderColor: '#AAAAAA',
        borderTopRightRadius: 15,
        backgroundColor: GREY
    },
    lockIcon: {
        width: 40,
        height: 40,
        marginBottom: 6
    },
    lockText: {
        fontFamily: 'bold',
        fontSize: 13,
        textAlign: 'center',
        color: BLACK
    },
    tabBox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width / 5.2,
        height: width / 5.2,
        borderWidth: 2,
        borderColor: '#000000',
        borderLeftWidth: 0,
        backgroundColor: DARK_BLUE
    },
    workerIcon: {
        width: 42,
        height: 42
    },
    upgradeIcon: {
        width: 41,
        height: 41
    },
    prizeIcon: {
        width: 44,
        height: 44
    },
    futureIcon: {
        width: 42,
        height: 42
    },
})