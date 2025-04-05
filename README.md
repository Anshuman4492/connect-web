- Routes
  - Body
    - Navbar
    - Children Routes ('/login', '/logout', '/signup', '/feed')
    - Footer


# Steps to deploy on AWS:

- Frontend deployment on AWS
  - npm i
  - npm run build
  - sudo apt update
  - sudo apt install nginx (nginx is used as http server,load balancer, proxy and much more)
  - sudo systemctl start nginx
  - sudo systemctl enable nginx
  - copy your build code(dist/*) to /var/www/html (copy your build folder files to nginx)
  - sudo scp -r dist/* /var/www/html 
    - sudo -> as a root command, as a root user
    - scp -> to copy
    - -r -> recursively call for every files
    - /dist/* -> copy all files inside /dist/
    - /var/www/html -> file of nginx (server is using to render HTML pages)
  - enable :80 of your EC2 instance
  - Connect :3000 to /api
    - by changing nginx configuration
      - present inside /etc/nginx/sites-available/default
      - Add rule for nginx proxy pass to :3000 from /api
      - restart ngnix (sudo systemctl restart nginx)
      
  - update BASE_URL to /api

- Backend deployment on AWS
  - Allow :3000 of your EC2 instance
  - npm run start
  - But will be stopped after EC2 terminal is stopped
  - Use PM2 to keep it running 24/7
  - Install PM2 globally
  - npm i pm2 -g
  - pm2 start npm --name "connect-backend" -- start
  - pm2 ls (show all processes)
  - pm2 logs (show all logs)
  - pm2 stop <connect-backend> (stop process)
  - pm2 delete <connect-backend> (delete process)
  - pm2 flush <connect-backend> (delete logs)
