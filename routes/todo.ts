import { Request, Response, Router } from "express";
import { Todo } from "../models/todo"

const router = Router()

/**
 *  
 */
router.post('/', async (req: Request, res: Response) => {

    try {

        const { title } = req.body

        const todo = Todo.build({ title })

        await todo.save()

        return res.status(201).json(todo)


    } catch {
        return res.status(500).json({ error: "server internal error" })

    }
})

/**
 * 
 */
router.get('/', async (req: Request, res: Response) => {


    try {
        const todos = await Todo.find()

        return res.status(200).json(todos)
    } catch {
        return res.status(500).json({ error: "server internal error" })
    }
})

/**
 * 
 */
router.delete('/:id', async (req: Request, res: Response) => {

    const { id } = req.params;

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
        return res.status(500).json({ error: `No todo with id ${id}` })
    }

    res.status(200).send({ message: 'Deleted successfully', id });
});




router.patch('/:id', async (req: Request, res: Response) => {

    const attribute = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
    if (!attribute) {
        return res.status(500).json({ error: `No todo with id` })
    }
  
    res.status(200).send(attribute);
  });


export { router as todoRouter }

