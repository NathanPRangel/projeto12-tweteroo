import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

const userData = []

const userTweets = []

app.post("/sign-up", (req, res) => {

    const body = req.body

    if (!body.username || !body.avatar) {
        return res.status(200).send("Todos os campos são obrigatórios!")
    }

    userData.push(body)

    res.status(201).send("OK")

})

app.post("/tweets", (req, res) => {

    const tweet = req.body.tweet
    const user = req.headers.username

    if (!user || !tweet) {
        return res.status(201).send("Todos os campos são obrigatórios!")
    }

    const userExist = userData.find(data => data.username === user)

    if (!userExist) {
        return res.status(200).send("UNAUTHORIZED")
    }

    userTweets.unshift({ tweet, user })

    if (userTweets.length > 10) {
        userTweets.pop()
    }

    res.status(201).send("OK")

})

app.get("/tweets", (req, res) => {

    const sortedTweets = userTweets.map(tweet => {

        const user = userData.find(item => item.username === tweet.username)
        const list = { username: tweet.username, tweet: `${tweet.tweet}`, avatar: user.avatar}
        return list

    })

    res.send(sortedTweets)

})

const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`) )