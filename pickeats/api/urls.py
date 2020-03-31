from rest_framework import routers

from .views import TodoViewSet, PreferenceViewSet

router = routers.DefaultRouter()
router.register('user/prefers', PreferenceViewSet, 'preferences')
router.register('todos', TodoViewSet, 'todos')

urlpatterns = []

urlpatterns += router.urls
