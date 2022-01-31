import React, { useState , useRef } from 'react';
import {Text , View, StyleSheet, Alert} from 'react-native';
import { Button } from 'react-native';
import Card from '../Components/Card';
import NumberContainer from '../Components/NumberContainer';

const randomnumgen = (min,max,exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const num = Math.floor(Math.random()*(max-min))+min;
    if(num === exclude)
    return randomnumgen(min,max,exclude);
    else
    return num;
} 

const GameScreen = props => {
    const [guess , setguess] = useState(randomnumgen(1,100,props.userChoice));

const currentLow = useRef(1);
const currentHigh = useRef(100);
const generatenewguess = direction => {
if((direction === 'lower' && guess < props.userChoice) || (direction === 'higher' && guess > props.userChoice)){
    Alert.alert("Dont Cheat!" , "Your Cheater You Scumbag" ,[{text:'sorry!',style:'cancel',}])
    return;
}
if(direction === 'lower')
    currentHigh.current = guess;
if(direction === 'higher')
    currentLow.current = guess;
const nextnumber = randomnumgen(currentLow.current , currentHigh.current , guess);
setguess(nextnumber);
};

return (
    <View style={style.screen}>
        <Text>Computer's Guess</Text>
        <NumberContainer>{guess}</NumberContainer>
        <Card style={style.buttonc}>
            <Button title = "Higher" onPress = {generatenewguess.bind(this , 'higher')}/>
            <Button title = "Lower" onPress = {generatenewguess.bind(this , 'lower')} />
        </Card>
    </View>

);
};
const style = StyleSheet.create({
    screen : {
        flex : 1,
        padding : 10,
        alignItems : 'center',

    },
    buttonc : {
        flexDirection : 'row',
        justifyContent:'space-around',
        marginTop : 20,
        width : 300,
        maxWidth : '80%'
    }

});


export default GameScreen;