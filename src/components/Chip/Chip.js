import React from "react";
import { TouchableOpacity, Text } from "react-native";
import style from "./style";

const Chip = ({
    title,
    last,
    active,
    backgroundColor = '#4040FF66',
    activeBackgroundColor = '#4040FF',
    onPress
}) => (
    <TouchableOpacity style={[style.button, {
        backgroundColor: active ? activeBackgroundColor : backgroundColor,
        marginRight: last ? 24 : 8,
    }]}
        onPress={onPress}
    >
        <Text style={style.text}>
            {title}
        </Text>
    </TouchableOpacity>
);

export default Chip;