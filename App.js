import { View, Text, StyleSheet, SafeAreaView, Pressable, TextInput, FlatList, ActivityIndicator } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useEffect, useState } from 'react'

import ShoppingItem from './components/ShoppingItem';
import { addDoc, collection, db, getDocs, deleteDoc, doc } from './firebase/index';

export default function App() {
  const [title, setTitle] = useState("")
  const [shoppingList, setShoppingList] = useState([])

  const addShoppingItem = async () => {
    try {
      setTitle("");

      const docRef = await addDoc(collection(db, "shopping"), {
        title: title,
        isChecked: false,
      })

      getShoppingList()

      console.log("Document writter with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document", e);

    }
  }

  const getShoppingList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "shopping"))

      setShoppingList(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      )
    } catch (e) {
      console.error("Error get documents", e);
    }
  }

  const deleteShoppingList = async () => {
    const querySnapshot = await getDocs(collection(db, "shopping"))

    querySnapshot.docs.map((item) => deleteDoc(doc(db, "shopping", item.id)));

    getShoppingList();
  }

  useEffect(() => {
    getShoppingList();
  }, [])


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Shopping List</Text>

        <Text style={styles.noOfItem}>{shoppingList.length}</Text>

        <Pressable onPress={deleteShoppingList}>
          <AntDesign name='delete' size={30} color='black' />
        </Pressable>
      </View>


      {
        shoppingList.length > 0 ?
          <FlatList
            data={shoppingList}
            renderItem={({ item }) => <ShoppingItem
              title={item.title}
              isChecked={item.isChecked}
              id={item.id}
              getShoppingList={getShoppingList}
            />}
            keyExtractor={item => item.id}
          />
          : <ActivityIndicator />
      }

      <TextInput
        placeholder='Enter shopping items'
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
        onSubmitEditing={addShoppingItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginVertical: 40,
  },
  header: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  heading: {
    fontSize: 30,
    fontWeight: "500",
    flex: 1,
  },
  noOfItem: {
    fontSize: 30,
    fontWeight: "500",
    marginRight: 20,
  },
  input: {
    backgroundColor: "lightgrey",
    padding: 10,
    fontSize: 17,
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: "auto",
  }
});