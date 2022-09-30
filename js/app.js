class Request {

    //get request begin
    get(url){
        fetch(url)
            .then(response=> response.text())
            .then(data=> console.log(data))
            .catch(err=> console.log(err));
    }

//post request begin
    post(url,data){
        fetch(url,{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err=> console.log(err));
    }

    put(url,data){
        fetch(url,{
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err=> console.log(err));
    }
    delete(url){
        return new Promise((resolve,reject)=>{
            fetch('https://jsonplaceholder.typicode.com/albums/1', {
                method: 'DELETE'
            }).then(response=>resolve("Veri Silme İşlemi Başarılı"))
                .catch(err=> reject(err));
        });
    }
}
const request = new Request();
// request.get("https://jsonplaceholder.typicode.com/albums"); get methodu kontrolü için yorumu kaldır.

//get request complate

// request.post("https://jsonplaceholder.typicode.com/albums",{userId:1,title:"Thriller"});methodu kontrolü için yorumu kaldır.

//post request complate


//request.put("https://jsonplaceholder.typicode.com/albums/1",{userId:10,title:"tarkan karma"});methodu kontrolü için yorumu kaldır.

//put request complate

request.delete("https://jsonplaceholder.typicode.com/albums/1")
.then(message => console.log(message))
.catch(err => console.log(err));