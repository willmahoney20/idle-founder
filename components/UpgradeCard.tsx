import { Dimensions, View, StyleSheet, Image, Text, Pressable } from "react-native"
import colors from '../assets/ColorPalette'
import UpgradeCardIcons from './UpgradeCardIcons'
import { moneyStore, useStore } from "../store"

const { WHITE, BLACK, GREEN, LIGHT_GREEN, RED, DARK_RED, GREY } = colors
const { width } = Dimensions.get('window')

interface CardProps {
    id: number,
    worker_id: number,
    last_card: boolean,
    type: string,
    title: string,
    subtitle: string,
    cost: number,
    form_cost: string[],
    removeCard: () => void
}

export default ({ id, worker_id, last_card, type, title, subtitle, cost, form_cost, removeCard }: CardProps) => {
    const { money } = moneyStore()
    const { updateManager, updateWorker } = useStore()

    return (
        <View style={[styles.card, { marginBottom: last_card ? 20 : 0 }]}>
            <View style={styles.content}>
                <View style={styles.iconCon}>
                    <Image source={UpgradeCardIcons[id]} style={styles.icon} />
                </View>
                <View style={styles.details}>
                    <Text style={styles.title}>{title}</Text>
                    <Text numberOfLines={2} ellipsizeMode="tail" style={styles.subtitle}>{subtitle}</Text>
                </View>
            </View>
            {money >= cost ?
                <Pressable
                    onPress={() => {
                        if(type === 'manager'){
                            updateManager(id, cost)
                        } else {
                            updateWorker(id, worker_id, cost)
                        }

                        removeCard()
                    }}
                >
                    <View style={[styles.btn, styles.btnRed]}>
                        <Text style={[styles.btnText, styles.btnTextWhite]}>${form_cost[0]}</Text>
                        {form_cost[1] &&
                        <Text style={[styles.btnText, styles.btnTextMinor, styles.btnTextWhite]} numberOfLines={1}>
                            {form_cost[1]}
                        </Text>}
                    </View>
                </Pressable>
            : 
                <View style={styles.btn}>
                    <Text style={styles.btnText}>${form_cost[0]}</Text>
                    {form_cost[1] &&
                    <Text style={[styles.btnText, styles.btnTextMinor]} numberOfLines={1}>
                        {form_cost[1]}
                    </Text>}
                </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 8,
        borderColor: GREEN,
        borderRadius: 10,
        padding: 12,
        marginTop: 10,
        backgroundColor: LIGHT_GREEN,
    },
    content: {
        flexDirection: 'row',
        height: 50,
    },
    iconCon: {
        width: 50,
        overflow: 'hidden'
    },
    icon: {
        width: 50,
        height: 50,
    },
    details: {
        justifyContent: 'center',
        height: '100%',
        marginLeft: 10,
    },
    title: {
        fontFamily: 'bold',
        fontSize: 12,
        color: BLACK
    },
    subtitle: {
        fontFamily: 'medium',
        fontSize: 11,
        color: BLACK,
        width: width - 232
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#AAA',
        borderRadius: 10,
        backgroundColor: GREY,
        width: 82,
        height: 50,
    },
    btnRed: {
        backgroundColor: RED,
        borderColor: DARK_RED
    },
    btnGold: {
        backgroundColor: '#ffd60a',
        borderColor: '#ffc300'
    },
    btnText: {
        fontFamily: 'bold',
        fontSize: 14,
        lineHeight: 17,
        textAlign: 'center',
        color: BLACK
    },
    btnTextMinor: {
        fontSize: 9,
        lineHeight: 11,
    },
    btnTextWhite: {
        color: WHITE
    }
})