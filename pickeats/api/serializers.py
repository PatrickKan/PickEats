from rest_framework import serializers

from pickeats.models import Todo, Preference, Profile, Allergy, Goal


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'

class YelpSerializer(serializers.Serializer):
    term = serializers.CharField(required=True)
class PreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preference
        exclude = ['user']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        exclude = ['user', 'id']

class AllergySerializer(serializers.ModelSerializer):
    class Meta:
        model = Allergy
        exclude = ['user']

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        exclude = ['user']
