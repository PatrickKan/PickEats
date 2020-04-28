from pymongo import MongoClient
from rest_framework import viewsets, permissions, generics

from .serializers import TodoSerializer, YelpSerializer
from pickeatscrud.settings import MONGO_CONFIG

from .serializers import TodoSerializer, PreferenceSerializer, ProfileSerializer, AllergySerializer, GoalSerializer
from ..models import Preference, Profile, Allergy, Goal
# from todos.models import Todo
from yelp.client import Client
from pickeatscrud.settings import YELP_API_KEY, DATABASES
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view

from django.http import HttpResponse
from django.db import connection

import json
from collections import namedtuple

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

    # Django Rest Framework version of SQL queries:
    # def get_queryset(self):
    #     return self.request.user.preference_set.all()

    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)

    # Raw SQL queries:
    def list(self, request):
        queryset = Preference.objects.raw("SELECT * FROM pickeats_preference WHERE user_id = %s", [request.user.id])
        return Response(PreferenceSerializer(queryset, many=True).data)

    def create(self, request):
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO pickeats_preference (description, user_id) VALUES (%s, %s)", [request.data['description'], request.user.id])
            if DATABASES['default']['ENGINE'] == 'django.db.backends.sqlite3':
                cursor.execute("SELECT last_insert_rowid()")
            elif DATABASES['default']['ENGINE'] == 'django.db.backends.mysql':
                cursor.execute("SELECT LAST_INSERT_ID()")
            else:
                raise Exception('Database not supported: look at pickeats/api/views.py')
            info_id = cursor.fetchone()
        return Response(data={'id': info_id[0], 'description': request.data['description']})

    def retrieve(self, request, pk=None):
        queryset = Preference.objects.raw("SELECT * FROM pickeats_preference WHERE user_id = %s AND id = %s", [request.user.id, pk])
        return Response(PreferenceSerializer(queryset, many=True).data[0])

    def partial_update(self, request, pk=None):
        with connection.cursor() as cursor:
            cursor.execute("UPDATE pickeats_preference SET description = %s WHERE user_id = %s AND id = %s", [request.data['description'], request.user.id, pk])
        queryset = Preference.objects.raw("SELECT * FROM pickeats_preference WHERE user_id = %s AND id = %s", [request.user.id, pk])
        return Response(PreferenceSerializer(queryset, many=True).data[0])

    def destroy(self, request, pk=None):
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM pickeats_preference WHERE user_id = %s AND id = %s", [request.user.id, pk])
        return Response()



class ProfileView(APIView):#(generics.RetrieveUpdateAPIView):
    # queryset = Profile.objects.all()
    # serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Django Rest Framework version of SQL queries:
    # def get_object(self):
    #     return self.request.user.profile
    def get(self, request, format=None):
        queryset = Profile.objects.raw("SELECT * FROM pickeats_profile WHERE user_id = %s", [request.user.id])
        return Response(ProfileSerializer(queryset, many=True).data[0])

    def patch(self, request):
        with connection.cursor() as cursor:
            if 'latitude' in request.data:
                cursor.execute("UPDATE pickeats_profile SET latitude = %s WHERE user_id = %s", [request.data.get('latitude'), request.user.id])
            if 'longitude' in request.data:
                cursor.execute("UPDATE pickeats_profile SET longitude = %s WHERE user_id = %s", [request.data.get('longitude'), request.user.id])
            if 'radius' in request.data:
                cursor.execute("UPDATE pickeats_profile SET radius = %s WHERE user_id = %s", [request.data.get('radius'), request.user.id])
            if 'price_1' in request.data:
                cursor.execute("UPDATE pickeats_profile SET price_1 = %s WHERE user_id = %s", [request.data.get('price_1')=='true', request.user.id])
            if 'price_2' in request.data:
                cursor.execute("UPDATE pickeats_profile SET price_2 = %s WHERE user_id = %s", [request.data.get('price_2')=='true', request.user.id])
            if 'price_3' in request.data:
                cursor.execute("UPDATE pickeats_profile SET price_3 = %s WHERE user_id = %s", [request.data.get('price_3')=='true', request.user.id])
            if 'price_4' in request.data:
                cursor.execute("UPDATE pickeats_profile SET price_4 = %s WHERE user_id = %s", [request.data.get('price_4')=='true', request.user.id])
        return self.get(request)


