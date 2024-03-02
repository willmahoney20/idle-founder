import { useState } from 'react'
import { View } from 'react-native'
import Tabs from './Tabs'
import WorkersModal from '../modals/Workers'
import Screen from './Screen'

export default () => {
    const [workersModalVisible, setWorkersModalVisible] = useState<boolean>(true)

    return (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
            {workersModalVisible &&
            <WorkersModal
                visible={workersModalVisible}
                handleClose={() => setWorkersModalVisible(false)}
            />}
            
            <Screen />

            <Tabs
                openWorkers={() => setWorkersModalVisible(true)}
            />
        </View>
    )
}
