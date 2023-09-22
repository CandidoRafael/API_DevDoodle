const soma = (req, res) => {

    const somar = 1 + 234

    res.send({ somar })
}

module.exports = { soma }