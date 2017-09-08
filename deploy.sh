# Clean previous build
rm -rf dist
# Create a prod build
npm run build prod
# ZIP the dist folder
tar czf dist.tar.gz dist/*
# Update permissions for the private key
# Copy the zipped file to the server
scp -i config/id_tripbook_deploy_rsa dist.tar.gz deploy@188.166.94.245:~
# scp -i ~/.ssh/id_tripbook_deploy_rsa dist.tar.gz deploy@188.166.94.245:~
# Remove the zipped folder locally
rm dist.tar.gz
# Connect to the server
ssh -i config/id_tripbook_deploy_rsa deploy@188.166.94.245 << 'ENDSSH'
# ssh -i ~/.ssh/id_tripbook_deploy_rsa deploy@188.166.94.245 << 'ENDSSH'
# Delete the previous version
rm -rf tripbook-client
# Unzip the file
tar xf dist.tar.gz
# Rename 'dist' folder to 'tripbook-client'
mv -T dist tripbook-client
# Remove the zipped folder
rm dist.tar.gz
# Open the folder
cd tripbook-client
# End the connection
ENDSSH

