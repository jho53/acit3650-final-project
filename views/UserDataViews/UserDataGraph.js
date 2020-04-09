import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Dimensions, ImageBackground } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";

import styles from "../../stylesheet/styles"

import { StackedAreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";


export default class UserDataGraph extends Component {
    render() {
        const { navigation } = this.props;
        const course_data = navigation.getParam("course_data");
        const course_name = navigation.getParam("course_name");
        const tableHead = ['Item Name', 'Work Type', 'Weight', 'Percentage'];
        var work_list = [];
        const graph_label = ['Scores Available', 'Your Score'];
        if (typeof course_data['work'] !== "undefined") {
            work_list = Object.keys(course_data['work']);
            var temp_max_score = [];
            var temp_user_score = [];
            var temp_color = [];
            for (var i = 0; i < work_list.length; i++) {
                temp_max_score.push(parseFloat(course_data['work'][work_list[i]]['weight']));
                temp_user_score.push(
                    parseFloat(course_data['work'][work_list[i]]['weight']) *
                    parseFloat(course_data['work'][work_list[i]]['percentage']) / 100);
                var rgb = [];
                for (var k = 0; k < 3; k++)
                    rgb.push(Math.floor(Math.random() * 255));
                temp_color.push(rgb)
            }
            var graph_data = [temp_max_score, temp_user_score];
            var graph_legends = work_list;
            var graph_color = temp_color;
        } else {
            var graph_legends = [];
            var graph_data = [];
            var graph_color = []
        }
        const chartConfig = {
            backgroundGradientFrom: "#1E2923",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#08130D",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5
        };
        const screenWidth = Dimensions.get("window").width;
        const data = {
            labels: graph_label, // optional
            legend: graph_legends,
            data: graph_data,
            barColors: graph_color,
        };
        const graphStyle = {
            marginVertical: 8,
            ...chartConfig.style
        };
        return (
            <ImageBackground style={{ flex: 1, backgroundColor: '#fff' }} source={require("../../assets/main-background.jpg")}>
                <View style={styles.userDataHeaderStyle}>
                    <Text style={styles.headerFont}>{course_name} {course_data['term']}</Text>
                    <Text style={styles.headerFont}>{course_name} {course_data['term']}</Text>
                </View>

                <StackedBarChart
                    style={graphStyle}
                    data={data}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                />
                <Table style={styles.table}>
                    <Row data={tableHead} style={styles.head} textStyle={styles.text} />
                    <FlatList
                        data={work_list}
                        renderItem={({ item }) => (
                            <Row style={styles.row}
                                data={[
                                    item,
                                    course_data['work'][item]['type'],
                                    course_data['work'][item]['weight'],
                                    course_data['work'][item]['percentage']]}
                                textStyle={styles.text}
                            />
                        )}
                    />
                </Table>
            </ImageBackground>
        );
    }
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//         paddingTop: 30,
//         backgroundColor: '#fff'
//     },
//     head: {
//         height: 40,
//         backgroundColor: '#f1f8ff'
//     },
//     text: {
//         margin: 6
//     },
//     table:{
//         borderWidth: 2,
//         borderColor: 'black'
//     },
//     row: {
//         height: 40,
//         backgroundColor: '#E7E6E1'
//     }
// });
