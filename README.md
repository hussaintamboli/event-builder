[![Node version](https://img.shields.io/node/v/event-builder.svg?style=flat)](https://www.npmjs.com/package/event-builder)

ES6 client JS that helps you log events to your server very easily.

### Idea ####
I should be able to track user events from my Web apps easily.

### Install ###

    npm install event-builder

### Import ###

    import Event from 'event-builder';

### Usage ###

1. Basic event builder
 
        let builder = new Event.Builder("http://localhost:8090/api/v1/event");
        builder = builder.app("CMS", "2.1", "en").user(234992, "Hussain", "CMS", "ade23-29df3402034-23ddl");
        
2. Login event 
        
        // where builder is above basic builder
        builder = builder.type("Login")
        builder.send();

2. Page view

        builder = builder.type("PageView").page('Deal', 'Deal100');
        builder.send();
    
3. Button click

        builder = builder.type("ContentUpload").page("content_upload").section("upload_button").action("click");
        builder.send();

4. Create builder from json

    Basic builder is needed to send an event. But creating it everytime you want to send an event won't be feasible in your app (let's say angular app). 

    You can store a json in `localStorage` and get it when you want to send an event. Just pass that json string to `fromJson` and get the builder object.

        let json = "{"url":"http://localhost:8090/api/v1/event","app_name":"CMS","version":"0.2.0","language":"en","user_id":1000,"user_info":{"name":"Hussain Tamboli","source":"Web-2","X-Authorization-Token":"293492-2932492-29349skdf-234"}}";
        let builder = new Event.Builder().fromJson(json);
        builder.send();

5. Create builder from obj

        let obj = {
                "url": "http://localhost:8090/api/v1/event",
                "app_name": "CMS",
                "version": "0.2.0",
                "language": "en",
                "user_id": 1000,
                "user_info": {
                    "name": "Hussain Tamboli", 
                    "source": "Web-1", 
                    "X-Authorization-Token": "b29349-29349-293499-2934"
                }
        };
        let builder = new Event.Builder().fromObj(obj);
        builder.send();

