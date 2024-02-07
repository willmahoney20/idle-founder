import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins'

export default () => {
	let [fontsLoaded, fontError] = useFonts({ Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold })
  
	if(!fontsLoaded && !fontError) return null

	return (
		<View style={styles.container}>
			<Text style={{ fontFamily: 'Poppins_300Light' }}>Open up App.js to start working on your app!</Text>
			<StatusBar style="auto" />
		</View>
	)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
