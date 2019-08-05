import React, { useState } from "react";
import { StyleSheet, Text, View ,FlatList, Button} from 'react-native';
import GeofenceTask, {getEventHistory, clearEventHistory} from "./GeofenceTask"
import * as Permissions from 'expo-permissions';

Permissions.askAsync(Permissions.LOCATION)
GeofenceTask.startAsync();

export default function App() {


  const [eventHistory, setEventHistory] = useState([]);

  async function getGeofenceHistory() {
    const geofenceEvents = await getEventHistory();
    console.log(geofenceEvents)
    setEventHistory(geofenceEvents);
  }

  async function clearGeofenceHistory() {
    await clearEventHistory();
    setEventHistory([]);
  }

  return (
    <View style={styles.container}>
      <Text>{`Event History length ${eventHistory.length}`}</Text>
      <FlatList
        data={eventHistory}
        renderItem={({item}) => <Text>{`${item.key} | ${item.value.eventType === 1 ? "ENTER" : "EXIT"} | ${item.value.region}`}</Text>}
      />
      <View style={{flexDirection: "row"}}>
        <Button
          onPress={getGeofenceHistory}
          title="Refresh History"
          color="#FF0000"
        />
        <Button
          onPress={clearGeofenceHistory}
          title="Clear History"
          color="#0000FF"
        />
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {

    margin: 30,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