class AllergyViewSet(viewsets.ModelViewSet):
    queryset = Allergy.objects.all()
    serializer_class = AllergySerializer
    permission_classes = [permissions.IsAuthenticated]

    # Django Rest Framework version of SQL queries:
    # def get_queryset(self):
    #     return self.request.user.allergy_set.all()

    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)

    # Raw SQL queries:
    def list(self, request):
        queryset = Allergy.objects.raw("SELECT * FROM pickeats_allergy WHERE user_id = %s", [request.user.id])
        return Response(AllergySerializer(queryset, many=True).data)

    def create(self, request):
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO pickeats_allergy (description, user_id) VALUES (%s, %s)", [request.data['description'], request.user.id])
            if DATABASES['default']['ENGINE'] == 'django.db.backends.sqlite3':
                cursor.execute("SELECT last_insert_rowid()")
            elif DATABASES['default']['ENGINE'] == 'django.db.backends.mysql':
                cursor.execute("SELECT LAST_INSERT_ID()")
            else:
                raise Exception('Database not supported: look at pickeats/api/views.py')
            info_id = cursor.fetchone()
        return Response(data={'id': info_id[0], 'description': request.data['description']})

    def retrieve(self, request, pk=None):
        queryset = Allergy.objects.raw("SELECT * FROM pickeats_allergy WHERE user_id = %s AND id = %s", [request.user.id, pk])
        return Response(AllergySerializer(queryset, many=True).data[0])

    def partial_update(self, request, pk=None):
        with connection.cursor() as cursor:
            cursor.execute("UPDATE pickeats_allergy SET description = %s WHERE user_id = %s AND id = %s", [request.data['description'], request.user.id, pk])
        queryset = Allergy.objects.raw("SELECT * FROM pickeats_allergy WHERE user_id = %s AND id = %s", [request.user.id, pk])
        return Response(AllergySerializer(queryset, many=True).data[0])

    def destroy(self, request, pk=None):
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM pickeats_allergy WHERE user_id = %s AND id = %s", [request.user.id, pk])
        return Response()


class GoalViewSet(viewsets.ModelViewSet):
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Django Rest Framework version of SQL queries:
    # def get_queryset(self):
    #     return self.request.user.goal_set.all()

    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)

    # Raw SQL queries:
    def list(self, request):
        queryset = Goal.objects.raw("SELECT * FROM pickeats_goal WHERE user_id = %s", [request.user.id])
        return Response(GoalSerializer(queryset, many=True).data)

    def create(self, request):
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO pickeats_goal (description, user_id) VALUES (%s, %s)", [request.data['description'], request.user.id])
            if DATABASES['default']['ENGINE'] == 'django.db.backends.sqlite3':
                cursor.execute("SELECT last_insert_rowid()")
            elif DATABASES['default']['ENGINE'] == 'django.db.backends.mysql':
                cursor.execute("SELECT LAST_INSERT_ID()")
            else:
                raise Exception('Database not supported: look at pickeats/api/views.py')
            info_id = cursor.fetchone()
        return Response(data={'id': info_id[0], 'description': request.data['description']})

    def retrieve(self, request, pk=None):
        queryset = Goal.objects.raw("SELECT * FROM pickeats_goal WHERE user_id = %s AND id = %s", [request.user.id, pk])
        return Response(GoalSerializer(queryset, many=True).data[0])

    def partial_update(self, request, pk=None):
        with connection.cursor() as cursor:
            cursor.execute("UPDATE pickeats_goal SET description = %s WHERE user_id = %s AND id = %s", [request.data['description'], request.user.id, pk])
        queryset = Goal.objects.raw("SELECT * FROM pickeats_goal WHERE user_id = %s AND id = %s", [request.user.id, pk])
        return Response(GoalSerializer(queryset, many=True).data[0])

    def destroy(self, request, pk=None):
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM pickeats_goal WHERE user_id = %s AND id = %s", [request.user.id, pk])
        return Response()


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

def constructYelpParams(user):
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
        'categories': categoryString
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