from pymongo import MongoClient
from rest_framework import viewsets, permissions, generics

from .serializers import TodoSerializer, YelpSerializer
from pickeatscrud.settings import MONGO_CONFIG

from .serializers import TodoSerializer, PreferenceSerializer, ProfileSerializer, AllergySerializer, GoalSerializer
from ..models import Preference, Profile, Allergy, Goal
# from todos.models import Todo
from yelp.client import Client
from pickeatscrud.settings import YELP_API_KEY
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
from django.http import HttpResponse

import json

from .requestHelpers import yelp_get_request

client = MongoClient()
db = client.pickeats # TODO: Change this to actual mongodb database name

"""
Example view that queries mongodb

class YelpDataList(APIView):
    def get(self, request, format=None):
        return Response([d for d in db.restaurant.find({},{'_id':0})])
"""


class PreferenceViewSet(viewsets.ModelViewSet):
    queryset = Preference.objects.all()
    serializer_class = PreferenceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.preference_set.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProfileView(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.profile


class AllergyViewSet(viewsets.ModelViewSet):
    queryset = Allergy.objects.all()
    serializer_class = AllergySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.allergy_set.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class GoalViewSet(viewsets.ModelViewSet):
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.goal_set.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TodoViewSet(viewsets.ModelViewSet):
    # queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.todos.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

def handleYelpPost(request):
    print(json.loads(request.body))
    # data = json.loads(request.POST['data'])
    # return Response(data)

def removeLeadingComma(origStr):
    if len(origStr) > 0 and origStr[0] == ',':
        origStr = origStr[1:]
    return origStr

def constructYelpParams(user, offset):
    profile = user.profile
    priceString = ""
    priceString += ("1" if profile.price_1 else "")
    priceString += (",2" if profile.price_2 else "")
    priceString += (",3" if profile.price_3 else "")
    priceString += (",4" if profile.price_4 else "")

    priceString = removeLeadingComma(priceString)

    queryset = Preference.objects.raw("SELECT * FROM pickeats_preference WHERE user_id = %s", [user.id])

    categoryString = ""
    categorySet = set()

    for pref in queryset:
        categorySet.add(pref.description)

    for pref in categorySet:
        categoryString += "," + pref

    categoryString = removeLeadingComma(categoryString)

    print("Category string: ", categoryString)

    params = {
        'longitude': profile.longitude,
        'latitude': profile.latitude,
        'price': priceString,
        'radius': profile.radius,
        'categories': categoryString,
        'limit': 50,
        'offset': offset*50
    }
    return params

def cacheYelpRequest(res, user, offset):
    businesses = []
    try:
        businesses = res.json()["businesses"]
    except:
        print("Bad request returned")
        return

    for business in businesses:
        print("inserting business, user_id=", user.id)
        print("name: ", business['name'])
        business['user_id'] = user.id
        business['offset'] = offset
        key = { "user_id": user.id, "id": business["id"] }
        db.reviews.update_one(key, {'$set': business}, upsert=True) # Inserts if does not exist, to query use [d for d in db.reviews.find({})]

@api_view(['GET'])
def YelpDataList(request):

    if request.user.is_authenticated and request.method == 'GET':
        print("AUTHENTICATED USER", request.user.is_authenticated)
        print(request.user.profile)

        try:
            offset = request.GET["offset"]
        except:
            offset = 0
        params = constructYelpParams(request.user, offset)

        cachedQuery = db.reviews.find({'user_id': request.user.id, 'offset': offset}, {'_id': 0})

        if cachedQuery.count() > 0:
            print("cachedQuery")
            cachedBusinesses = [business for business in cachedQuery]
            results = {'businesses': cachedBusinesses} # Wrap 'business'
            return Response(results, content_type='application/json')
        else:
            print("GET from yelp")
            results = yelp_get_request(url_params=params)
            cacheYelpRequest(results, request.user, offset)
            return HttpResponse(results, content_type='application/json')
        
        # if cached:
            # get from db
        # else:
            # otherwise query yelp api

        return HttpResponse(results, content_type='application/json')
    else:
        print("Anon user")

    if request.method == 'GET':
        return HttpResponse(yelp_get_request(), content_type='application/json')
    else: 
        return Response("Please make a valid request.")