# RevNRat #

## Project Description
------
 RevNRat simplifies the process of rating and reviewing Restaurants, Movies and Hotels for everyone. 
<br>
 Users can make an account, maintain their profile and post their reviews and ratings of different movies, restaurants and hotels.
 <br>
 Developed by Team Seraphim as a course project for Software Systems Lab.
<br>
 
## Development 
----

### Framework and Languages Used
1. Python 3.8.10
2. Django 4.1.20
3. Django REST
4. React JS 18.2.0
5. Bootstrap 5
6. Modified REST_AUTH library : in the [github](https://github.com/Adunama/RevNRat) repository
----
###  APIs Used
1. [Booking API by Api Dojo](https://rapidapi.com/apidojo/api/booking/) for hotel details
2. [Restaurants near me USA by makingdatameaningful](https://rapidapi.com/makingdatameaningful/api/restaurants-near-me-usa/) for restaurant details
3. [Cinemagoer](https://cinemagoer.github.io/) for movie details
----
### Features Implemented
1. User Login and SignUp
2. User profiles saves all the reviews written by them and their presonal details which they can update
3. Searching of movies by its name and restaurants and hotels by their city name. Close enough words are also considered in the search parameters
4. On searching, a list of items with detailed description and appropriate parameters are displayed.
5. Giving the feature of filters through which the user can shortlist the movies/hotels/restaurants through filter parameters
6. Restaurants' data can be filled in the database using appropriate post method on the admin side. This way the width of the searches can be improved and database can be kept up-to-date using only internal implementations of the backend.
7. The user can add review for any movie/hotel/restaurant and edit them if previously added by them. The ratings provided by them updates the database in real time.
----
### Technical Details

#### Django Models created

1. Profile : It inherits the inbuilt User Model. This carries the user' data such as bio,dob etc.
2. Review : It contains the foreign key(for many to one relationship) to the user model along with hotel,restaurant and movies model
3. Hotel : This contains the hotel parameters including details like distance from city, pricing, etc.
4. Movie : This contains the movie parameters containing parameters like casting, description etc.
5. City : This contains the city name along with state code which has a one to many relationship with the model Restaurants for facilitating the use of external API.
6. Restaurant : This contains the restaurant details such as Cuisine, contact etc. 

The models Hotel, Restaurant, and Movie contains a id field(primary key) and the average rating field given by the website's users.


#### Admin Controls
1. A Django-supreruser as been set up with following credentials : 
    * Username : ssl
    * Password : revnrat
2. This admin user can be used to manipulate and alter the database. 
3. Admin interface is available at [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin) 
4. There are some API Views that are only accessible by admin user because they provide an easy way to update/expand the database.
    * [FillCity view in restaurants app](http://127.0.0.1:8000/restaurants/) can be used to fill cities and their respective state codes. Only the restaurants of cities with correct state code.
    * [fill_restaurant view in restaurants app](http://127.0.0.1:8000/restaurants/fill) can be used to fill restaurants of a particular city of database just by posting a json `{"searchword" : \<name of city of which restaurants are to be included>}` to the link.
    * [fill_hotel view in hotels app](http://127.0.0.1:8000/hotels/fill) can be used to add the hotels of a particular city in the database.

### React
1. Components:
    - `Profile` to display the user details and past reviews
    - `EditProfile` to edit the user info
    - Each for `Movie`, `Hotel`, and `Restaurant`:
        * Main page for displaying three suggestions
        * Search page for searching through possible options
        * A page for a single result, displaying all results and option to add/edit your review
    - `Login` and `SignUp` Pages
2. Features Used:
    - Redux: For authentication
    - axios: For post and get requests
    - Hooks and State for dynamic website
    - Router to render pages based on path
3. Bootstrap:
    - Bootstrap 5 used for styling and components
    - Fully responsive website


## Running Instructions
-------
First navigate to the RevNRat directory, then:
1. Run Backend Server
    - `python3 backend/manage.py makemigrations`
    - `python3 backend/manage.py migrate`
    - `python3 backend/manage.py runserver`
2. Run Frontend
    - `cd frontend`
    - `npm install`
    - `npm start`






## References
-----
* https://getbootstrap.com/docs/5.0/components/navbar/
* https://bootstraptor.com/snippets/bootstrap-snippet-login-form/
* https://getbootstrap.com/docs/5.0/components/card/
* https://getbootstrap.com/docs/5.0/layout/grid/#sass
* https://getbootstrap.com/docs/5.0/utilities/flex/
* https://getbootstrap.com/docs/4.0/utilities/spacing/
* https://getbootstrap.com/docs/5.0/content/typography/
* https://getbootstrap.com/docs/4.0/components/buttons/
* https://getbootstrap.com/docs/5.0/forms/checks-radios/

* https://www.google.com/url?sa=i&url=http%3A%2F%2Fclipart-library.com%2Ffree%2Fstar-png-transparent-background.html&psig=AOvVaw3G2XKPxyIjfOVrVv-wP1aw&ust=1669182907446000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPCLjISNwfsCFQAAAAAdAAAAABAT

* https://www.google.com/url?sa=i&url=https%3A%2F%2Fcharlestongreendogboarding.com%2Frate-review%2F&psig=AOvVaw2dOtZ_gJkVhnD7C5WvWmve&ust=1669182521620000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJjEm8yLwfsCFQAAAAAdAAAAABAE

* https://www.npmjs.com/package/react-infinite-scroller?activeTab=readme

* https://www.bootdey.com/snippets/view/profile-with-data-and-skills#html

* https://blog.bitsrc.io/5-methods-to-persisting-state-between-page-reloads-in-react-8fc9abd3fa2f#:~:text=Using%20LocalStorage%20%E2%80%94%20Class%20Components&text=Now%20let%27s%20say%20if%20we,that%20by%20simply%20introducing%20localStorage.&text=As%20you%20can%20see%2C%20now,to%20achieve%20what%20we%20want.
* https://reactjs.org/docs/lists-and-keys.html#keys
* https://reactjs.org/docs/handling-events.html
* https://reactjs.org/docs/react-component.html
* https://reactjs.org/docs/conditional-rendering.html
* https://reactjs.org/docs/state-and-lifecycle.html
* https://reactjs.org/docs/components-and-props.html
* https://reactjs.org/docs/hooks-effect.html

### Django Documentation :
* https://www.django-rest-framework.org/
* https://docs.djangoproject.com/en/4.1/
* https://stackoverflow.com/questions/tagged/django