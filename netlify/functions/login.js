exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const body = JSON.parse(event.body)

    if (!body.username || !body.password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Fields missing" })
      }
    }

    if (body.username === "frontend@smartness.com" && body.password === "Password!") {
      return {
        statusCode: 200,
        body: JSON.stringify({
          token: "8ddde26b-543f-4f32-988f-1cc631a02650"
        })
      }
    }

    return {
      statusCode: 401,
      body: JSON.stringify({
        error: "invalid credentials"
      })
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    }
  }
}
