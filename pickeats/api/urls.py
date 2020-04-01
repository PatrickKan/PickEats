from django.urls import path

from rest_framework import routers

from .views import TodoViewSet, PreferenceViewSet, ProfileView, AllergyViewSet, GoalViewSet

router = routers.DefaultRouter()
router.register('user/prefers', PreferenceViewSet, 'preferences')
router.register('user/allergies', AllergyViewSet, 'allergies')
router.register('user/goals', GoalViewSet, 'goals')
router.register('todos', TodoViewSet, 'todos')

urlpatterns = [
    path('user/profile/', ProfileView.as_view())
]

urlpatterns += router.urls
