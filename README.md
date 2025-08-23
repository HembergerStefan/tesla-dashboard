# Tesla Dashboard

### Realisierung einer sicheren Webanwendung für den Fernzugriff auf vernetzte Fahrzeuge

Step 1: Get a Domain and add a DNS Mapping to your routers IP address
Step 2: Configure a port forwarding on your router from your local ports 443 and 80 to your routers ports
Step 3: Follow the steps on https://developer.tesla.com/docs/fleet-api/getting-started/what-is-fleet-api
Step 4: Run init.sh
Step 5: Move your private-key.pem file that you created in Step 1 to tesla-proxy/config
Step 6: Move your public-key.pem file that you created in Step 1 to frontend/public/.well-known/appspecific and rename it to com.tesla.3p.public-key.pem
Step 7: Rename backend/.env.example to backend/.env and fill in your information from your application that you created in Step 1 you can find your application at https://developer.tesla.com/de_AT/dashboard
Step 8: run docker compose up -d --build
Step 9: Open https://tesla.com/_ak/<YOUR-DOMAIN>?vin=<YOUR_VIN> on your phone and follow the steps (this will allow your vehicle to accept vehicle commands from your domain)
Step 10: Enjoy 

