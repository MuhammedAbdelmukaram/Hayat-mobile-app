import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Countdown = ({ deadline }) => {
    const calculateTimeLeft = () => {
        const difference = new Date(deadline) - new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timerTimeout = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timerTimeout);
    }, [timeLeft]);

    const formatTime = (time) => {
        // Format time to always have two digits
        return time < 10 ? `0${time}` : time;
    };

    return (
        <View style={styles.container}>
            {timeLeft.hours || timeLeft.minutes || timeLeft.seconds ? (
                <Text style={styles.timerText}>
                    {`${formatTime(timeLeft.hours)}:${formatTime(timeLeft.minutes)}:${formatTime(timeLeft.seconds)}`}
                </Text>
            ) : (
                <Text style={styles.timerText}>Time's up!</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // Flex is removed to not take the full screen

    },
    timerText: {
        fontSize: 14,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default Countdown;
