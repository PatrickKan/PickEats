from django.urls import path

from rest_framework import routers

from .views import TodoViewSet, PreferenceViewSet, ProfileView

router = routers.DefaultRouter()
router.register('user/prefers', PreferenceViewSet, 'preferences')
router.register('todos', TodoViewSet, 'todos')

urlpatterns = [
    path('user/profile/', ProfileView.as_view())
]

urlpatterns += router.urls
