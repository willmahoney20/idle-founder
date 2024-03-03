import { Dimensions, View, StyleSheet, Image, Text, Pressable } from "react-native"
import colors from '../assets/ColorPalette'
import Hotdog from '../assets/business-icons/hotdog_128.png'
import { moneyStore } from "../store"

const { WHITE, BLACK, GREEN, LIGHT_GREEN, RED, DARK_RED, GREY } = colors
const { width } = Dimensions.get('window')

interface CardProps {
    title: string,
    subtitle: string,
    cost: number,
    form_cost: string[]
}

export default ({ title, subtitle, cost, form_cost }: CardProps) => {
    const { money } = moneyStore()

    return (
        <View style={styles.card}>
            <View style={styles.content}>
                <View style={styles.iconCon}>
                    <Image source={Hotdog} style={styles.icon} />
                </View>
                <View style={styles.details}>
                    <Text style={styles.title}>{title}</Text>
                    <Text numberOfLines={2} ellipsizeMode="tail" style={styles.subtitle}>{subtitle}</Text>
                </View>
            </View>
            <Pressable>
                <View
                    style={[
                        styles.btn,
                        {
                            backgroundColor: money >= cost ? RED : GREY,
                            borderColor: money >= cost ? DARK_RED : '#AAA'
                        }
                    ]}
                >
                    <Text
                        style={[
                            styles.btnText,
                            {
                                color: money >= cost ? WHITE : BLACK
                            }
                        ]}
                    >
                        ${form_cost[1] ? form_cost[0] : form_cost[0]}
                    </Text>
                    {form_cost[1] &&
                    <Text
                        style={[
                            styles.btnText,
                            styles.btnTextMinor,
                            {
                                color: money >= cost ? WHITE : BLACK
                            }
                        ]}
                        numberOfLines={1}
                    >
                        {form_cost[1]}
                    </Text>}
                </View>
            </Pressable>
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
        borderColor: DARK_RED,
        borderRadius: 10,
        backgroundColor: RED,
        width: 82,
        height: 50,
    },
    btnText: {
        fontFamily: 'bold',
        fontSize: 14,
        lineHeight: 17,
        textAlign: 'center',
        color: WHITE
    },
    btnTextMinor: {
        fontSize: 9,
        lineHeight: 11,
    },
})