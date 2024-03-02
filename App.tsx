import { StatusBar } from 'expo-status-bar'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins'
import ScreenContainer from './main/ScreenContainer'
import colors from './assets/ColorPalette'

const { LIGHT_GREEN_BG } = colors

export default () => {
	let [fontsLoaded, fontError] = useFonts({
		'light': Poppins_300Light,
		'regular': Poppins_400Regular,
		'medium': Poppins_500Medium,
		'semi-bold': Poppins_600SemiBold,
		'bold': Poppins_700Bold
	})
  
	if(!fontsLoaded && !fontError) return null

	return (
		<View style={styles.container}>
			<SafeAreaView style={{ flex: 1 }}>
				<StatusBar hidden />
				<ScreenContainer />
			</SafeAreaView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: LIGHT_GREEN_BG
	}
})