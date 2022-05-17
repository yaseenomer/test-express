import mongoose from "mongoose"


interface TodoAttrs {
    title: string
    done?: boolean
}


interface TodoDoc extends mongoose.Document {
    title: string
    done?: boolean
}

interface TodoModel extends mongoose.Model<TodoDoc> {
    build(todo: TodoAttrs): TodoDoc;
}

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    done: {
        type: Boolean,
        default: false
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    },
    timestamps: true
});

todoSchema.statics.build = (todo: TodoAttrs) => {
    return new Todo(todo);
}

export const Todo = mongoose.model<TodoDoc, TodoModel>("Todos", todoSchema);
