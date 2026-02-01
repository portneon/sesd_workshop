import { Schema, Document, model } from "mongoose"

export interface ToDoInterface extends Document {
    title: string;
    description?: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export const todomodel = model<ToDoInterface>("task", schema)




