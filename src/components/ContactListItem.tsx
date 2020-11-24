import React, { FunctionComponent, useState } from "react";
// @Context
import { IContact } from "../AppContext";
// @Components
import { View, Text, Image } from "react-native";

type Props = {
    item: IContact
};

const ContactListItem: FunctionComponent<Props> = ({ item }) => {
    const [fallbackAvatar, setFallbackAvatar] = useState(false);

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 20,
                marginLeft: 10,
                marginRight: 10,
                paddingBottom: 20,
                borderBottomWidth: 1,
                borderBottomColor: "#e9e8e8",
            }}
        >
            {item.smallImageURL && !fallbackAvatar && (
                <Image
                    source={{
                        width: 100,
                        height: 100,
                        uri: item.smallImageURL,
                    }}
                    onError={() => setFallbackAvatar(true)}
                />
            )}
            {fallbackAvatar && (
                <Image
                    source={require('../assets/user/user-icon-small.png')}
                    style={{ width: 100, height: 100 }}
                />
            )}

            <View
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: 25,
                }}
            >
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    {item.isFavorite && (
                        <Image
                            source={require('../assets/favorite/favorite-true.png')}
                            style={{ width: 20, height: 20, marginRight: 5 }}
                        />
                    )}
                    <Text style={{
                        color: "black",
                        fontSize: 18,
                        fontWeight: "bold"
                    }}
                    >
                        {item.name}
                    </Text>
                </View>
                {!!item.companyName && (
                    <Text
                        style={{
                            fontSize: 14,
                            color: "#d8d4d4",
                        }}
                    >
                        {item.companyName}
                    </Text>
                )}
            </View>
        </View>
    );
};

export default ContactListItem;