import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, FlatList,Switch } from 'react-native';
import Commoncard from '../../components/Commoncard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import { Dropdown } from 'react-native-element-dropdown';
import NoData from '../../components/NoData';
import { getFireBaseData } from '../../Services/firebaseQuery/firebaseQuery';
import moment from 'moment/moment';


const options = [
  { label: 'Vibration', value: 'vibration' },
  { label: 'EML', value: 'EML' }
];

const { width } = Dimensions.get('window');
const itemWidth = (width / 3) * 2;
const gap = (width - itemWidth) / 4;

const AlertScreen = () => {
  const [selectedType, setSelectedtype] = useState('vibration')
  const [AlertData, setAlertData] = useState([])
  const [isBlinking, setIsBlinking] = useState(false);
  const [switchVal,setSwitchVal]=useState(false)
  const toggleBlinking = () => {
    setIsBlinking(prevState => !prevState);
  };
  useEffect(() => {
    async function fetchAlertsData() {
      let options = {
        collection: `collectionName`,
        conditions: [
          {
            key: 'timestamp',
            symbol: '>=',
            value: moment().startOf('day').toDate(),
          },
          {
            key: 'timestamp',
            symbol: '<=',
            value: moment().endOf('day').toDate(),
          },
          {
            key: 'module',
            symbol: '==',
            value: selectedType
          }
        ],
      }
      let alertsData = await getFireBaseData(options)
      console.log(alertsData.data);
      if (alertsData.status == "success" && alertsData.data.length) {

        setAlertData(alertsData.data) // assuming this should update the state
      } else {
        setAlertData([]) // assuming this should update the state
      }
    }
    fetchAlertsData();
  }, [selectedType]);

  useEffect(() => {
    const intervalId = setInterval(toggleBlinking, 500);
    return () => clearInterval(intervalId);
  }, []);
  const data = [
    { name: "vishnoo", key: 1 },
    { name: "vishnoo", key: 2 }, { name: "vishnoo", key: 3 }, { name: "vishnoo", key: 4 }, { name: "vishnoo", key: 5 },
  ]
  return (
    <>
      <View style={styles.container}>
        <Header />
        <DropdownComponent onChange={(item) => setSelectedtype(item.value)} value={selectedType} />
        {AlertData.length ?
          <FlatList
            keyExtractor={(item) => item.id}
            data={AlertData}
            horizontal
            renderItem={({ item }) => (
              <View style={styles.cardContainer}>
                <View style={{flexDirection:'row'}}>
                <Ionicons name='alert-circle' size={24} color={item.alertType=="Critical" ?"#ff3030":"#f79225"} />
                  <Text style={[styles.textStyle, isBlinking && styles.blink,item.alertType=="Critical" ?{color:"#ff3030"}:{color:"#f79225"}]}> {item.alertType}</Text>
                <Text style={{left:120,fontSize:16}}>{moment(item.timestamp.seconds*1000).format("DD-MM-YYYY HH:mm:ss ")}</Text>
                </View>
                <Text style={styles.description
                }>{item.description}</Text>
                <View style={{flexDirection:'row',marginTop:25}}>
                  <Text style={[styles.textStyle,{marginTop:10}]}>Acknowledge</Text>
                <Switch 
                trackColor={{false:"gray",true:"#2a7cf6"}}
                thumbColor={switchVal ? "#fff":"#f4f3f4"}
                onValueChange={()=>setSwitchVal((prev)=>!prev)}
                value={switchVal}
                style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }],paddingLeft:10 }}
                />
                </View>
              </View>
            )}
          />
          : <NoData />}
      </View>
    </>
  );
};

