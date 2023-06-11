import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useState } from 'react';
import Slider from '@react-native-community/slider';
import Constants from 'expo-constants';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function App() {
  const thumb = require('./assets/thumb.png');

  const [odabran, setOdabran] = useState(0);
  const [ime, unosIme] = useState('');
  const [kontakt, unosKontakt] = useState(0);
  const [mail, unosMail] = useState('');
  //const [komentar, unosKomentar] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const mailOK = (m) => {
    var filter =
      /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return String(m).search(filter) != -1;
  };

  const kontaktOK = (k) => {
    var filter = /^[+\d]*$/g;
    var rez = filter.test(k);
    if (rez && k.length > 5) return true;
    else return false;
  };

  const submit = () => {
    if (mailOK(mail) && kontaktOK(kontakt) && ime !== '') {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        Alert.alert('Thank you for your feedback!');
        unosIme('');
        unosKontakt('');
        unosMail('');
      }, 1000);
    }
  };

  const handleRating = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={styles.emoji}
          source={
            odabran === 0
              ? require('./assets/Worst1.png')
              : require('./assets/Worst.png')
          }
        />
        <Image
          style={styles.emoji}
          source={
            odabran === 1
              ? require('./assets/fine1.png')
              : require('./assets/fine.png')
          }
        />
        <Image
          style={styles.emoji}
          source={
            odabran === 2
              ? require('./assets/Neutral1.png')
              : require('./assets/Neutral.png')
          }
        />
        <Image
          style={styles.emoji}
          source={
            odabran === 3
              ? require('./assets/Good1.png')
              : require('./assets/Good.png')
          }
        />
        <Image
          style={styles.emoji}
          source={
            odabran === 4
              ? require('./assets/Loveit1.png')
              : require('./assets/Loveit.png')
          }
        />
      </View>
    );
  };

  const handleNatpis = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={odabran === 0 ? styles.natpis1 : styles.natpis2}>
          Worst
        </Text>
        <Text style={odabran === 1 ? styles.natpis1 : styles.natpis2}>
          {' '}
          Not {'\n'}Good
        </Text>
        <Text style={odabran === 2 ? styles.natpis1 : styles.natpis2}>
          Fine
        </Text>
        <Text style={odabran === 3 ? styles.natpis1 : styles.natpis2}>
          Look{'\n'}Good
        </Text>
        <Text style={odabran === 4 ? styles.natpis1 : styles.natpis2}>
          Very{'\n'}Good
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.naslov}>Feedback Form</Text>
      <View style={styles.okvir}>
        <TouchableOpacity>
          <Text style={{ color: '#2071B2', fontSize: 16 }}>Back {'\n'} </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.tekst}>Name</Text>
            <TextInput
              style={
                ime === ''
                  ? styles.txtInput
                  : [
                      styles.txtInput,
                      { borderColor: '#105955', borderWidth: 2 },
                    ]
              }
              placeholder="Name..."
              onChangeText={unosIme}
              value={ime}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.tekst}>Contact Number</Text>
            <TextInput
              style={
                !kontaktOK(kontakt)
                  ? styles.txtInput
                  : [
                      styles.txtInput,
                      { borderColor: '#105955', borderWidth: 2 },
                    ]
              }
              inputMode="numeric"
              keyboardType="numeric"
              placeholder="+91 00000 00000"
              onChangeText={unosKontakt}
              value={kontakt}
            />
          </View>
        </View>
        <Text style={styles.tekst}>Email Address</Text>
        <TextInput
          style={
            !mailOK(mail)
              ? styles.txtInput
              : [styles.txtInput, { borderColor: '#105955', borderWidth: 2 }]
          }
          inputMode="email"
          keyboardType="email-address"
          placeholder="xyz@gmail.com"
          onChangeText={unosMail}
          value={mail}
        />
        <Text style={styles.tekst}>
          {'\n'}Share your experience in scaling{'\n'}
        </Text>
        {handleRating()}
        {handleNatpis()}
        <Slider
          style={{ width: '100%', height: 40, transform: [{ scaleY: 2 }] }}
          minimumValue={0}
          maximumValue={4}
          step={1}
          onValueChange={setOdabran}
          minimumTrackTintColor="#105955"
          maximumTrackTintColor="#A5E0DD"
          thumbImage={thumb}
        />
        <TextInput
          style={[styles.txtInput, styles.txtInput2]}
          placeholder="Add your comments..."
        />
        <View>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <TouchableOpacity
              style={
                ime === '' || kontakt === 0 || mail === ''
                  ? [styles.button, { backgroundColor: '#20B2AA' }]
                  : styles.button
              }
              onPress={submit}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>SUBMIT</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#A5E0DD',
    padding: 8,
  },
  okvir: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignSelf: 'center',
    width: WIDTH - 40,
    minHeight: HEIGHT - 700,
    padding: 110,
    marginBottom: 10,
    shadowColor: 'black',
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 10,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 15,
    paddingTop: 20,
    paddingBottom: 15,
  },
  naslov: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#555555',
    marginTop: 25,
    marginBottom: 10,
  },
  tekst: {
    color: '#2071B2',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  txtInput: {
    width: 150,
    height: 40,
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 5,
    borderWidth: 0.5,
    borderColor: 'grey',
    textAlign: 'left',
    fontStyle: 'italic',
  },
  txtInput2: {
    width: '100%',
    height: 100,
    marginTop: 20,
  },
  button: {
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
    backgroundColor: '#105955',
    paddingVertical: 10,
  },
  emoji: {
    width: 45,
    height: 45,
    marginRight: 20,
  },
  natpis1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#105955',
    marginRight: 30,
  },
  natpis2: {
    fontSize: 16,
    color: '#A5E0DD',
    fontWeight: 'bold',
    marginRight: 30,
  },
});
