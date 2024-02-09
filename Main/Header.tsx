import { Pressable, Image, StyleSheet, Text, View } from 'react-native'
import SettingsIcon from '../assets/header-icons/settings.png'
import CashIcon from '../assets/header-icons/cash.png'
import GemIcon from '../assets/header-icons/gem.png'
import MegaBucksIcon from '../assets/header-icons/mega_bucks.png'
import TagsIcon from '../assets/header-icons/tags.png'
import colors from '../assets/ColorPalette'

const { DARK_BLUE, WHITE } = colors

type HeaderProps = {
    buyQuantity: string,
    handleBuyQuantity: () => void
}

export default ({ buyQuantity, handleBuyQuantity }: HeaderProps) => {
    return (
        <View style={styles.header}>
            <View style={[styles.layer, { marginBottom: 10 }]}>
                <View style={styles.box}>
                    <Image source={CashIcon} style={styles.cashIcon} />
                    <Text style={styles.text}>$73.382 <Text style={{ fontSize: 16 }}>UNDECILLION</Text></Text>
                </View>
                <Image source={SettingsIcon} style={styles.settingsIcon} />
            </View>
            <View style={[styles.layer, { justifyContent: 'flex-start' }]}>
                <View style={[styles.box, { marginLeft: 2, marginRight: 20 }]}>
                    <Image source={GemIcon} style={styles.gemIcon} />
                    <Text style={styles.smallText}>57</Text>
                </View>
                <View style={styles.box}>
                    <Image source={MegaBucksIcon} style={styles.mbIcon} />
                    <Text style={styles.smallText}>1.305 <Text style={{ fontSize: 11 }}>MILLION</Text></Text>
                </View>
                <View style={styles.tags}>
                    <Pressable onPress={handleBuyQuantity} style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}>
                        <Image source={TagsIcon} style={styles.tagsIcon} />
                        <View style={styles.tagTextBox}>
                            <Text style={[styles.tagText, { fontFamily: 'semi-bold', fontSize: 11, lineHeight: 13 }]}>BUY</Text>
                            <Text style={styles.tagText}>{['max', 'next'].includes(buyQuantity) ? buyQuantity.toUpperCase() : 'x' + buyQuantity}</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        paddingHorizontal: 12,
        backgroundColor: DARK_BLUE,
        height: 108,
        zIndex: 2,
    },
    layer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    settingsIcon: {
        width: 24,
        height: 24,
        marginTop: 2
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cashIcon: {
        width: 38,
        height: 38,
        marginRight: 8
    },
    text: {
        fontFamily: 'bold',
        fontSize: 30,
        color: WHITE
    },
    gemIcon: {
        width: 24,
        height: 24,
        marginRight: 5
    },
    mbIcon: {
        width: 28,
        height: 28,
        marginRight: 5
    },
    smallText: {
        fontFamily: 'bold',
        fontSize: 18,
        color: WHITE
    },
    tags: {
        position: 'absolute',
        top: -6,
        right: -12
    },
    tagsIcon: {
        width: 78,
        height: 54.6
    },
    tagTextBox: {
        position: 'absolute',
        width: 50,
        height: 33,
        top: 5,
        right: 5.5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 3,
    },
    tagText: {
        fontFamily: 'bold',
        fontSize: 13,
        lineHeight: 15,
        color: WHITE,
        textAlign: 'center'
    },
})