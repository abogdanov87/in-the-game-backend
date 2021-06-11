# To deploy the site on production server you have to do this:

1. Copy folder 'build' and 'webpack-stats.json' from front-end project.
2. Add changes to Git and push them to the Github:
  2.1. git add .
  2.2. git commit -m "message"
  2.3. git push origin HEAD
3. Connect to prod server via Terminal:
  3.1. ssh u1352366@37.140.192.209 (password - X3T_h_eX)
  3.2. source djangoenv/bin/activate
  3.3. cd www/4paws.io/mrlapkins
4. Pull the code from Github:
  4.1. git pull
5. If there are new migrations you must run them first:
  5.1. python manage.py migrate
6. Update static files:
  6.1. python manage.py collectstatic
7. Reload app on server by creating blank file in root folder of the site:
  7.1. /www/4paws.io/.restart-app