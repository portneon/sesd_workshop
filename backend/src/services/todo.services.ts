import { todomodel, ToDoInterface } from "../todo.schema";

class ToDoServices {
    async createTask(title: string, description?: string): Promise<ToDoInterface> {
        const task = await todomodel.create({ title, description });
        return task;
    }

    async getTask(id: string): Promise<ToDoInterface | null> {
        const task = await todomodel.findById(id);
        return task;
    }

    async getAllTasks(): Promise<ToDoInterface[]> {
        const tasks = await todomodel.find({}).sort({ createdAt: -1 });
        return tasks;
    }

    async updateTask(id: string, data: Partial<ToDoInterface>): Promise<ToDoInterface | null> {
        const task = await todomodel.findByIdAndUpdate(
            id,
            data,
            { new: true, runValidators: true }
        );
        return task;
    }

    async deleteTask(id: string): Promise<ToDoInterface | null> {
        const task = await todomodel.findByIdAndDelete(id);
        return task;
    }
}

export { ToDoServices }


