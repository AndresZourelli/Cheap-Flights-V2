# [Cheap Flights](https://cheap-flights.herokuapp.com/)

This project was created to search for the cheapest flights that are available to destination. Flights are found using the Kiwi API and uses React/Redux to display that information to the user.

![Main Website](/images/cheapFlightV2_main.png)


## How to search

To search for desired flight simply fill out the flight information. The "To" and "From" fields will auto-populate the desired city/airport. Then you can choose the date range you want your trip to occur over. From there you will also list the min/max number of nights you want to stay. This flexibility allows for finding the cheapest flights betweeen the selected dates. Lastly, you need to select the number of people and if any children are present and what class you want to fly in. Once all the fields are inputed you can press search to see the results. Once the results are recieved a picture of the destination will appear and the flights will be shown below.

![Search Results](/images/cheap-flights-search.png)


## Technology Used

- React
- Redux
- [Kiwi API](https://docs.kiwi.com/)
- [Heroku](https://www.heroku.com/)
- Node.Js
- Axios
- Nodemon