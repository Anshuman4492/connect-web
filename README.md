- Routes
  - Body
    - Navbar
    - Children Routes ('/login', '/logout', '/signup', '/feed')
    - Footer


- Steps to deploy on AWS
  - npm i
  - npm run build
  - sudo apt update
  - sudo apt install nginx
  - sudo systemctl start nginx
  - sudo systemctl enable nginx
  - copy your build code(dist/*) to /var/www/html
  - sudo scp -r dist/* /var/www/html
  - enable :80 of your EC2 instance
 
