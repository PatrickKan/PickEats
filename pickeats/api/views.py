# from pymongo import MongoClient
from rest_framework import viewsets, permissions, generics

from pickeatscrud.settings import MONGO_CONFIG

from .serializers import TodoSerializer, PreferenceSerializer, ProfileSerializer, AllergySerializer, GoalSerializer
from ..models import Preference, Profile, Allergy, Goal
# from todos.models import Todo

# client = MongoClient(MONGODB_CONFIG)
# db = client.pickeats # TODO: Change this to actual mongodb database name

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
