# PickEats
Pick Restaraunts with the ease of a swipe

## Getting Started

Django REST framework documentation here: https://www.django-rest-framework.org/

## For Developers
* Endpoints /api
    * Users /user
        * POST /register
            * Creates an account (requires location)
        * POST /login
            * Pass in auth token
        * POST /logout
            * Pass in auth token
        * GET /(hashed userid)
            * Gets all information about a specific user
        * GET /all (requires auth) (MAYBE)
            * Gets info on all users
        * PUT /(hashed userid)
            * Update user survey preferences
            * Changing location, update the cached restaurants? (MAYBE)
        * DELETE /(hashed user id) (requires admin priviledged account to delete any or delete your own)
            * Deletes user from database
    * Restaurants /recs
        * GET / (hashed user id) (batch number)
            * Get a batch of recommendations for specific user
        * POST / (hashed user id)
            * Store the yes/no based on user?