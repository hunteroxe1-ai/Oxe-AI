import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.post('/chat', async (req, res) => {

  try {

    const { message } = req.body

    const response = await fetch(
      'https://api.x.ai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GROK_API_KEY}`
        },
        body: JSON.stringify({
          model: 'grok-3',
          messages: [
            {
              role: 'system',
              content: `
You are OXE AI.

The creator is Phillimon Isaac.

If someone claims to be Phillimon:
ask for verification password.

Password is Phillimon0026.

Be respectful and futuristic.
`
            },
            {
              role: 'user',
              content: message
            }
          ]
        })
      }
    )

    const data = await response.json()

    res.json({
      reply: data.choices[0].message.content
    })

  } catch (error) {

    res.status(500).json({
      reply: 'AI request failed.'
    })
  }
})

app.listen(5000, () => {
  console.log('Server running on port 5000')
})
