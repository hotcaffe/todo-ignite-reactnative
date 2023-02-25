import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);

    function handleAddTask(newTaskTitle: string) {
        const titleAlreadyExists = tasks.find(
            (task) => task.title === newTaskTitle
        );

        if (titleAlreadyExists) {
            Alert.alert(
                "Task já cadastrada",
                "Você não pode cadastrar duas tarefas com o mesmo nome!"
            );
            return;
        }

        const task = {
            id: new Date().getTime(),
            title: newTaskTitle,
            done: false,
        };

        setTasks((oldTasks) => [...oldTasks, task]);
    }

    function handleToggleTaskDone(id: number) {
        const newAlteredTaskList = tasks.map((task) => {
            if (task.id === id) task.done = !task.done;
            return task;
        });

        setTasks(newAlteredTaskList);
    }

    function handleRemoveTask(id: number) {
        Alert.alert(
            "Remover item",
            "Tem certeza que deseja remover este item?",
            [
                {
                    text: "Sim",
                    onPress: () => {
                        const newTaskList = tasks.filter(
                            (task) => task.id != id
                        );
                        setTasks(newTaskList);
                        Alert.alert(
                            "Task removida!",
                            "A tarefa foi removida com sucesso!"
                        );
                    },
                },
                {
                    text: "Não",
                },
            ]
        );
    }

    function handleEditTask(id: number, newTitle: string) {
        const newAlteredTaskList = tasks.map((task) => {
            if (task.id === id) task.title = newTitle;
            return task;
        });

        setTasks(newAlteredTaskList);
    }

    return (
        <View style={styles.container}>
            <Header tasksCounter={tasks.length} />

            <TodoInput addTask={handleAddTask} />

            <TasksList
                tasks={tasks}
                toggleTaskDone={handleToggleTaskDone}
                removeTask={handleRemoveTask}
                handleEditTask={handleEditTask}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EBEBEB",
    },
});
