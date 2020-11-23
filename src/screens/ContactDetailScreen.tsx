
import React, { FunctionComponent, useState, useContext, useLayoutEffect } from 'react';
import { NavigationContext } from "@react-navigation/core";
// @Types
import { RouteProp } from '@react-navigation/native'
import { ContactNavigatorParams } from './ContactScreen';
// @Hooks
import useContactsContext from "../hooks/useContactsContext";
// @Components
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

type Props = {
  route: RouteProp<ContactNavigatorParams, 'ContactDetail'>;
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginTop: 30,
    paddingBottom: 30,
    justifyContent: "center",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#e9e8e8",
    width: "90%",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "500",
    color: "#d8d4d4",
  },
  info: {
    fontSize: 20,
    color: "black",
  },
});

const ContactDetailScreen: FunctionComponent<Props> = ({ route: { params: { item } } }) => {
  const navigation = useContext(NavigationContext);
  const { toggleFavorite } = useContactsContext();
  const [fallbackAvatar, setFallbackAvatar] = useState(false);
  const [isFavorite, setFavorite] = useState(item.isFavorite);
  const navigationSourceFavorite = isFavorite ? require("../assets/favorite/favorite-true.png") : require("../assets/favorite/favorite-false.png");
  const getFormattedBirthdate = (birthdate: string) => {
    const date = new Date(birthdate);

    return `${date.toLocaleString('default', { month: 'long' })} ${date.getDay()}, ${date.getFullYear()}`
  }

  useLayoutEffect(() => {
    navigation && navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => {
            toggleFavorite && toggleFavorite(item.id);
            setFavorite(!isFavorite);
          }}
        >
          <View>
            <Image
              source={navigationSourceFavorite}
              style={{ width: 20, height: 20 }}
            />
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation, isFavorite]);

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#e9e8e8",
            width: "90%",
            marginTop: 40,
            paddingBottom: 20,
          }}
        >
          {item.largeImageURL && !fallbackAvatar && (
            <Image
              source={{
                width: 200,
                height: 200,
                uri: item.largeImageURL,
              }}
              onError={() => setFallbackAvatar(true)}
            />
          )}
          {fallbackAvatar && (
            <Image
              style={{ width: 200, height: 200 }}
              source={require("../assets/user/user-large.png")}
            />
          )}
          {!!item.name && (
            <Text style={{ marginTop: 20, fontSize: 26 }}>
              {item.name}
            </Text>
          )}

          {!!item.companyName && (
            <Text
              style={{
                marginTop: 10,
                fontSize: 18,
                color: "#878787",
              }}
            >
              {item.companyName}
            </Text>
          )}
        </View>
        {!!item.phone.home && (
          <View style={styles.container}>
            <Text style={styles.label}>PHONE:</Text>
            <View style={styles.content}>
              <Text style={styles.info}>
                {item.phone.home}
              </Text>
              <Text style={styles.label}>Home</Text>
            </View>
          </View>
        )}
        {!!item.phone.mobile && (
          <View style={styles.container}>
            <Text style={styles.label}>PHONE:</Text>
            <View style={styles.content}>
              <Text style={styles.info}>
                {item.phone.mobile}
              </Text>
              <Text style={styles.label}>Mobile</Text>
            </View>
          </View>
        )}
        {!!item.phone.work && (
          <View style={styles.container}>
            <Text style={styles.label}>PHONE:</Text>
            <View style={styles.content}>
              <Text style={styles.info}>
                {item.phone.work}
              </Text>
              <Text style={styles.label}>Work</Text>
            </View>
          </View>
        )}
        {!!item.address && (
          <View style={styles.container}>
            <Text style={styles.label}>ADDRESS:</Text>
            <View style={styles.content}>
              <Text style={styles.info}>
                {item.address?.street}
              </Text>
            </View>
            <Text style={styles.info}>
              {item.address?.city}, {item.address?.state} {item.address?.zipCode}, {item.address?.country}
            </Text>
          </View>
        )}
        {!!item.birthdate && (
          <View style={styles.container}>
            <Text style={styles.label}>BIRTHDATE:</Text>
            <View style={styles.content}>
              <Text style={styles.info}>
                {getFormattedBirthdate(item.birthdate)}
              </Text>
            </View>
          </View>
        )}
        {!!item.emailAddress && (
          <View style={styles.container}>
            <Text style={styles.label}>EMAIL:</Text>
            <View style={styles.content}>
              <Text style={styles.info}>
                {item.emailAddress}
              </Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  )
};

export default ContactDetailScreen;