const DropdownComponent = ({ onChange, value }) => {
  return (
    <Dropdown
      style={styles.dropdown}
      selectedTextStyle={styles.selectedTextStyle}
      iconStyle={styles.iconStyle}
      data={options}
      maxHeight={300}
      labelField="label"
      valueField="value"
      value={value}
      onChange={onChange}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdown: {
    margin: 16,
    height: 50,
    width: "25%",
    borderBottomColor: '#2a7cf6',
    borderBottomWidth: 2
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  cardContainer: {
    position: "relative",
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 400,
    height: "40%",
    margin: 20,
    marginTop:50,
    backgroundColor:"#dfdfe0"
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  blink: {
    opacity: 0.7,
  },
  description:{
    fontSize:18,
    fontFamily:"monospace",
    marginTop:25
  }

});


export default AlertScreen;


{/* <ScrollView  vertical={true} horizontal={true} style={styles.scrollView}>
          <View style={styles.container}>
            {renderHeader()}
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
            />
          </View>
        </ScrollView> */}
// const data = [
//   { id: 1, Timestamp: '28-02-2023', Asset: "LM704", AlertType: 'Warning', Description: "text", Ackonwledge: "", Comment: "" },
//   { id: 2, Timestamp: '28-02-2023', Asset: "LM704", AlertType: 'Warning', Description: "text", Ackonwledge: "", Comment: "" },
//   { id: 3, Timestamp: '28-02-2023', Asset: "LM704", AlertType: 'Warning', Description: "text", Ackonwledge: "", Comment: "" },
//   { id: 4, Timestamp: '28-02-2023', Asset: "LM704", AlertType: 'Warning', Description: "text", Ackonwledge: "", Comment: "" },
//   { id: 5, Timestamp: '28-02-2023', Asset: "LM704", AlertType: 'Warning', Description: "text", Ackonwledge: "", Comment: "" },
//   { id: 6, Timestamp: '28-02-2023', Asset: "LM704", AlertType: 'Warning', Description: "text", Ackonwledge: "", Comment: "" },
//   { id: 7, Timestamp: '28-02-2023', Asset: "LM704", AlertType: 'Warning', Description: "text", Ackonwledge: "", Comment: "" },
//   { id: 1, Timestamp: '28-02-2023', Asset: "LM704", AlertType: 'Warning', Description: "text", Ackonwledge: "", Comment: "" },
//   { id: 2, Timestamp: '28-02-2023', Asset: "LM704", AlertType: 'Warning', Description: "text", Ackonwledge: "", Comment: "" },
//   { id: 3, Timestamp: '28-02-2023', Asset: "LM704", AlertType: 'Warning', Description: "text", Ackonwledge: "", Comment: "" },
//   { id: 4, Timestamp: '28-02-2023', Asset: "LM704", AlertType: 'Warning', Description: "text", Ackonwledge: "", Comment: "" },
//   { id: 5, Timestamp: '28-02-2023', Asset: "LM704", AlertType: 'Warning', Description: "text", Ackonwledge: "", Comment: "" },
//   { id: 6, Timestamp: '28-02-2023', Asset: "LM704", AlertType: 'Warning', Description: "text", Ackonwledge: "", Comment: "" },
//   { id: 7, Timestamp: '28-02-2023', Asset: "LM704", AlertType: 'Warning', Description: "text", Ackonwledge: "", Comment: "" },
//   { id: 1, Timestamp: '28-02-2023', Asset: "LM704", AlertType: 'Warning', Description: "text", Ackonwledge: "", Comment: "" },
//   { id: 2, Timestamp: '28-02-2023', Asset: "LM704", AlertType: 'Warning', Description: "text", Ackonwledge: "", Comment: "" },
//   { id: 3, Timestamp: '28-02-2023', Asset: "LM704", AlertType: 'Warning', Description: "text", Ackonwledge: "", Comment: "" },
//   { id: 4, Timestamp: '28-02-2023', Asset: "LM704", AlertType: 'Warning', Description: "text", Ackonwledge: "", Comment: "" },
//   { id: 5, Timestamp: '28-02-2023', Asset: "LM704", AlertType: 'Warning', Description: "text", Ackonwledge: "", Comment: "" },
//   { id: 6, Timestamp: '28-02-2023', Asset: "LM704", AlertType: 'Warning', Description: "text", Ackonwledge: "", Comment: "" },
//   { id: 7, Timestamp: '28-02-2023', Asset: "LM704", AlertType: 'Warning', Description: "text", Ackonwledge: "", Comment: "" },{ id: 1, Timestamp: '28-02-2023', Asset: "LM704", AlertType: 'Warning', Description: "text", Ackonwledge: "", Comment: "" },
//   { id: 2, Timestamp: '28-02-2023', Asset: "LM704", AlertType: 'Warning', Description: "text", Ackonwledge: "", Comment: "" },
//   { id: 3, Timestamp: '28-02-2023', Asset: "LM704", AlertType: 'Warning', Description: "text", Ackonwledge: "", Comment: "" },
//   { id: 4, Timestamp: '28-02-2023', Asset: "LM704", AlertType: 'Warning', Description: "text", Ackonwledge: "", Comment: "" },
//   { id: 5, Timestamp: '28-02-2023', Asset: "LM704", AlertType: 'Warning', Description: "text", Ackonwledge: "", Comment: "" },
//   { id: 6, Timestamp: '28-02-2023', Asset: "LM704", AlertType: 'Warning', Description: "text", Ackonwledge: "", Comment: "" },
//   { id: 7, Timestamp: '28-02-2023', Asset: "LM704", AlertType: 'Warning', Description: "text", Ackonwledge: "", Comment: "" },
// ];



