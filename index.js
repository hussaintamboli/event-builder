module.exports = class Event {
   static get Builder() {
      class Builder {
         constructor(url) {
            this.log = {
                url: url || undefined  // optional argument
            }
         }
         app(app_name, version, language) {
            this.log.app_name = app_name;
            this.log.version = version;
            this.log.language = language;
            return this;
         }
         user(user_id, name, source, x_auth_token) {
            this.log.user_id = user_id;
            if (this.log.user_info === undefined) {
                this.log.user_info = {}    
            }
            this.log.user_info.name = name;
            this.log.user_info.source = source;
            this.log.user_info["X-Authorization-Token"] = x_auth_token;
            return this;
         }
         type(type) {
             this.log.type = type;
             return this;
         }
         page(p, p_id) {
            this.log.page = p;
            this.log.page_id = p_id || undefined;
            return this;
         }
         section(s, s_id) {
             this.log.section = s;
             this.log.section_id = s_id;
             return this;
         }
         action(a, a_id) {
             this.log.action = a;
             this.log.action_id = a_id || undefined;
             return this;
         }
         element(e, e_id) {
             this.log.element = e;
             this.log.element_id = e_id || undefined;
             return this;
         }
         path(p) {
             this.log.path = p;
             return this;
         }
         data(dt) {
             this.log.data = dt;
             return this;
         }
         fromJson(json) {
             let obj = JSON.parse(json);
             return this.fromObj(obj);
         }
         fromObj(obj) {
             for(var k in obj) {
                 this.log[k] = obj[k];
             }
             return this;
         }
         build(data) {
             // Fields like type, version, etc are referenced to ensure 
             // they will be sent with every event
             let required_fields = ["url", "type", "app_name", "version", "user_id", "language"];
             required_fields.forEach(function(field) {
                if (!data.hasOwnProperty(field)) {
                    throw new Error(field + " is required!");
                }
             });
             data.client_timestamp = new Date().getTime();
             data.device_id = window.navigator.userAgent;
             return data;
         }
         send() {
             let e = this.build(this.log);
             // Call an api and send event e
             let xhr = new XMLHttpRequest();
             let url = e.url;
             xhr.open("POST", url, true);
             xhr.setRequestHeader("Content-type", "application/json");
             xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var json = JSON.parse(xhr.responseText);
                    console.log(json.id);
                }
            };
            var data = JSON.stringify(e);
            xhr.send(data);
         }
      }
      return Builder;
   }
}
