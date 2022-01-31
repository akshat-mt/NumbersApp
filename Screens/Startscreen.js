import React , {useState} from "react";
import { View ,Text , StyleSheet, TextInput, Button ,TouchableWithoutFeedback , Keyboard, Alert} from "react-native";
import Card from "../Components/Card";
import Input from "../Components/input";
import NumberContainer from "../Components/NumberContainer";
const Startscreen = props => {
    const [enteredvalue, setenteredvalue] = useState('');
    const [isaccepted , setisaccepted]    = useState(false);
    const [selectedNumber,setSelectedNumber] = useState();

     const ontextchangehandler = (inputvalue) => {
        setenteredvalue(inputvalue.replace(/[^0-9]/g,''));
    };
    const onresetHandler = () => {
        setenteredvalue('');
        setisaccepted(false);
    };
    const onacceptHandler = () => {
        const number = parseInt(enteredvalue);
        if( isNaN(number)|| number<=0 || number > 99){
            Alert.alert('Wrong Input','The Number Can Only be Between 1 and 99',[{text:'okay' , style :'destructive',onPress:onresetHandler}])
            return;
        } 
        setisaccepted(true);
        setenteredvalue('');
        setSelectedNumber(parseInt(enteredvalue));
        Keyboard.dismiss();

    }
    let confirmed;
    if(isaccepted){
        confirmed = 
            <Card style={styles.summarycontainer}>
                <Text>You selected :</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title="START GAME" onPress ={() => props.onStartGame(selectedNumber)}/>
            </Card>
        
    }
return (
<TouchableWithoutFeedback onPress={() => {
    Keyboard.dismiss();
}} >
    <View style={styles.startscreen}>
        <Text style={styles.title}>Let's Start The Game</Text>
        <Card style={styles.inputcontainer} >   
            <Text>Select a number</Text>
            <Input style={styles.input} 
            blurOnSubmit 
            autoCapitalize='none' 
            autoCorrect={false} 
            keyboardType="number-pad"  
            maxLength={2}
            onChangeText = {ontextchangehandler}
            value={enteredvalue}
            />
            <View style={styles.buttoncontainer}>
                <View style={styles.button}><Button color='#f7287b'title="Confirm" onPress={onacceptHandler}/></View>
                <View style={styles.button}><Button color='#c717fc'title="Reset" onPress={onresetHandler}/></View>
            </View>
        </Card>
        {confirmed}
    </View>
</TouchableWithoutFeedback>
);
}

const styles = StyleSheet.create ({
    startscreen : {
        padding:10,
        flex : 1,
        alignItems:'center',
    },
    buttoncontainer : {
        flexDirection : "row",
        width : '100%',
        justifyContent: 'space-between',
        paddingHorizontal:15,
        
    },

    inputcontainer: {
            width:300,
            maxWidth : '80%',
            alignItems: 'center',
    },
    title : {
        fontSize:20,
        marginVertical:10,


    },
    button : {  
        width:85
    },
    input : {
        width:50,
        textAlign:'center'
    },
    summarycontainer : {
        marginTop : 50,
        alignItems:"center"
    }
})
export default Startscreen