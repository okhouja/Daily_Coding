#! /bin/bash

# Installing Dependencies
echo "################################################################"
echo "Installing Packages..."
echo "################################################################"
sudo yum install wget unzip httpd -y > /dev/null
echo 

# Starting & Enabling Services
echo "################################################################"
echo "Starting & Enabling HTTPD Service..."
echo "################################################################"
sudo systemctl start httpd
sudo systemctl enable httpd
echo

# Creating Temp Directory
echo "################################################################"
echo "Strating Artifact Deployment"
echo "################################################################"
mkdir -p /tmp/webfiles
cd /tmp/webfiles
echo

wget https://www.tooplate.com/zip-templates/2107_new_spot.zip > /dev/null
unzip 2107_new_spot.zip > /dev/null
sudo cp -r 2107_new_spot/* /var/www/html/
echo

# Bounce Services
echo "################################################################"
echo "Restarting HTTPD Services"
echo "################################################################"
sudo systemctl restart httpd

# Clean Up
echo "################################################################"
echo "Removing Temporary Files" 
echo "################################################################"
rm -rf /tmp/webfiles
echo

sudo systemctl status httpd
ls /var/www/html/