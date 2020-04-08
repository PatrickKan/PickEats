from django.urls import path

from rest_framework import routers
from django.urls import path, include

from .views import TodoViewSet, PreferenceViewSet, ProfileView, AllergyViewSet, GoalViewSet, YelpDataList

router = routers.DefaultRouter()
router.register('user/prefers', PreferenceViewSet, 'preferences')
router.register('user/allergies', AllergyViewSet, 'allergies')
router.register('user/goals', GoalViewSet, 'goals')
router.register('todos', TodoViewSet, 'todos')

urlpatterns = [
    path('user/profile/', ProfileView.as_view()),
    path('yelp/', YelpDataList, name='yelp')
]

urlpatterns += router.urls
