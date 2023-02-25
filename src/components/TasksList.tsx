import React from 'react';
import { FlatList } from 'react-native';

import { TaskItem } from './TaskItem';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export interface TaskFunctionProps {
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  handleEditTask: (id: number, editedTitle: string) => void;
}

interface TasksListProps extends TaskFunctionProps{
  tasks: Task[];
}

export function TasksList({ tasks, toggleTaskDone, removeTask, handleEditTask }: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <TaskItem task={item} index={index} toggleTaskDone={toggleTaskDone} removeTask={removeTask} handleEditTask={handleEditTask}/>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}

