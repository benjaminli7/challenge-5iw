#!/bin/bash
ssh your-user@your-droplet-ip-address << 'ENDSSH'
cd /path/to/your/app
git pull
npm install
npm run build