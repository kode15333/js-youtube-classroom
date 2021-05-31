const SEARCH_URL = `https://www.googleapis.com/youtube/v3/search?key=${process.env.GOOGLE_API_KEY}&part=snippet&order=viewCount&maxResults=10&q=`

const parseResponse = async response => {
  const { status, ok} = response;
  let data;
  if(ok && status === 200) {
    data = await response.json();
  } else {
    throw new Error('response Error : ' + status)

  }

  return {
    status,
    data
  }
}

const request = async params => {
  const {
    method = 'GET',
    url,
    headers = {},
    body
  } = params;

  const config = {
    method,
    headers: new Headers(headers)
  }

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);
    return parseResponse(response);
  } catch (error) {
    throw new Error('request Error : ' + error)
  }

}

const get = async (url, headers) => {
  const response = await request({
    url,
    headers,
    method: 'GET'
  })

  return response.data
}

export const search = async (serach) => {
  try {
    return await get(SEARCH_URL + serach)
  } catch (error) {
    console.error(error)
  }
}
