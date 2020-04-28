# PickEats
Pick Restaraunts with the ease of a swipe

## Getting Started

Django REST framework documentation here: https://www.django-rest-framework.org/

## For Developers
* Endpoints /api
    * Authentication /auth
        * POST /register/
            * Creates an account (requires location)
        * POST /login/
            * Pass in auth token
        * POST /logout/
            * Pass in auth token
        * GET /user/
            * Gets username, email
        * Planned:
        * GET /all (requires auth) (MAYBE)
            * Gets info on all user
        * DELETE / (requires admin priviledged account to delete any or delete your own)
            * Deletes user from database
    * User /user (requires auth, accesses logged in user's info)
        * GET, POST /prefers/
            * Gets all preferences, or creates a preference
            * Clears all current cached recommendations for a user on POST
        * GET, PUT, DELETE /prefers/(preference id)/
            * Gets, updates, or deletes a preference
            * Clears all current cached recommendations for a user on PUT and DELETE
        * GET, PUT, PATCH /profile/
            * Gets, updates, or partially updates {latitude, longitude, radius, price} preferences of a user
            * Planned: update cached restaurants (maybe)
            * Clears all current cached recommendations for a user
        * /goals/, /goals/(goal id)/
            * Same as /prefers/
        * /allergies/, /allergies/(allergy id)/
            * Same as /prefers/
    * Restaurants /yelp
        * GET /?offset=<int>
            * Get a batch of recommendations for specific user
            * Use offset as query parameter as an integer, passed in from frontend
        * Planned:
        * POST / 
            * Store the yes/no based on user?