const auth = async (req, res, next) => {
    console.log("Authenticate User here")
    next()
}

export default auth;