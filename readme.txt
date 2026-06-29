# Deploy footbet.fun (hosting u2662691)

1. Build frontend locally:
   cd design/design
   npm install --legacy-peer-deps
   npm run build

2. Commit and push to GitHub (branch main or merged PR v3):
   git add .
   git commit -m "message"
   git push origin main

3. Connect to production server:
   ssh u2662691@31.31.196.253

4. In hosting panel or via SSH, go to project directory, for example:
   cd ~/www/footbet.fun
   (exact path — see ISPmanager / hosting file manager)

5. Activate virtualenv if used, then pull code:
   source djangoenv/bin/activate   # if applicable
   git pull origin main

6. Run migrations if needed:
   python manage.py migrate

7. Collect static files:
   python manage.py collectstatic --noinput

8. Restart Django app (reg.ru hosting):
   touch ~/tmp/restart.txt
   or use the restart button in hosting panel / .restart-app if configured

Notes:
- Production settings: config/settings.py must use SERVER = 'PROD' on the server.
- Site: https://www.footbet.fun
- DB: u2662691_default (MySQL on localhost)
