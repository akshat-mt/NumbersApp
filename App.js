import { StatusBar } from 'expo-status-bar';
import React , {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './Components/Header';
import Startscreen from './Screens/Startscreen';
import GameScreen from './Screens/GameScreen';
export default function App() {

  const [usenum, setusenum] = useState();

  const startgame = selectednumber => {
    setusenum(selectednumber);
  };

  let display = <Startscreen onStartGame ={startgame}/>;

  if(usenum){
    display =  <GameScreen userChoice={usenum}/>;
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess A Number"/>
      {display}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
