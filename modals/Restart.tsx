import { useState, useEffect } from 'react'
import { StyleSheet, Pressable, Image, Modal, Animated, View, Dimensions, Text, ScrollView } from 'react-native'
import colors from '../assets/ColorPalette'
import CloseIcon from '../assets/tab-icons/close.png'
import { useStore } from '../store'
import managers_data from '../data/managers'
import workers_data from '../data/workers'
import { LayoutProvider, DataProvider } from 'recyclerlistview'
import BucksIcon from '../assets/header-icons/bucks.png'

const { LIGHT_GREEN_BG, RED, DARK_RED, WHITE, BLACK, TURQUOISE } = colors
const { width, height } = Dimensions.get('window')

export default ({ visible, handleClose }) => {
    const { managers, workers } = useStore()
    const [data, setData] = useState([])

    useEffect(() => {
        let arr = [
            ...managers_data.filter((x, i) => !managers[i].owned),
            ...workers_data.filter((x, i) => !workers[i].owned)
        ]
            .sort((a, b) => a.cost - b.cost)

        setData(arr)
    }, [workers, managers])

    const dataProvider = new DataProvider((r1, r2) => r1.name !== r2.name).cloneWithRows(data)

    const layoutProvider = new LayoutProvider(
        index => 0,
        (type, dim, index) => {
            dim.width = width - 32
            dim.height = index === data.length - 1 ? 120 : 100
        }
    )

    return (
        <Modal visible={visible} transparent={true} animationType='slide' onRequestClose={handleClose}>
            <View style={styles.modalContainer}>
                <Animated.View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <View>
                            <View style={styles.titleContainer}>
                                <View style={styles.titleBox}>
                                    <Text style={styles.title}>RESTART</Text>
                                </View>
                            </View>
                            <View style={styles.subtitleContainer}>
                                <View style={styles.subtitleBox}>
                                    <Text style={styles.subtitle}>Strategically restart to grow faster!</Text>
                                </View>
                            </View>
                            <Pressable style={styles.closeCon} onPress={handleClose}>
                                <Image source={CloseIcon} style={styles.closeIcon} />
                            </Pressable>
                        </View>
                        <ScrollView style={{ marginTop: 60 }}>
                            <View style={styles.detailsCon}>
                                <Text style={styles.detailsText}>
                                    Start fresh and grow faster with "Mega Bucks"! As you earn more money, you will be offered more “Mega Bucks” to restart. 
                                </Text>
                                <Text style={[styles.detailsText]}>
                                    You can use “Mega Bucks” to increase your profits and buy new upgrades, but you have to sell all of your businesses and start over to receive them.
                                </Text>
                                <Text style={[styles.detailsText, { fontFamily: 'semi-bold', color: BLACK }]}>
                                    Don’t worry though, it’s worth it!
                                </Text>
                            </View>
                            <View style={styles.boxCon}>
                                <View style={styles.box}>
                                    <Text style={styles.boxTitle}>5,089</Text>
                                    <Text style={styles.boxSubtitle}>Total Mega Bucks</Text>
                                </View>
                                <View style={styles.box}>
                                    <Text style={styles.boxTitle}>1%</Text>
                                    <Text style={styles.boxSubtitle}>Bonus / Mega Buck</Text>
                                </View>
                            </View>
                            <View style={styles.bucksCon}>
                                <Image source={BucksIcon} style={styles.bucksIcon} />
                                <View style={styles.bucksTextCon}>
                                    <Text style={styles.bucksNum}>
                                        1.302 <Text style={{ fontSize: 12 }}>MILLION</Text>
                                    </Text>
                                    <Text style={styles.bucksInfo}>MEGA BUCKS WITH RESTART</Text>
                                </View>
                            </View>
                            <View style={styles.claimBtnBox}>
                                <View style={styles.claimBtn}>
                                    <Text style={styles.claimBtnText}>CLAIM MEGA BUCKS</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modal: {
        alignItems: 'center',
        width: width,
        height: height * 0.9,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: LIGHT_GREEN_BG,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 4,
        elevation: 5,
        padding: 16,
        paddingVertical: 24,
        paddingBottom: 5,
    },
    modalContent: {
        flex: 1,
        width: '100%',
    },
    titleContainer: {
        position: 'absolute',
        left: -16,
        bottom: -16,
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
    },
    titleBox: {
        alignItems: 'center',
        height: 70, 
        paddingTop: 12,
        paddingHorizontal: 24,
        borderRadius: 40,
        backgroundColor: RED
    },
    title: {
        fontFamily: 'bold',
        fontSize: 26,
        textAlign: 'center',
        color: WHITE
    },
    subtitleContainer: {
        position: 'absolute',
        left: -16,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
    },
    subtitleBox: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 36,
        paddingHorizontal: 15,
        borderRadius: 15,
        backgroundColor: DARK_RED
    },
    subtitle: {
        fontFamily: 'bold',
        fontSize: 12,
        textAlign: 'center',
        color: WHITE
    },
    closeCon: {
        position: 'absolute',
        right: 0,
        top: 10,
    },
    closeIcon: {
        width: 16,
        height: 16,
    },
    detailsCon: {
        padding: 15,
        justifyContent: 'center',
    },
    detailsText: {
        fontFamily: 'regular',
        fontSize: 13,
        textAlign: 'center',
        marginBottom: 15,
        color: '#444'
    },
    boxCon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    box: {
        paddingVertical: 15,
        width: 155,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: TURQUOISE,
        marginHorizontal: 10,
    },
    boxTitle: {
        fontFamily: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 5,
        color: WHITE
    },
    boxSubtitle: {
        fontFamily: 'semi-bold',
        fontSize: 13,
        textAlign: 'center',
        color: WHITE
    },
    bucksCon: {
        alignItems: 'center',
        marginTop: 20,
    },
    bucksIcon: {
        width: 104,
        height: 104
    },
    bucksTextCon: {
        alignItems: 'center'
    },
    bucksNum: {
        fontFamily: 'bold',
        fontSize: 30,
        textAlign: 'center',
        color: BLACK
    },
    bucksInfo: {
        fontFamily: 'semi-bold',
        fontSize: 14,
        textAlign: 'center',
        color: BLACK
    },
    claimBtnBox: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    claimBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        width: 250,
        height: 70,
        backgroundColor: RED
    },
    claimBtnText: {
        fontFamily: 'bold',
        fontSize: 20,
        textAlign: 'center',
        color: WHITE
    },
})