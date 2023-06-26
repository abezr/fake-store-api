module.exports.indexPage = (req,res) => {
    res.render('shared/header')
}

module.exports.docsPage = (req,res) => {
    res.render('home/docs')
}