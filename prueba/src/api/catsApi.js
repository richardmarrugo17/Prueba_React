function catsphrase(num){
    const url = 'https://catfact.ninja/docs'
    const urls = [];
    for (let i=0; i<num; i++){
        urls.push(url);
    }
    return Promise.all(
        urls.map(url => fetch(url)
            .then(r => r.json())
            .then(data => ({ data, url}))
            .catch(error =>({ error, url}))
        )
    )
}

export default catsphrase;