import { useState, useEffect } from 'react'
import { StyleSheet, Pressable, Image, Modal, Animated, View, Dimensions, Text } from 'react-native'
import colors from '../assets/ColorPalette'
import CloseIcon from '../assets/tab-icons/close.png'
import UpgradeCard from '../components/UpgradeCard'
import { useStore } from '../store'
import managers_data from '../data/managers'
import workers_data from '../data/workers'
import formulateNumber from '../functions/formulateNumber'
import { RecyclerListView, LayoutProvider, DataProvider } from 'recyclerlistview'

const { LIGHT_GREEN_BG, RED, DARK_RED, WHITE, BLACK } = colors
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
                                    <Text style={styles.title}>WORKERS</Text>
                                </View>
                            </View>
                            <View style={styles.subtitleContainer}>
                                <View style={styles.subtitleBox}>
                                    <Text style={styles.subtitle}>Hire these workers to boost productivity!</Text>
                                </View>
                            </View>
                            <Pressable style={styles.closeCon} onPress={handleClose}>
                                <Image source={CloseIcon} style={styles.closeIcon} />
                            </Pressable>
                        </View>
                        {data.length < 1 ?
                        <View style={styles.noCards}>
                            <Text style={styles.noCardsTitle}>
                                Nice Work
                            </Text>
                            <Text style={styles.noCardsText}>
                                You've bought all the available workers!
                            </Text>
                        </View>
                        :
                        <RecyclerListView
                            style={{ marginTop: 36 }}
                            layoutProvider={layoutProvider}
                            dataProvider={dataProvider}
                            scrollViewProps={{
                                showsVerticalScrollIndicator: false
                            }}                           
                            rowRenderer={(type, data, index) => (
                                <UpgradeCard
                                    id={data.business_id}
                                    worker_id={data.worker_id}
                                    last_card={index === data.length - 1 ? true : false}
                                    type={data.type}
                                    title={data.name}
                                    subtitle={data.type === 'manager' ? `Runs the ${data.business}` : `2x profits for ${data.business}`}
                                    cost={data.cost}
                                    form_cost={formulateNumber(data.cost).split(' ')}
                                    removeCard={() => {
                                        setData(prev => {
                                            return [...prev].filter((x, i) => index === i ? false : true)
                                        })
                                    }}
                                />
                            )}
                        />}
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
    noCards: {
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noCardsTitle: {
        fontFamily: 'bold',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
        color: BLACK
    },
    noCardsText: {
        fontFamily: 'bold',
        fontSize: 12,
        textAlign: 'center',
        color: BLACK
    }
})