import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
export default class App extends React.Component{
  constructor(){
    super()
    this.state={
      text:'',
      word:'loading...',
      lexicalCategory:'',        
      examples:[],
      definition:"",
      isSearchPressed:false
    }
  }
  getWord=(word)=>{
    var searchKeyword=word.toLowerCase() 
    var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
    //console.log(url) 
    return fetch(url) 
    .then((data)=>{ 
      if(data.status===200) 
      { 
        return data.json() } 
        else { return null } }) 
        .then((response)=>{ 
          //console.log(response) 
          var responseObject = response
          if(responseObject) 
          {
             var wordData = responseObject.definitions[0] 
             //console.log(responseObject.definitions[0]) 
             var definition=wordData.description
              var lexicalCategory=wordData.wordtype 
              //console.log(lexicalCategory)
               this.setState({ "word" : this.state.text, 
               "definition" :definition,
                "lexicalCategory": lexicalCategory }) } 
                else { this.setState({ 
                  "word" : this.state.text, "definition" :"Not Found", }) } })



    
  }
render(){
  return(
    <View style={{flex:1}}>
      <View style={styles.inputBoxContainer}>
    <TextInput
  style={styles.inputBox}
  onChangeText={text =>{
this.setState({
  text:text,
  isSearchPressed:false,
  word:'loading...',
  LexicalCategory:'',
  examples:[],
  definition:"",

})
  
    
    
} 
}
    />
    <TouchableOpacity style={styles.SearchButton}
    onPress={()=>{
      this.setState({isSearchPressed:true})
      this.getWord(this.state.text)
    }}
    >
      <Text>
        Search
      </Text>
    </TouchableOpacity>
    <View style={styles.detailsContainer}>
<Text style={styles.detailsTitle}>
Type:{""} 
</Text>
<Text style={{fontSize:18}}>
this.state.lexicalCategory
</Text>
    </View>
    </View>
  </View>

   
  )
  
}
}
  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox:{
    width:'30%',
    height:40,
    alignSelf:'center',
    textAlign:'center',
    borderWidth:4,


  },
  inputBoxContainer:{
    flex:0.3,
    alignItems:'center',
    justifyContent:'center',
  },
  SearchButton:{
    width:'40%',
    height:40,
    justifyContent:"center",
    alignItems:'center',
    borderWidth:2,
    borderRadius:10,
    backgroundColor:'red',
    margin:10


  }

});
