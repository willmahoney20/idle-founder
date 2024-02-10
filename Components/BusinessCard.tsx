import { StyleSheet, View, Text, Image, Dimensions } from 'react-native'
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
                    <Image source={icons[id].icon} style={[styles.image, icons[id].style]} />
                </View>
                <View style={styles.detailsBox}>
                    <View style={styles.titleBox}>
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
        height: 75,
    },
    titleBox: {
        marginBottom: 10
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