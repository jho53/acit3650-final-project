import { StyleSheet } from "react-native";

const DEFAULT_FONTFAMILY = "sans-serif-light"

const PRIMARY_COLOUR = "#33616d"
const SECONDARY_COLOUR = "#39336d"
const TERTIARY_COLOUR = "#336d3e"

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
    },
    headerStyle: {
        height: "12.5%",
        width: "100%",
        backgroundColor: "#91C0CC",
        opacity: 0.85,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16
    },
    headerFont: {
        fontFamily: DEFAULT_FONTFAMILY,
        color: "white",
        fontSize: 32,
        top: 14
    },
    /**---------LoggedIn Main Page---------*/
    courseContainer: {
        width: "100%",
        height: "87.5%",
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        padding: 5
    },
    courseTab: {
        width: "97.5%",
        height: 50,
        flexDirection: "row",
        backgroundColor: "white",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 7.5,
        margin: 5,
        padding: 7.5
    },
    courseName: {
        fontFamily: DEFAULT_FONTFAMILY,
        fontSize: 14
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: "45%",
    },
    modalView: {
        top: "100%",
        margin: 45,
        backgroundColor: "rgba(235,235,235,0.85)",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20
    },
    courseTextInput: {
        backgroundColor: "white"
    }
})