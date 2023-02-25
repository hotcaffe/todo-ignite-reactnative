import React, { useEffect, useRef, useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { ItemWrapper } from "./ItemWrapper";
import { Task, TaskFunctionProps } from "./TasksList";

import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/icons/edit/Edit.png";
import closeIcon from "../assets/icons/close/X.png";

interface TaskItemInterface extends TaskFunctionProps {
    task: Task;
    index: number;
}

export function TaskItem({
    task,
    index,
    toggleTaskDone,
    removeTask,
    handleEditTask,
}: TaskItemInterface) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);

    const textInputRef = useRef<TextInput>(null);

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [isEditing]);

    function handleTaskEditing() {
        setIsEditing(!isEditing);

        if (!isEditing) {
            setEditedTitle(task.title);
        }
    }

    function handleSubmitEditing() {
        handleEditTask(task.id, editedTitle);

        setIsEditing(false);
    }

    return (
        <ItemWrapper index={index}>
            <View>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(task.id)}
                >
                    <View
                        testID={`marker-${index}`}
                        style={
                            task.done
                                ? styles.taskMarkerDone
                                : styles.taskMarker
                        }
                    >
                        {task.done && (
                            <Icon name="check" size={12} color="#FFF" />
                        )}
                    </View>

                    {isEditing ? (
                        <TextInput
                            ref={textInputRef}
                            style={styles.taskText}
                            returnKeyType="send"
                            onSubmitEditing={handleSubmitEditing}
                            onChangeText={setEditedTitle}
                        >
                            {editedTitle}
                        </TextInput>
                    ) : (
                        <Text
                            style={
                                task.done
                                    ? styles.taskTextDone
                                    : styles.taskText
                            }
                        >
                            {task.title}
                        </Text>
                    )}
                </TouchableOpacity>
            </View>

            <View style={styles.icons}>
                <TouchableOpacity
                    testID={`edit-${index}`}
                    onPress={() => handleTaskEditing()}
                >
                    {isEditing ? <Image source={closeIcon}/> : <Image source={editIcon} />}
                </TouchableOpacity>

                <TouchableOpacity
                    testID={`trash-${index}`}
                    style={{ paddingHorizontal: 24 }}
                    onPress={!isEditing ? () => removeTask(task.id) : () => {}}
                >
                    <Image source={trashIcon} />
                </TouchableOpacity>
            </View>
        </ItemWrapper>
    );
}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: "row",
        alignItems: "center",
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#B2B2B2",
        marginRight: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    taskText: {
        color: "#666",
        fontFamily: "Inter-Medium",
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: "#1DB863",
        marginRight: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    taskTextDone: {
        color: "#1DB863",
        textDecorationLine: "line-through",
        fontFamily: "Inter-Medium",
    },
    icons: {
        flexDirection: "row",
        alignItems: "center"
    },
});
