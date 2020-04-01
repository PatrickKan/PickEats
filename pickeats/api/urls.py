from rest_framework import routers
from django.urls import path, include

from .views import TodoViewSet, YelpDataList

router = routers.DefaultRouter()
router.register('todos', TodoViewSet, 'todos')

urlpatterns = router.urls + [
    path('yelp/', YelpDataList, name='yelp')
]
