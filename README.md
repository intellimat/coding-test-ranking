# Idealista Task 

#### Endpoints 
* /ads
* /qualityAds 
* /calculateScore 

#### Endpoints Description 
* **/ads** returns all the ads as a JSON string (ads are stored in the data property), regardless of the score
* **/qualityAds** returns all the ads with a score >= 40 as a JSON string (ads are stored in the data property) 
* **/calculateScore** asks the server to calculate all the ads' score and returns a JSON string as a response 
* Only GET method is supported on the endpoints 

#### Notes 
* If you want to run the server locally you need to install Node Js (version  ^14)  on your local machine.<br/>
  Then, download the project folder, and from coding-test-ranking directory, which contains package.json, run the following commands from the CLI: <br/>
  1) npm install <br/> 
  2) npm start <br/>
 * The server will run locally by default on port: 12000
  
#### Requests' Example
On local machine:
* http://localhost:12000/ads
* http://localhost:12000/qualityAds
* http://localhost:12000/calculateScore

#### About the implementation
* Stack used: Node js and Express js
* Persistence: The ads have been stored into a JSON file which is read to retrieve the ads and written to store the updated ads (scores updated)
