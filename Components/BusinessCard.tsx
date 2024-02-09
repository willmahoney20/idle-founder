import { StyleSheet, View, Text, Image, Dimensions } from 'react-native'
import Hotdog from '../assets/business-icons/hotdog_128.png'
import HotdogManager from '../assets/workers/hotdog_stand_manager.png'
import colors from '../assets/ColorPalette'

const { TURQUOISE, GREEN, WHITE, BLACK, GREY } = colors
const width = Dimensions.get('window').width

type BusinessCardProps = {
    id: number,
    title: string
}

export default ({ id, title }: BusinessCardProps) => {
    return (
        <View style={[styles.card, { marginBottom: id === 9 ? 30 : 20 }]}>
            <View style={[styles.layer, { marginBottom: 10 }]}>
                <View style={styles.imageBox}>
                    <Image source={Hotdog} style={styles.image} />
                </View>
                <View style={styles.detailsBox}>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.title} numberOfLines={1}>{title.toUpperCase()}</Text>
                    </View>
                    <View style={styles.info}>
                        <View style={styles.infoBox}>
                            <View style={styles.infoProgress}></View>
                            <Text style={styles.infoText}>36</Text>
                            <Text style={[styles.infoText, { fontSize: 11, lineHeight: 13 }]}>LEVEL</Text>
                        </View>
                        <View style={[styles.infoBox, { backgroundColor: GREEN }]}>
                            <Text style={styles.infoText}>X1</Text>
                            <Text style={[styles.infoText, { fontSize: 11, lineHeight: 13 }]}>$16.2K</Text>
                        </View>
                        <View style={[styles.infoBox, { backgroundColor: GREEN }]}>
                            <View style={styles.worker}>
                                <View style={styles.workerCon}>
                                    <Image source={HotdogManager} style={styles.hotdogManager} />
                                </View>
                            </View>
                            <Text style={[styles.infoText, { fontSize: 11, lineHeight: 13 }]}>HIRED</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.layer}>
                <View style={[styles.timeBox, { width: width - 190 }]}>
                    <View style={styles.timeProgress}></View>
                    <Text style={styles.timeText}>$1.2K / sec</Text>
                </View>
                <View style={[styles.timeBox, { width: 100, marginLeft: 10 }]}>
                    <Text style={styles.timeText}>00:00:00</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 20,
        backgroundColor: TURQUOISE
    },
    layer: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    imageBox: {
        minWidth: 106,
        width: 106,
        height: '100%',
    },
    image: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 96,
        height: 96,
    },
    detailsBox: {
        width: width - 186,
        height: 75,
    },
    title: {
        fontFamily: 'bold',
        fontSize: 14,
        color: WHITE,
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    infoBox: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 60,
        height: 40,
        paddingVertical: 6,
        borderRadius: 10,
        backgroundColor: GREY
    },
    infoProgress: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 26.4,
        height: 40,
        borderRadius: 10,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: GREEN
    },
    infoText: {
        fontFamily: 'bold',
        fontSize: 14,
        lineHeight: 16,
        textAlign: 'center',
        color: BLACK
    },
    worker: {
        height: 16,
        width: '100%',
    },
    workerCon: {
        position: 'absolute',
        bottom: 4,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    hotdogManager: {
        width: 32,
        height: 32,
    },
    timeBox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 40,
        paddingVertical: 6,
        borderRadius: 10,
        backgroundColor: GREY
    },
    timeProgress: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 40,
        borderRadius: 10,
        backgroundColor: GREEN
    },
    timeText: {
        fontFamily: 'semi-bold',
        fontSize: 18,
        textAlign: 'center',
        color: BLACK
    },
})