const tasks = [
    {
        id: 1,
        description: 'task 1',
        done: false,
    },
    {
        id: 2,
        description: 'task 2',
        done: false,
    },
    {
        id: 3,
        description: 'task 3',
        done: false,
    }
];
let id = 4;

const getAllTasks = (req, res) => {
    const { description } = req.query;
    if (description) {
      const filteredTasks = tasks.filter((task) =>
        task.description.includes(description)
      );
      res.json(filteredTasks);
      return;
    }

    
    res.json(tasks);
    //return; if no return, return undefined 
}


const getTaskById = (req, res) => {
    const id = Number(req.params.id);
    // const taskById = tasks.filter((task) => {
    //     return task.id === id
    // });
    // if (taskById.length == 0) {
    //     res.status(202).send({
    //         msg: `Sorry, there is no task for id:${id}`
    //     })
    // } else {
    //     res.send(taskById[0]);
    // }
    //find如果没找到，返回undefined
    const task = tasks.find((task) => task.id === id);
    if (!task) {
        res.status(404).json({//400是格式不对，404是找不到
            statusCode: 404,
            error: 'Not found',
            msg: `Sorry, there is no task for id:${id}`
        })
        return;//不写else是为了fail fast，逻辑更直观,减少嵌套
    }
    res.json(task);

}


const updateTaskById = (req, res) => {
    const id = Number(req.params.id);
    // const taskById = tasks.filter((task) => {
    //     return task.id === id
    // });
    //     if (taskById.length == 0) {
    //     res.status(202).send({
    //         msg: `Sorry, there is no task for id:${id}`
    //     })
    // } else {
    //     taskById[0].done = true;
    //     res.status(201).send({
    //         msg: `Successfully updated for id:${id}`,
    //         updated: `id:${id} is done.`,
    //         tasks: tasks
    //     });
    // }
    const task = tasks.find((task) => task.id === id);
    if (!task) {
        res.status(404).json({
            msg: `Sorry, there is no task for id:${id}`
        })
        return;//不写else是为了fail fast，逻辑更直观,减少嵌套
    }
    const { description, done } = req.body;
    if (description !== undefined) {
        //type check
        if (typeof (description) !== 'string') {
            res.status(400).json({
                statusCode: 400,
                msg: `Sorry, invalid input type`
            })
            return;
        }
        task.description = description;
    }
    if (done !== undefined) {
        //type check, boolean
        task.done = done;
    }
    res.json(task);

}


const createTask = (req, res) => {
    //不从body取整个task，ID 由后端生成确保唯一性，done默认为false，创建一个新任务默认是没完成
    // const newTask = req.body;
    // const id = req.body.id;
    const { description } = req.body;
    //data validation
    if (description === undefined) {
        res.status(404).json({
            statusCode: 404,
            msg: `Sorry, invalid input type`
        })
        return;
    }

    //never use data from the client DIRECTLY
    const newTask = {
        id: id++,//后端生成id，避免重复，而不是前端给
        description: description,
        done: false,//默认
    }
    tasks.push(newTask);
    res.status(201).json(newTask);//201是创建成功，默认是200

    // const index = tasks.findIndex((task) => {
    //     return task.id === id
    // });
    // if (index == -1) {
    //     tasks.push(newTask);
    //     res.status(201).send({
    //         msg: "Successfully posted",
    //         posted: newTask,
    //         tasks: tasks
    //     });
    // } else {
    //     res.status(202).send({
    //         msg: `Sorry, there is already a task for id:${id}`
    //     })
    // }
}

const deleteTaskById = (req, res) => {
    const id = Number(req.params.id);
    const index = tasks.findIndex((task) => {
        return task.id === id
    });
    if (index === -1) {
        res.status(404).json({
            msg: `Sorry, there is no task.`
        })
        return;
    }
    tasks.splice(index, 1);
    res.sendStatus(204);
    // const [deletedTask] = tasks.splice(index, 1);
    // res.json(deletedTask);
}


module.exports = {
    getAllTasks,
    getTaskById,
    updateTaskById,
    createTask,
    deleteTaskById
}