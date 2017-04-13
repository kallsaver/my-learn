shady's front
remove # nginx's conf
```
server {
    server_name my-app;
    root /path/to/app;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```
