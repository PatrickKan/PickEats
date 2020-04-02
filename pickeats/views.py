from django.shortcuts import render
from rest_framework import permissions

class IsUser(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.user:
            return obj.user == request.user
        return False