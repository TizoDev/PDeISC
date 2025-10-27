import { Platform, StyleSheet } from 'react-native';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { serverurl } from '@/gameLogic/urls'

export default function ScoreList({filter}:{filter: string}) 
{
    const [scores, setScores] = useState<any[]>([]);
    let n = 0;

    useEffect(() => {
        fetch(serverurl + 'highscores')
            .then(response => response.json())
            .then(data => setScores(data));
    }, [])
    return (
        <View>
            <Text>Best Scores</Text>
            {scores.map((score, index) => {
                if(filter == '')
                {
                    n++;
                    return(
                        <Text key={index}>{index+1} - {score.nombre}, {score.score}</Text>
                    );
                }
                else if(score.email == filter)
                {
                    n++;
                    return(
                        <Text key={index}>{index+1} - {score.nombre}, {score.score}</Text>
                    );
                }
            })}
            {n == 0 ? <Text>No hay puntuaciones registradas</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({

});
