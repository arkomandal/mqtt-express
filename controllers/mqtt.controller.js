exports.send = (req, res) => {
    try {
        global.eventEmitter.emit(`on_send`, {
            message: req.body.message
        });
        res.status(200).json({
            message: "sent"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error",
            error: error
        });
    }
}