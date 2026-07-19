### Backend step by step configuration 
- create backend folder 
- install node packetmanagers `npm i init ` you can add every things or go to defaults 
- install express and mongoose for storage and backend setup
- configuration Mongodb atls 
- error set IP, and URL with username and passeword trableshoots all `done`
- create github repository and add project
- if you want to publice on vercel then create vercel.json file and use below code
```json
{
    "version": 2,
    "builds": [
        {
            "src": "server.js",
            "use": "@vercel/node",
            "config": {
                "includeFiles": [
                    "dist/**"
                ]
            }
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "server.js"
        }
    ]
}

```
- server.js setup in backend site 

```js
if(process.env.NODE_ENV === "developments"){

    app.listen(PORT, () => {
        
        console.log(`Server is running on port ${PORT}`);
    
    });
}
export default app;

```

- testing all api `done`
- controllers from received all the data from forntend
- check data receiving form forntend 
- validate all the fields (email , passowrd , name, emty)
- 