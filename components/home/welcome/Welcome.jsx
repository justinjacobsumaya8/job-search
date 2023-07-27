import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { useRouter } from "expo-router";

import styles from './welcome.style';
import { icons, SIZES } from "../../../constants";

const JOB_TYPES = ["Full-time", "Part-time", "Contractor"];

const Welcome = () => {
    const router = useRouter();
    const [activeJobType, setActiveJobType] = useState("Full-time");
    const [searchTerm, setSearchTerm] = useState("");

    const onClickSearch = () => {
        console.log("searchTerm", searchTerm)
        if (searchTerm) {
            router.push(`/search/${searchTerm}`);
        }
    };

    const onPressJobType = (item) => {
        setActiveJobType(item);
        router.push(`/search/${item}`);
    };

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.userName}>Hello Justin</Text>
                <Text style={styles.welcomeMessage}>Find your perfect job</Text>
            </View>
            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                        placeholder="What are you looking for?"
                    />
                </View>
                <TouchableOpacity
                    style={styles.searchBtn}
                    onPress={onClickSearch}
                >
                    <Image
                        source={icons.search}
                        resizeMode="contain"
                        style={styles.searchBtnImage}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.tabsContainer}>
                <FlatList
                    data={JOB_TYPES}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.tab(activeJobType, item)}
                            onPress={() => onPressJobType(item)}
                        >
                            <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item}
                    contentContainerStyle={{ columnGap: SIZES.small }}
                    horizontal
                />
            </View>
        </View>
    );
};

export default Welcome