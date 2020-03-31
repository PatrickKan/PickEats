# from pymongo import MongoClient
from rest_framework import viewsets, permissions

from .serializers import TodoSerializer
from pickeatscrud.settings import MONGO_CONFIG
# from todos.models import Todo

# client = MongoClient(MONGODB_CONFIG)
# db = client.pickeats # TODO: Change this to actual mongodb database name

"""
Example view that queries mongodb

class YelpDataList(APIView):
    def get(self, request, format=None):
        return Response([d for d in db.restaurant.find({},{'_id':0})])
"""


class TodoViewSet(viewsets.ModelViewSet):
    # queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.todos.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
