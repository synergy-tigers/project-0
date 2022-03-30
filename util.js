// util.js
/*
    Created By: Andy Park
    Last Updated: 03/30/2022
    Description: Utility module for the API callouts and prettifying the morning greeting"Good morning"
*/

async function getTranslate(translateSentence{
    translateSentence = translateForApi(translateSentence);

    const req = new Request('https://rapidapi.com/googlecloud/api/google-translate1/' + translateSentence);

    const response = await fetch(req);
    if (!response.ok) {
        throw new Error(response);
    }
    
    return response.json();

})