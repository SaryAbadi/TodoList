import { AppDataSource } from './app';
import { Task } from './entity/entityTask';

export const resolvers = {
  Query: {
    tasks: async () => {
      const tasksRepository = AppDataSource.getRepository(Task);
      const tasks = await tasksRepository.find();
      return tasks;
    },
  },
  Mutation: {
    addTask: async (_: any, { name }: { name: string }) => {
      const tasksRepository = AppDataSource.getRepository(Task);
      const task = tasksRepository.create({ name, iscompleted: false });
      const newTask = await AppDataSource.getRepository(Task).save(task);
      return newTask;
    },
    deleteTask: async (_: any, { id }: { id: number }) => {
      const tasksRepository = AppDataSource.getRepository(Task);
      const deleteResult = await tasksRepository.findOne({ where: { id } });
      if (!deleteResult) {
        return false;
      }
      await tasksRepository.delete(id);
      return true;
    },
    toggleTask: async (_: any, { id }: { id: number }) => {
      const tasksRepository = AppDataSource.getRepository(Task);
      const task = await tasksRepository.findOne({ where: { id } });
      if (!task) {
        throw new Error('Task not found');
      }
      task.iscompleted = !task.iscompleted;
      await tasksRepository.save(task);
      return task;
    },
  },
};
