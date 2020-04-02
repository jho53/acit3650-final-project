import { StyleSheet } from "react-native";

const DEFAULT_FONTFAMILY = "sans-serif-light"

export default StyleSheet.create({
    /**---------Global Style-----------*/
    globalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        resizeMode: "contain"
    },
    /**---------Login Signup Screens Style-----------*/
    bigTitle: {
        fontSize: 36,
        color: "white",
        marginVertical: 48,
        fontFamily: DEFAULT_FONTFAMILY
    },
    errorMessage: {
        padding: 15,
        borderRadius: 10,
        maxWidth: '75%',
        marginTop: 8,
        backgroundColor: "rgb(255,200,200)",
        opacity: 0.95,
        fontFamily: DEFAULT_FONTFAMILY,
        flexDirection: "row",
    },
    textInput: {
        height: 45,
        padding: 10,
        borderRadius: 10,
        width: '75%',
        borderColor: 'gray',
        borderWidth: 1.25,
        marginTop: 8,
        backgroundColor: "aliceblue",
        opacity: 0.75,
        fontFamily: DEFAULT_FONTFAMILY
    },
    textButton: {
        fontSize: 20,
        color: "aliceblue",
        fontFamily: DEFAULT_FONTFAMILY,
        textDecorationLine: 'underline'
    }
})