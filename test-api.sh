echo 'GET http://localhost:3000/api/settings'
curl -X GET "http://localhost:3000/api/settings" 
echo

echo '\nPOST http://localhost:3000/api/settings'
curl -X POST "http://localhost:3000/api/settings"
echo

echo 'GET http://localhost:3000/api/builds'
curl -X GET "http://localhost:3000/api/builds"
echo

echo 'POST http://localhost:3000/api/builds/123456'
curl -X POST "http://localhost:3000/api/builds/123456"
echo

echo 'GET http://localhost:3000/api/builds/1'
curl -X GET "http://localhost:3000/api/builds/1"
echo

echo 'GET http://localhost:3000/api/builds/1/logs'
curl -X GET "http://localhost:3000/api/builds/1/logs"
echo
