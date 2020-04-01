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
            * Gets info on all users
        * PUT /
            * Update user survey preferences
            * Changing location, update the cached restaurants? (MAYBE)
        * DELETE / (requires admin priviledged account to delete any or delete your own)
            * Deletes user from database
    * User /user (requires auth, accesses logged in user's info)
        * GET, POST /prefers/
            * Gets all preferences, or creates a preference
        * GET, PUT, DELETE /prefers/(preference id)/
            * Gets, updates, or deletes a preference
        * Planned:
        * GET, PUT, PATCH /profile/
            * Gets, updates, or partially updates {latitude, longitude, radius, price} preferences of a user
        * /goals/, /goals/(goal id)/
            * Same as /prefers/
        * /allergies/, /allergies/(allergy id)/
            * Same as /prefers/
    * Restaurants /recs 
        * Planned:
        * GET / (hashed user id) (batch number)
            * Get a batch of recommendations for specific user
        * POST / (hashed user id)
            * Store the yes/no based on user?