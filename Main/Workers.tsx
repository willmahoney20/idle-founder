import { StyleSheet, Pressable, Image, Modal, Animated, View, Dimensions, Text } from 'react-native'
import colors from '../assets/ColorPalette'
import CloseIcon from '../assets/tab-icons/close.png'
import UpgradeCard from '../components/UpgradeCard'

const { LIGHT_GREEN_BG, RED, DARK_RED, WHITE, BLACK } = colors
const { width, height } = Dimensions.get('window')

export default ({ visible, handleClose }) => {

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
                            <Pressable style={styles.closeCon}>
                                <Image source={CloseIcon} style={styles.closeIcon} />
                            </Pressable>
                        </View>
                        <View style={styles.cardContainer}>
                            <UpgradeCard />
                        </View>
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
    },
    modalContent: {
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
    cardContainer: {
        paddingTop: 55,
    }
})