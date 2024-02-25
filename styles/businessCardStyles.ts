import { StyleSheet, Dimensions } from 'react-native'
import colors from '../assets/ColorPalette'

const { TURQUOISE, GREEN, WHITE, RED, DARK_RED, BLACK, GREY } = colors
const width = Dimensions.get('window').width

export default StyleSheet.create({
    card: {
        height: 160,
        paddingVertical: 18,
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
    imageBtn: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    image: {
        width: 96,
        height: 96,
    },
    detailsBox: {
        justifyContent: 'space-between',
        width: width - 186,
        height: 72,
    },
    titleBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'bold',
        fontSize: 14,
        color: WHITE,
        marginRight: 5,
        maxWidth: (width - 236),
    },
    levelBox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 45,
        height: 20,
        borderRadius: 10,
        backgroundColor: GREY,
        overflow: 'hidden'
    },
    levelProgress: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 19.8,
        height: 20,
        borderRadius: 10,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: GREEN
    },
    levelText: {
        fontFamily: 'bold',
        fontSize: 12,
        lineHeight: 13,
        textAlign: 'center',
        color: BLACK,
        paddingTop: 3
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoBox: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: (width - 196) / 2,
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
        fontSize: 15,
        lineHeight: 17,
        textAlign: 'center',
        color: BLACK
    },
    infoMinor: {
        fontSize: 9,
        lineHeight: 11,
    },
    timeBox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: (width / 2) + 8,
        height: 40,
        paddingVertical: 6,
        borderRadius: 10,
        marginRight: 10,
        backgroundColor: GREY,
        overflow: 'hidden'
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
        fontSize: 15,
        lineHeight: 17,
        paddingTop: 2,
        textAlign: 'center',
        color: BLACK
    },
    levelCount: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -11,
        right: -6,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        backgroundColor: RED
    },
    levelCountText: {
        fontFamily: 'bold',
        fontSize: 10,
        lineHeight: 11,
        paddingTop: 2,
        textAlign: 'center',
        color: WHITE
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
    darkCard: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 160,
        paddingVertical: 18,
        paddingHorizontal: 25,
        borderRadius: 20,
        borderColor: RED,
        backgroundColor: GREY
    },
    darkImageBox: {
        justifyContent: 'center',
        minWidth: 106,
        width: 106,
        height: '100%',
    },
    darkImageWrap: {
        position: 'absolute',
        left: 0,
        height: '100%',
        justifyContent: 'center',
    },
    darkImage: {
        width: 96,
        height: 96,
    },
    darkDetailsBox: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100%',
        width: width - 186,
    },
    darkCost: {
        fontFamily: 'bold',
        fontSize: 24,
        lineHeight: 26,
        marginBottom: 6,
        color: BLACK,
    },
    darkTitle: {
        fontFamily: 'bold',
        fontSize: 16,
        lineHeight: 18,
        marginBottom: 8,
        color: BLACK
    },
    darkBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: BLACK,
        borderRadius: 10,
        backgroundColor: GREY,
        paddingHorizontal: 15,
        height: 40
    },
    buyableBtn: {
        backgroundColor: RED,
        borderColor: DARK_RED
    },
    darkBtnText: {
        fontFamily: 'bold',
        fontSize: 14,
        color: BLACK
    },
})