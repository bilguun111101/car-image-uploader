exports.handler = async(event) => {
    const { file, url } = JSON.parse(event);
    try {
        await fetch(url, {
            method: 'PUT',
            body: file
        })
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers" : "*",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ success: true })
        }
    } catch (error) {
        return {
            statusCode: 401,
            headers: {
                "Access-Control-Allow-Headers" : "*",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ error })
        }   
    }
}