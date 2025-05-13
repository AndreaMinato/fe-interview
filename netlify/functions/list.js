exports.handler = async function(event, context) {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  const { headers } = event

  if (!headers.authorization) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        error: "Missing token"
      })
    }
  }

  if (headers.authorization !== "Bearer 8ddde26b-543f-4f32-988f-1cc631a02650") {
    return {
      statusCode: 401,
      body: JSON.stringify({
        error: "Token invalid"
      })
    }
  }

  const data = Array.from({ length: 20 }, (_, idx) => {
    const kind = Math.random() < 0.3 ? 'bot' : 'user'
    let data = {
      birth: new Date(),
      email: 'email@example.com'
    }
    if(kind === 'bot'){
      data = {
        tokens: Math.floor(Math.random() * 1000000),
        pricePerToken: 1,
        currency: Math.random() < 0.5 ? 'USD' : 'EUR'
      }
    }
    return {
      id: idx,
      name: `${kind} #${idx+1}`,
      kind,
      data
    }
  })

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}
