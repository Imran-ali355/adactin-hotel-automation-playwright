export async function attachApiLog(testInfo, title, response) {
    const text = await response.text();
    let body = text;
 
    await testInfo.attach(title, {
        body: JSON.stringify({
            status: response.status(),
            response: body
        }, null, 2),
        contentType: 'application/json'
    });
}