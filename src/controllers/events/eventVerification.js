module.exports.eventVerification = (req, res) => {
    const payload = req.body
    const {
        token,
        challenge,
        type
    } = payload

    const data = {
        challenge
    }

    return res.json(data)
}