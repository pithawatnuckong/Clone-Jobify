const createJob = (req, res) => {
   res.status(200).send("createJob")
}

const getAllJobs = (req, res) => {
    res.status(200).send("getAllJobs")
}

const showStats = (req, res) => {
    res.status(200).send("showStats")
}

const deleteJob = (req, res) => {
    res.status(200).send(`Delete job ${req.params.id}`)
}

const updateJob = (req, res) => {
    res.status(200).send(`Update job ${req.params.id}`)
}

export {createJob, getAllJobs, showStats, deleteJob, updateJob}