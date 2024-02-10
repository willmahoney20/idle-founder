import { StyleSheet, Pressable, View, Text, Image, Dimensions } from 'react-native'
import Hotdog from '../assets/business-icons/hotdog_128.png'
import Laundromat from '../assets/business-icons/laundromat_128.png'
import LaundromatDark from '../assets/business-icons/laundromat_dark_128.png'
import Comic from '../assets/business-icons/comic_128.png'
import ComicDark from '../assets/business-icons/comic_dark_128.png'
import FastFood from '../assets/business-icons/fast_food_128.png'
import FastFoodDark from '../assets/business-icons/fast_food_dark_128.png'
import Fitness from '../assets/business-icons/fitness_128.png'
import FitnessDark from '../assets/business-icons/fitness_dark_128.png'
import Movie from '../assets/business-icons/movie_128.png'
import MovieDark from '../assets/business-icons/movie_dark_128.png'
import Sports from '../assets/business-icons/stadium_128.png'
import SportsDark from '../assets/business-icons/stadium_dark_128.png'
import Airline from '../assets/business-icons/airline_128.png'
import AirlineDark from '../assets/business-icons/airline_dark_128.png'
import Streaming from '../assets/business-icons/streaming_128.png'
import StreamingDark from '../assets/business-icons/streaming_dark_128.png'
import Space from '../assets/business-icons/space_128.png'
import SpaceDark from '../assets/business-icons/space_dark_128.png'
import HotdogManager from '../assets/workers/hotdog_stand_manager.png'
import colors from '../assets/ColorPalette'
import formulateNumber from '../functions/formulateNumber'
import milestones from '../Data/milestones'
import calculatePercentage from '../functions/calculatePercentage'

const { TURQUOISE, GREEN, WHITE, RED, DARK_RED, BLACK, GREY } = colors
const width = Dimensions.get('window').width

type BusinessCardProps = {
    money: number,
    id: number,
    title: string,
    level: number,
    init_cost: number,
    coefficient: number
}

export default ({ money, id, title, level, init_cost, coefficient }: BusinessCardProps) => {
    // if the user doesn't own this business, we need to display a different card
    if(level < 1) return (
        <View style={[styles.darkCard, { marginBottom: id === 9 ? 30 : 20, borderWidth: money > init_cost ? 6 : 0 }]}>
            <View style={styles.darkImageBox}>
                <View style={styles.darkImageWrap}>
                    <Image source={money > init_cost ? icons[id].icon : icons[id].dark_icon} style={[styles.darkImage, icons[id].style]} />
                </View>
            </View>
            <View style={styles.darkDetailsBox}>
                <Text style={styles.darkCost}>${formulateNumber(init_cost)}</Text>
                <Text style={styles.darkTitle} numberOfLines={1}>{title}</Text>
                <Pressable>
                    <View style={[styles.darkBtn, money > init_cost ? styles.buyableBtn : null]}>
                        <Text style={[styles.darkBtnText, { color: money > init_cost ? WHITE : BLACK }]}>BUY BUSINESS</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    )

    let level_progress = calculatePercentage(milestones, level) // calculate the % progress of the levels (in relation to the next milestone)
    let next_upgrade_cost = formulateNumber(init_cost * (coefficient ** level)).split(" ") // calculate the cost of the next upgrade
    let next_worker = 0 // calculate the cost of the next worker, and get their image (if all hired, then display the manager and 'HIRED')

    console.log(title, level_progress)

    return (
        <View style={[styles.card, { marginBottom: id === 9 ? 30 : 20 }]}>
            <View style={[styles.layer, { marginBottom: 12 }]}>
                <View style={styles.imageBox}>
                    <Image source={icons[id].icon} style={[styles.image, icons[id].style]} />
                </View>
                <View style={styles.detailsBox}>
                    <View style={styles.titleBox}>
                        <Text style={styles.title} numberOfLines={1}>{'GLOBAL STREAMING PLATFORM'}</Text>
                        <View style={styles.levelBox}>
                            <View style={styles.levelProgress}></View>
                            <Text style={styles.levelText}>{level}</Text>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <View style={[styles.infoBox, { backgroundColor: GREEN, justifyContent: next_upgrade_cost[1] ? 'space-between' : 'center' }]}>
                            <View style={styles.levelCount}>
                                <Text style={styles.levelCountText}>x1</Text>
                            </View>
                            <Text style={styles.infoText}>${next_upgrade_cost[1] ? next_upgrade_cost[0] : parseInt(next_upgrade_cost[0])}</Text>
                            {next_upgrade_cost[1] &&
                            <Text style={[styles.infoText, styles.infoMinor]} numberOfLines={1}>{next_upgrade_cost[1]}</Text>}
                        </View>
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
                    <View style={styles.timeProgress}></View>
                    <Text style={styles.timeText}>$1.2K / sec</Text>
                </View>
                <View style={[styles.infoBox, { justifyContent: 'center' }]}>
                    <Text style={styles.timeText}>00:00:00</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
    image: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 96,
        height: 96,
    },
    hotdogIcon: {
        width: 96,
        height: 96,
    },
    laundromatIcon: {
        bottom: -1,
        left: -16,
        width: 107,
        height: 107,
    },
    comicIcon: {
        width: 102,
        height: 102,
    },
    fastFoodIcon: {
        width: 96,
        height: 96,
    },
    fitnessIcon: {
        width: 100,
        height: 100,
    },
    movieIcon: {
        left: -4,
        width: 98,
        height: 98,
    },
    sportsIcon: {
        left: -2,
        bottom: -12,
        width: 98,
        height: 98,
    },
    airlineIcon: {
        left: -6,
        bottom: -8,
        width: 104,
        height: 104,
    },
    streamingIcon: {
        left: -3,
        width: 96,
        height: 96,
    },
    spaceIcon: {
        width: 100,
        height: 100,
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
        backgroundColor: GREY
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
    timeBox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: (width / 2) + 8,
        height: 40,
        paddingVertical: 6,
        borderRadius: 10,
        marginRight: 10,
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
        fontSize: 15,
        lineHeight: 17,
        paddingTop: 2,
        textAlign: 'center',
        color: BLACK
    },
    darkCard: {
        flexDirection: 'row',
        height: 160,
        paddingVertical: 18,
        paddingHorizontal: 25,
        borderRadius: 20,
        borderColor: RED,
        backgroundColor: GREY
    },
    darkImageBox: {
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

const icons = [
    { icon: Hotdog, style: styles.hotdogIcon },
    { icon: Laundromat, dark_icon: LaundromatDark, style: styles.laundromatIcon },
    { icon: Comic, dark_icon: ComicDark, style: styles.comicIcon },
    { icon: FastFood, dark_icon: FastFoodDark, style: styles.fastFoodIcon },
    { icon: Fitness, dark_icon: FitnessDark, style: styles.fitnessIcon },
    { icon: Movie, dark_icon: MovieDark, style: styles.movieIcon },
    { icon: Sports, dark_icon: SportsDark, style: styles.sportsIcon },
    { icon: Airline, dark_icon: AirlineDark, style: styles.airlineIcon },
    { icon: Streaming, dark_icon: StreamingDark, style: styles.streamingIcon },
    { icon: Space, dark_icon: SpaceDark, style: styles.spaceIcon }
]