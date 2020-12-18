const gaApi = require('ga-api');
const fs = require('fs');

const accountOptions = {
  email: "test-agent@sage-outrider-290412.iam.gserviceaccount.com",
  clientId: 'http://135831312192-rgc35ogubnitv4k2907sj0ksed73uvl6.apps.googleusercontent.com',
  email: 'user-agent@user-agent-298611.iam.gserviceaccount.com',
  key: 'user-agent-298611-f3047e8644fd.json',
  ids: 'ga:119596232',
}; 

const queryOptions = {
  startDate: '30daysAgo',
  endDate: 'today',
  dimensions: 'ga:dimension1, ga:deviceCategory',
  metrics: 'ga:sessions',
};


gaApi({ ...accountOptions, ...queryOptions }, (error, data) => {
    if (error) {
      console.error("error: ", error);
    } else {
        data.rows.forEach((element) => {
            let content = JSON.parse(fs.readFileSync('file.json', 'utf8'));
            // edit or add property
            content[element[1]].push(element[0]);
            //write file
            fs.writeFileSync('file.json', JSON.stringify(content));
        });
    }
});

