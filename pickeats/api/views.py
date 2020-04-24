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

def constructYelpParams(user):
    profile = user.profile
    params = {
        'longitude': profile.longitude,
        'latitude': profile.latitude
    }
    return params

def processYelpRequest(res, user):
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
        key = { "user_id": user.id, "id": business["id"] }
        db.reviews.update_one(key, {'$set': business}, upsert=True) # Inserts if does not exist, to query use [d for d in db.reviews.find({})]

@api_view(['GET', 'POST'])
def YelpDataList(request):

    if request.user.is_authenticated and request.method == 'GET':
        print("AUTHENTICATED USER", request.user.is_authenticated)
        print(request.user.profile)
        params = constructYelpParams(request.user)

        results = yelp_get_request(url_params=params)

        processYelpRequest(results, request.user)

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
    # else:
    #     handleYelpPost(request)
    #     yelpSer = YelpSerializer(data=request.data)

    #     if yelpSer.is_valid():
    #         return Response(json.loads(request.body))
    #     else:
    #         return Response("Please send a valid payload.")