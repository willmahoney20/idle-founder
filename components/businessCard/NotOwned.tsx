import { useState, useEffect } from 'react'
import { View, Image, Text, Pressable } from 'react-native'
import styles from '../../styles/businessCardStyles'
import icons from './BusinessCardIcons'
import colors from '../../assets/ColorPalette'
import formulateNumber from '../../functions/formulateNumber'

const { WHITE, BLACK } = colors

type NotOwnedProps = {
    id: number,
    money: number,
    title: string,
    init_cost: number
}

export default ({ id, money, init_cost, title }: NotOwnedProps) => {
    const [initCost, setInitCost] = useState<string>('')

    useEffect(() => {
        setInitCost(formulateNumber(init_cost))
    }, [init_cost])

    return (
        <View style={[styles.darkCard, { marginBottom: id === 9 ? 30 : 20, borderWidth: money > init_cost ? 6 : 0 }]}>
            <View style={styles.darkImageBox}>
                <View style={styles.darkImageWrap}>
                    <Image source={money > init_cost ? icons[id].icon : icons[id].dark_icon} style={[styles.darkImage, icons[id].style]} />
                </View>
            </View>
            <View style={styles.darkDetailsBox}>
                <Text style={styles.darkCost}>${initCost}</Text>
                <Text style={styles.darkTitle} numberOfLines={1}>{title}</Text>
                <Pressable>
                    <View style={[styles.darkBtn, money > init_cost ? styles.buyableBtn : null]}>
                        <Text style={[styles.darkBtnText, { color: money > init_cost ? WHITE : BLACK }]}>BUY BUSINESS</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}